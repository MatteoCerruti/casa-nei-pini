// Elenco delle registrazioni ricevute e loro cancellazione, per la
// dashboard /admin. Protetta: richiede un session token Clerk valido
// nell'header Authorization.
const { neon } = require("@neondatabase/serverless");
const { verifyToken } = require("@clerk/backend");

module.exports = async function handler(req, res) {
  const secretKey = process.env.CLERK_SECRET_KEY;
  const databaseUrl = process.env.DATABASE_URL;
  if (!secretKey || !databaseUrl) {
    res.status(500).json({ error: "Configurazione mancante" });
    return;
  }

  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    res.status(401).json({ error: "Non autenticato" });
    return;
  }

  try {
    await verifyToken(token, { secretKey });
  } catch (err) {
    res.status(401).json({ error: "Sessione non valida" });
    return;
  }

  const sql = neon(databaseUrl);
  const propertyId = process.env.REACT_APP_PROPERTY_ID || "casa-nei-pini";

  if (req.method === "DELETE") {
    const { id } = req.body || {};
    if (!id) {
      res.status(400).json({ error: "Id mancante" });
      return;
    }
    try {
      await sql`DELETE FROM checkins WHERE id = ${id} AND property_id = ${propertyId}`;
      res.status(200).json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: "Impossibile eliminare il modulo." });
    }
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Metodo non consentito" });
    return;
  }

  try {
    // Pulizia automatica: le prenotazioni con arrivo più vecchio di 30
    // giorni non servono più (coerente col limite mostrato nel
    // calendario admin), le rimuoviamo per non accumulare dati inutili.
    await sql`
      DELETE FROM checkins
      WHERE property_id = ${propertyId} AND arrival_date < CURRENT_DATE - INTERVAL '30 days'
    `;

    const rows = await sql`
      SELECT id, booking_ref, status, arrival_date, departure_date, notes, guests, created_at
      FROM checkins
      WHERE property_id = ${propertyId} AND jsonb_array_length(guests) > 0
      ORDER BY arrival_date ASC
      LIMIT 200
    `;
    res.status(200).json({ checkins: rows });
  } catch (err) {
    res.status(500).json({ error: "Impossibile leggere i dati." });
  }
};
