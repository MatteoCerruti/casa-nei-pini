// Riceve la registrazione online degli ospiti (form pubblico /checkin-online)
// e la salva su Neon Postgres. Nessuna autenticazione: chiunque abbia il
// link della proprietà può inviare i propri dati, come un form di contatto.
//
// Se il body include bookingRef (link condiviso con ?ref=...), i nuovi
// ospiti vengono accodati alla prenotazione esistente invece di creare
// una riga separata: così più persone possono completare insieme la
// stessa registrazione partendo dallo stesso link. DELETE rimuove un
// singolo ospite (per indice) dalla stessa prenotazione.
const { neon } = require("@neondatabase/serverless");
const { Resend } = require("resend");

// Capienza massima per proprietà — deve restare allineata a `maxGuests`
// in src/properties/<id>/config.js.
const MAX_GUESTS_BY_PROPERTY = {
  "casa-nei-pini": 8,
  "vista-dai-pini": 6,
};

// Email dell'host a cui notificare i check-in completati — deve restare
// allineata a `legal.controllerEmail` in src/properties/<id>/config.js.
const HOST_EMAIL_BY_PROPERTY = {
  "casa-nei-pini": "mcerruti00@gmail.com",
  "vista-dai-pini": "scerruti03@gmail.com",
};

const SITE_URL_BY_PROPERTY = {
  "casa-nei-pini": "https://casa-nei-pini.vercel.app",
  "vista-dai-pini": "https://vista-dai-pini.vercel.app",
};

// Età alla data di arrivo (per contare i minori di 12 anni).
function ageAt(birthDate, referenceDate) {
  const birth = new Date(birthDate);
  const ref = new Date(referenceDate);
  let age = ref.getFullYear() - birth.getFullYear();
  const hasHadBirthdayThisYear =
    ref.getMonth() > birth.getMonth() ||
    (ref.getMonth() === birth.getMonth() && ref.getDate() >= birth.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
}

// Email minimale per motivi di sicurezza/GDPR: nessun dato personale
// dell'ospite nel corpo del messaggio (canale non cifrato) — solo
// conteggi aggregati. Il link porta al sito della proprietà.
async function notifyHost(propertyId, bookingRef, arrivalDate, departureDate, allGuests) {
  const apiKey = process.env.RESEND_API_KEY;
  const hostEmail = HOST_EMAIL_BY_PROPERTY[propertyId];
  if (!apiKey || !hostEmail) return;

  const siteUrl = SITE_URL_BY_PROPERTY[propertyId];
  const dashboardUrl = siteUrl ? `${siteUrl}/admin` : null;
  const guestCount = allGuests.length;
  const minorCount = allGuests.filter((g) => g.birthDate && ageAt(g.birthDate, arrivalDate) < 12).length;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Check-in <onboarding@resend.dev>",
      to: hostEmail,
      subject: `Check-in completato${bookingRef ? ` — ${bookingRef}` : ""}`,
      text: `Check-in completato.\n\nArrivo: ${arrivalDate}\nPartenza: ${departureDate}\nOspiti: ${guestCount}\nDi cui minori di 12 anni: ${minorCount}${dashboardUrl ? `\n\n${dashboardUrl}` : ""}`,
      html: `<p>Check-in completato.</p>
        <p><strong>Arrivo:</strong> ${arrivalDate}<br>
        <strong>Partenza:</strong> ${departureDate}<br>
        <strong>Ospiti:</strong> ${guestCount}<br>
        <strong>Di cui minori di 12 anni:</strong> ${minorCount}</p>
        ${dashboardUrl ? `<p><a href="${dashboardUrl}">${dashboardUrl}</a></p>` : ""}`,
    });
  } catch (err) {
    // Best-effort: non blocchiamo il salvataggio se l'email fallisce, ma
    // logghiamo per poterlo diagnosticare dai log di Vercel.
    console.error("[notifyHost] invio email fallito", err);
  }
}

function isValidGuest(guest, requireDocument) {
  const todayIso = new Date().toISOString().slice(0, 10);
  const hasBaseFields =
    guest &&
    typeof guest.firstName === "string" && guest.firstName.trim() &&
    typeof guest.lastName === "string" && guest.lastName.trim() &&
    typeof guest.gender === "string" && guest.gender.trim() &&
    typeof guest.birthDate === "string" && guest.birthDate.trim() && guest.birthDate <= todayIso &&
    typeof guest.birthPlace === "string" && guest.birthPlace.trim() &&
    typeof guest.nationality === "string" && guest.nationality.trim();

  if (!hasBaseFields) return false;
  if (!requireDocument) return true;

  return (
    typeof guest.documentType === "string" && guest.documentType.trim() &&
    typeof guest.documentNumber === "string" && guest.documentNumber.trim()
  );
}

module.exports = async function handler(req, res) {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    res.status(500).json({ error: "Database non configurato" });
    return;
  }
  const propertyId = process.env.REACT_APP_PROPERTY_ID || "casa-nei-pini";
  const sql = neon(databaseUrl);

  if (req.method === "DELETE") {
    const { bookingRef, guestIndex } = req.body || {};
    if (typeof bookingRef !== "string" || !bookingRef.trim() || !Number.isInteger(guestIndex) || guestIndex < 0) {
      res.status(400).json({ error: "Dati mancanti o non validi" });
      return;
    }
    try {
      await sql`
        UPDATE checkins
        SET guests = guests - ${guestIndex}::int
        WHERE property_id = ${propertyId} AND booking_ref = ${bookingRef} AND status = 'draft'
      `;
      res.status(200).json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: "Impossibile rimuovere l'ospite." });
    }
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Metodo non consentito" });
    return;
  }

  const { bookingRef, arrivalDate, departureDate, notes, guests, finalize } = req.body || {};
  const hasBookingRef = typeof bookingRef === "string" && bookingRef.trim();

  if (
    typeof arrivalDate !== "string" || !arrivalDate ||
    typeof departureDate !== "string" || !departureDate ||
    departureDate <= arrivalDate ||
    !Array.isArray(guests)
  ) {
    res.status(400).json({ error: "Dati mancanti o non validi" });
    return;
  }

  // Un solo documento basta per l'intera prenotazione: lo richiediamo al
  // primo ospite di questo invio solo se nessuno, tra chi è già stato
  // salvato e chi stiamo aggiungendo ora, ne ha già fornito uno.
  let hasExistingDocument = false;
  let existingGuestCount = 0;
  if (hasBookingRef) {
    try {
      const existing = await sql`
        SELECT guests FROM checkins
        WHERE property_id = ${propertyId} AND booking_ref = ${bookingRef}
      `;
      const existingGuests = existing[0]?.guests || [];
      existingGuestCount = existingGuests.length;
      hasExistingDocument = existingGuests.some((g) => g.documentNumber && g.documentNumber.trim());
    } catch (err) {
      res.status(500).json({ error: "Impossibile verificare la prenotazione." });
      return;
    }
  }

  // Serve almeno un ospite in totale: o già registrato in questa
  // prenotazione, oppure incluso in questo invio.
  if (guests.length === 0 && existingGuestCount === 0) {
    res.status(400).json({ error: "Dati mancanti o non validi" });
    return;
  }

  const maxGuests = MAX_GUESTS_BY_PROPERTY[propertyId] ?? Infinity;
  if (existingGuestCount + guests.length > maxGuests) {
    res.status(400).json({ error: `Numero massimo di ospiti superato (max ${maxGuests}).` });
    return;
  }

  if (!guests.every((guest, i) => isValidGuest(guest, i === 0 && !hasExistingDocument))) {
    res.status(400).json({ error: "Dati mancanti o non validi" });
    return;
  }

  const guestsJson = JSON.stringify(guests);
  const newStatus = finalize ? "complete" : "draft";

  try {
    if (hasBookingRef) {
      const updated = await sql`
        UPDATE checkins
        SET guests = guests || ${guestsJson}::jsonb,
            notes = COALESCE(notes, ${notes || null}),
            status = ${newStatus}
        WHERE property_id = ${propertyId} AND booking_ref = ${bookingRef} AND status = 'draft'
        RETURNING guests
      `;
      if (updated.length > 0) {
        if (newStatus === "complete") {
          await notifyHost(propertyId, bookingRef, arrivalDate, departureDate, updated[0].guests);
        }
        res.status(201).json({ ok: true });
        return;
      }
      // Nessuna riga esistente (in draft) con questo ref: la creiamo ora.
      await sql`
        INSERT INTO checkins (property_id, booking_ref, arrival_date, departure_date, notes, guests, status)
        VALUES (${propertyId}, ${bookingRef}, ${arrivalDate}, ${departureDate}, ${notes || null}, ${guestsJson}::jsonb, ${newStatus})
        ON CONFLICT (property_id, booking_ref) WHERE booking_ref IS NOT NULL DO NOTHING
      `;
      if (newStatus === "complete") {
        await notifyHost(propertyId, bookingRef, arrivalDate, departureDate, guests);
      }
      res.status(201).json({ ok: true });
      return;
    }

    await sql`
      INSERT INTO checkins (property_id, arrival_date, departure_date, notes, guests, status)
      VALUES (${propertyId}, ${arrivalDate}, ${departureDate}, ${notes || null}, ${guestsJson}::jsonb, 'complete')
    `;
    await notifyHost(propertyId, null, arrivalDate, departureDate, guests);
    res.status(201).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Impossibile salvare i dati, riprova più tardi." });
  }
};
