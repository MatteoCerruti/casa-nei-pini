// Gestisce lo stato di una prenotazione condivisa: quando qualcuno apre
// /checkin-online?ref=... viene creata (o riletta) una riga in checkins
// con quel booking_ref, così più persone possono vedere chi è già
// registrato, aggiungere/rimuovere ospiti e infine marcare la
// prenotazione come completa.
const { neon } = require("@neondatabase/serverless");
const { verifyToken } = require("@clerk/backend");

module.exports = async function handler(req, res) {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    res.status(500).json({ error: "Database non configurato" });
    return;
  }

  const propertyId = process.env.REACT_APP_PROPERTY_ID || "casa-nei-pini";
  const sql = neon(databaseUrl);

  if (req.method === "GET") {
    const ref = req.query?.ref;
    if (!ref || typeof ref !== "string") {
      res.status(400).json({ error: "Parametro ref mancante" });
      return;
    }
    try {
      const rows = await sql`
        SELECT arrival_date, departure_date, status, guests
        FROM checkins
        WHERE property_id = ${propertyId} AND booking_ref = ${ref}
      `;
      if (rows.length === 0) {
        res.status(200).json({ exists: false });
        return;
      }
      const rawGuests = rows[0].guests || [];
      const guests = rawGuests.map((g) => ({
        firstName: g.firstName,
        lastName: g.lastName,
        birthDate: g.birthDate,
      }));
      const hasDocument = rawGuests.some((g) => g.documentNumber && g.documentNumber.trim());
      res.status(200).json({
        exists: true,
        arrivalDate: rows[0].arrival_date,
        departureDate: rows[0].departure_date,
        status: rows[0].status,
        guests,
        hasDocument,
      });
    } catch (err) {
      res.status(500).json({ error: "Impossibile leggere la prenotazione." });
    }
    return;
  }

  if (req.method === "POST") {
    const { bookingRef, arrivalDate, departureDate } = req.body || {};
    const todayIso = new Date().toISOString().slice(0, 10);
    if (
      typeof bookingRef !== "string" || !bookingRef.trim() ||
      typeof arrivalDate !== "string" || !arrivalDate || arrivalDate < todayIso ||
      typeof departureDate !== "string" || !departureDate || departureDate <= arrivalDate
    ) {
      res.status(400).json({ error: "Dati mancanti o non validi" });
      return;
    }
    try {
      await sql`
        INSERT INTO checkins (property_id, booking_ref, arrival_date, departure_date, guests)
        VALUES (${propertyId}, ${bookingRef}, ${arrivalDate}, ${departureDate}, '[]'::jsonb)
        ON CONFLICT (property_id, booking_ref) WHERE booking_ref IS NOT NULL DO NOTHING
      `;
      res.status(200).json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: "Impossibile creare la prenotazione." });
    }
    return;
  }

  if (req.method === "PATCH") {
    // Solo l'host: usato per riaprire una prenotazione conclusa per
    // errore (torna modificabile dal link condiviso).
    const secretKey = process.env.CLERK_SECRET_KEY;
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!secretKey || !token) {
      res.status(401).json({ error: "Non autenticato" });
      return;
    }
    try {
      await verifyToken(token, { secretKey });
    } catch (err) {
      res.status(401).json({ error: "Sessione non valida" });
      return;
    }

    const { bookingRef, status } = req.body || {};
    if (typeof bookingRef !== "string" || !bookingRef.trim() || (status !== "complete" && status !== "draft")) {
      res.status(400).json({ error: "Dati mancanti o non validi" });
      return;
    }
    try {
      await sql`
        UPDATE checkins SET status = ${status}
        WHERE property_id = ${propertyId} AND booking_ref = ${bookingRef}
      `;
      res.status(200).json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: "Impossibile aggiornare la prenotazione." });
    }
    return;
  }

  res.status(405).json({ error: "Metodo non consentito" });
};
