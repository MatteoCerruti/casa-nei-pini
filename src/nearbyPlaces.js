// Dati strutturali (indirizzo, telefono, link Maps) dei luoghi nei dintorni.
// Le descrizioni tradotte vivono in translations/*.js sotto pages.dintorni.places.
const nearbyPlaces = [
  {
    id: "pizzerie",
    icon: "Pizza",
    places: [
      {
        id: "p400gradi",
        name: "400 Gradi Pizzeria Ristorante",
        address: "Via Giuseppe Verdi 1, Varazze",
        phone: "+39 350 143 9496",
        mapsUrl: "https://maps.google.com/?q=400+Gradi+Pizzeria+Via+Giuseppe+Verdi+Varazze",
      },
      {
        id: "ilGombo",
        name: "Il Gombo",
        address: "Via Emilio Vecchia 140, Varazze",
        phone: "019 918599",
        mapsUrl: "https://maps.google.com/?q=Il+Gombo+Via+Emilio+Vecchia+Varazze",
      },
      {
        id: "kursaal",
        name: "Kursaal Margherita",
        address: "Corso Matteotti 15, Varazze",
        phone: "+39 345 762 2779",
        mapsUrl: "https://maps.google.com/?q=Kursaal+Margherita+Corso+Matteotti+Varazze",
      },
      {
        id: "rugantino",
        name: "Ristorante Pizzeria Il Rugantino",
        address: "Via Guido Damele 8, Varazze",
        phone: "019 934832",
        mapsUrl: "https://maps.google.com/?q=Ristorante+Pizzeria+Il+Rugantino+Varazze",
      },
    ],
  },
  {
    id: "pesce",
    icon: "Fish",
    places: [
      {
        id: "pescePazzo",
        name: "Il Pesce Pazzo",
        address: "Via dei Maestri d'Ascia 1, Marina di Varazze",
        phone: "+39 342 803 6593",
        mapsUrl: "https://maps.google.com/?q=Il+Pesce+Pazzo+Marina+di+Varazze",
      },
      {
        id: "alSolitoPosto",
        name: "Al Solito Posto",
        address: "Via Santa Caterina 29-30, Varazze",
        phone: "019 2046537",
        mapsUrl: "https://maps.google.com/?q=Al+Solito+Posto+Varazze",
      },
      {
        id: "acquaESale",
        name: "Acqua e Sale Bistrot Creativo",
        address: "Varazze",
        mapsUrl: "https://maps.google.com/?q=Acqua+e+Sale+Bistrot+Varazze",
      },
      {
        id: "fishHouse",
        name: "Fish House Restaurant",
        address: "Varazze",
        mapsUrl: "https://maps.google.com/?q=Fish+House+Restaurant+Varazze",
      },
      {
        id: "calaTorcida",
        name: "Cala Torcida",
        address: "Varazze",
        mapsUrl: "https://maps.google.com/?q=Cala+Torcida+Varazze",
      },
      {
        id: "pescoei",
        name: "Pescoei Bistrot",
        address: "Via San Celso 1-3, Varazze",
        mapsUrl: "https://maps.google.com/?q=Pescoei+Bistrot+Varazze",
      },
    ],
  },
  {
    id: "bar",
    icon: "Coffee",
    places: [
      {
        id: "gattoNero",
        name: "Cafè Gatto Nero",
        address: "Piazza Dante Alighieri 21, Varazze",
        phone: "019 450 9562",
        mapsUrl: "https://maps.google.com/?q=Cafè+Gatto+Nero+Piazza+Dante+Varazze",
      },
      {
        id: "ebrezza",
        name: "E.brezza Enoteca Wine Bar",
        address: "Piazza Dante Alighieri 25-26, Varazze",
        phone: "019 933674",
        mapsUrl: "https://maps.google.com/?q=Ebrezza+Enoteca+Wine+Bar+Piazza+Dante+Varazze",
      },
      {
        id: "daRettaAllaMola",
        name: "Bar Da Retta alla Mola",
        address: "Lungomare, Varazze",
        mapsUrl: "https://maps.google.com/?q=Bar+Da+Retta+alla+Mola+Varazze",
      },
    ],
  },
  {
    id: "spiagge",
    icon: "Umbrella",
    places: [
      {
        id: "lungomareEuropa",
        name: "Lungomare Europa",
        mapsUrl: "https://maps.google.com/?q=Lungomare+Europa+Varazze",
      },
      {
        id: "spiaggePonente",
        name: "Spiagge zona Ponente",
        mapsUrl: "https://maps.google.com/?q=Spiaggia+Ponente+Varazze",
      },
      {
        id: "marinaVarazze",
        name: "Marina di Varazze",
        mapsUrl: "https://maps.google.com/?q=Marina+di+Varazze",
      },
      {
        id: "celleLigure",
        name: "Celle Ligure",
        mapsUrl: "https://maps.google.com/?q=Celle+Ligure",
      },
    ],
  },
  {
    id: "supermercati",
    icon: "ShoppingCart",
    places: [
      {
        id: "ekom",
        name: "Ekom",
        address: "Via Maestri del Lavoro 52, Varazze",
        mapsUrl: "https://maps.google.com/?q=Ekom+Via+Maestri+del+Lavoro+Varazze",
      },
      {
        id: "carrefourExpress",
        name: "Carrefour Express",
        address: "Varazze",
        mapsUrl: "https://maps.google.com/?q=Carrefour+Express+Varazze",
      },
      {
        id: "coop",
        name: "Coop",
        address: "Via Santa Caterina 49, Varazze",
        mapsUrl: "https://maps.google.com/?q=Coop+Via+Santa+Caterina+Varazze",
      },
      {
        id: "mercatoSettimanale",
        name: "Mercato settimanale",
        address: "Centro, Varazze",
        mapsUrl: "https://maps.google.com/?q=Mercato+Varazze",
      },
    ],
  },
  {
    id: "attrazioni",
    icon: "Compass",
    places: [
      {
        id: "santuarioGuardia",
        name: "Santuario di Nostra Signora della Guardia",
        mapsUrl: "https://maps.google.com/?q=Santuario+Nostra+Signora+Guardia+Varazze",
      },
      {
        id: "villaraba",
        name: "Villaraba",
        mapsUrl: "https://maps.google.com/?q=Villaraba+Varazze",
      },
      {
        id: "parcoBeigua",
        name: "Parco Naturale del Beigua",
        mapsUrl: "https://maps.google.com/?q=Parco+Naturale+del+Beigua",
      },
      {
        id: "surf",
        name: "Surf e sport acquatici",
        mapsUrl: "https://maps.google.com/?q=Molo+del+Surf+Varazze",
      },
      {
        id: "pistaCiclabile",
        name: "Pista ciclabile Varazze–Cogoleto",
        mapsUrl: "https://maps.google.com/?q=pista+ciclabile+Varazze+Cogoleto",
      },
      {
        id: "centroStorico",
        name: "Centro storico di Varazze",
        mapsUrl: "https://maps.google.com/?q=Centro+storico+Varazze",
      },
      {
        id: "albissola",
        name: "Albissola Marina",
        mapsUrl: "https://maps.google.com/?q=Albissola+Marina",
      },
      {
        id: "savona",
        name: "Savona",
        mapsUrl: "https://maps.google.com/?q=Savona+centro",
      },
      {
        id: "genova",
        name: "Genova",
        mapsUrl: "https://maps.google.com/?q=Genova+Porto+Antico",
      },
    ],
  },
];

export default nearbyPlaces;
