// Dati non testuali specifici di questa proprietà (posizione, link mappa, ecc.).
// I testi/contenuti multilingua vivono invece in ./translations.
const config = {
  id: "casa-nei-pini",
  location: {
    address: "Via Nuova Cantalupo 29/1, 17019 Varazze (SV)",
    position: [44.3623255, 8.5665055],
    mapsLink: "https://maps.app.goo.gl/BPrxUKG2ZyoEczc46",
  },
  // Destinatario delle richieste di preventivo dalla pagina Disponibilità.
  quoteContact: {
    email: "mcerruti00@gmail.com",
    whatsapp: "393481138760",
  },
  // Stanze mostrate in pagina Stanze: id -> cartella foto in assets/photos/apartment/<id>,
  // titleKey -> chiave in translations/*.js sotto common.
  rooms: [
    { id: "salotto", titleKey: "roomLivingRoom" },
    { id: "cucina", titleKey: "roomKitchen" },
    { id: "camera-matrimoniale", titleKey: "roomMasterBedroom" },
    { id: "camera-doppia", titleKey: "roomTwinRoom" },
    { id: "camera-una-e-mezza", titleKey: "roomSingleRoom" },
    { id: "bagno", titleKey: "roomBathroom" },
    { id: "interni", titleKey: "roomInterior" },
    { id: "esterni", titleKey: "roomExterior" },
  ],
};

export default config;
