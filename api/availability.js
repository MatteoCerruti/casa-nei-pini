// Vercel serverless function: unisce gli iCal di Booking e Airbnb lato server
// (evita il CORS che blocca il fetch diretto dal browser) e restituisce gli
// intervalli di date non disponibili in un formato semplice per il frontend.

function parseIcs(text, source) {
  const events = [];
  const blocks = text.split("BEGIN:VEVENT").slice(1);

  for (const block of blocks) {
    const startMatch = block.match(/DTSTART;VALUE=DATE:(\d{8})/);
    const endMatch = block.match(/DTEND;VALUE=DATE:(\d{8})/);
    if (!startMatch || !endMatch) continue;

    const toIso = (raw) => `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;

    // DTEND è esclusivo (il giorno di checkout è di nuovo disponibile).
    events.push({ start: toIso(startMatch[1]), end: toIso(endMatch[1]), source });
  }

  return events;
}

module.exports = async function handler(req, res) {
  const bookingUrl = process.env.BOOKING_ICAL_URL;
  const airbnbUrl = process.env.AIRBNB_ICAL_URL;

  if (!bookingUrl || !airbnbUrl) {
    res.status(500).json({ error: "iCal URLs non configurati (BOOKING_ICAL_URL / AIRBNB_ICAL_URL)." });
    return;
  }

  try {
    const [bookingRes, airbnbRes] = await Promise.all([
      fetch(bookingUrl),
      fetch(airbnbUrl),
    ]);

    if (!bookingRes.ok || !airbnbRes.ok) {
      throw new Error("Errore nel download di uno dei due calendari");
    }

    const [bookingText, airbnbText] = await Promise.all([
      bookingRes.text(),
      airbnbRes.text(),
    ]);

    const blocked = [
      ...parseIcs(bookingText, "booking"),
      ...parseIcs(airbnbText, "airbnb"),
    ];

    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=3600");
    res.status(200).json({ blocked, updatedAt: new Date().toISOString() });
  } catch (err) {
    res.status(502).json({ error: "Impossibile recuperare la disponibilità in questo momento." });
  }
};
