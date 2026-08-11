const config = {
  id: "vista-dai-pini",
  location: {
    address: "Via Nuova Cantalupo 29/2, 17019 Varazze (SV)",
    position: [44.3623255, 8.5665055],
    mapsLink: "https://maps.app.goo.gl/BPrxUKG2ZyoEczc46",
  },
  // Capienza massima dell'annuncio (Airbnb/Booking): limita il numero di
  // ospiti inseribili nel form di check-in online.
  maxGuests: 6,
  // TODO(vista-dai-pini): messo Sara di default per le richieste di
  // preventivo — confermare se è lei la referente giusta o va Antonella.
  quoteContact: {
    email: "scerruti03@gmail.com",
    whatsapp: "393925450682",
  },
  // Dati per l'informativa privacy e per il CIN mostrato in Contatti.
  legal: {
    controllerName: "Sara",
    controllerEmail: "scerruti03@gmail.com",
    vatNumber: null,
    cin: "IT009065C2U8B6LTXX",
  },
  rooms: [
    { id: "salotto", titleKey: "roomLivingRoom" },
    { id: "cucina", titleKey: "roomKitchen" },
    { id: "camera-1", titleKey: "roomMatrimoniale1" },
    { id: "camera-2", titleKey: "roomMatrimoniale2" },
    { id: "camera-3", titleKey: "roomMatrimoniale3" },
    { id: "bagno", titleKey: "roomBathroom" },
    { id: "interni", titleKey: "roomInterior" },
    { id: "esterni", titleKey: "roomExterior" },
  ],
};

export default config;
