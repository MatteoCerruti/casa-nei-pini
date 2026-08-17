// Contenuto della pagina Privacy: identico per entrambe le proprietà (cambiano
// solo nome/indirizzo/email del titolare, passati come variabili da Privacy.jsx),
// quindi tenuto qui in un unico posto invece che duplicato nelle traduzioni di
// ogni proprietà. Vedi [[componenti]] Privacy.jsx per l'uso.
const legalTranslations = {
  it: {
    title: "Privacy",
    subtitle: "Come trattiamo i dati personali degli ospiti",
    items: [],
    controller: {
      label: "Titolare del trattamento",
      text: "Il titolare del trattamento dei dati è {name}, {address}. Per qualsiasi richiesta relativa alla privacy puoi scrivere a {email}.",
    },
    sections: [
      { icon: "IdCard", label: "Dati raccolti", text: "Attraverso il modulo di check-in online raccogliamo i dati anagrafici degli ospiti (nome, cognome, data e luogo di nascita, cittadinanza, genere), gli estremi di un documento di identità (tipo e numero) e le date del soggiorno. Questi dati sono forniti direttamente dagli ospiti." },
      { icon: "Database", label: "Finalità e base giuridica", text: "Trattiamo questi dati per: adempiere all'obbligo di legge di comunicazione delle generalità degli ospiti alla Questura tramite il portale Alloggiati Web (art. 109 R.D. 773/1931 — Testo Unico delle Leggi di Pubblica Sicurezza), base giuridica: obbligo legale (art. 6.1.c GDPR); ed eseguire il contratto di soggiorno, ad esempio per organizzare il tuo arrivo, base giuridica: esecuzione del contratto (art. 6.1.b GDPR). Il conferimento dei dati è obbligatorio: senza questi dati non possiamo ospitarti. Non utilizziamo i tuoi dati per finalità di marketing né per processi decisionali automatizzati." },
      { icon: "Cookie", label: "Cookie e dati tecnici", text: "Il sito utilizza solo la memoria locale del browser (localStorage) per ricordare la lingua e il tema scelti: non installiamo cookie di profilazione o di terze parti." },
      { icon: "Server", label: "Destinatari e conservazione", text: "I dati vengono comunicati alla Questura competente per territorio, come richiesto dalla legge. Non vengono ceduti a terzi per finalità commerciali. Sono conservati per 30 giorni dalla fine del soggiorno, dopodiché vengono cancellati." },
    ],
    rights: {
      label: "I tuoi diritti",
      text: "Puoi in qualsiasi momento richiedere l'accesso, la rettifica, la cancellazione o la limitazione del trattamento dei tuoi dati, oppure opporti al trattamento, scrivendo a {email}. Hai inoltre diritto di proporre reclamo al Garante per la protezione dei dati personali (garanteprivacy.it).",
    },
  },
  en: {
    title: "Privacy",
    subtitle: "How we handle guests' personal data",
    items: [],
    controller: {
      label: "Data controller",
      text: "The data controller is {name}, {address}. For any privacy-related request you can write to {email}.",
    },
    sections: [
      { icon: "IdCard", label: "Data we collect", text: "Through the online check-in form we collect guests' personal details (first name, last name, date and place of birth, nationality, gender), ID document details (type and number), and the stay dates. This data is provided directly by guests." },
      { icon: "Database", label: "Purpose and legal basis", text: "We process this data to: comply with the legal obligation to report guests' details to the local Police (Questura) via the Alloggiati Web portal (art. 109 of the Italian Public Security Law — R.D. 773/1931), legal basis: legal obligation (GDPR art. 6.1.c); and to perform the stay contract, e.g. to organise your arrival, legal basis: performance of a contract (GDPR art. 6.1.b). Providing this data is mandatory: without it we cannot host you. We do not use your data for marketing purposes or automated decision-making." },
      { icon: "Cookie", label: "Cookies and technical data", text: "The site only uses your browser's local storage to remember your chosen language and theme: we do not use profiling or third-party cookies." },
      { icon: "Server", label: "Recipients and retention", text: "Data is shared with the local Police authority, as required by law. It is not shared with third parties for commercial purposes. It is kept for 30 days after the end of your stay, after which it is deleted." },
    ],
    rights: {
      label: "Your rights",
      text: "You can at any time request access, rectification, erasure or restriction of the processing of your data, or object to its processing, by writing to {email}. You also have the right to lodge a complaint with the Italian Data Protection Authority (garanteprivacy.it).",
    },
  },
  fr: {
    title: "Confidentialité",
    subtitle: "Comment nous traitons les données personnelles des hôtes",
    items: [],
    controller: {
      label: "Responsable du traitement",
      text: "Le responsable du traitement des données est {name}, {address}. Pour toute demande relative à la confidentialité, vous pouvez écrire à {email}.",
    },
    sections: [
      { icon: "IdCard", label: "Données collectées", text: "Via le formulaire d'enregistrement en ligne, nous collectons les données personnelles des hôtes (prénom, nom, date et lieu de naissance, nationalité, genre), les informations du document d'identité (type et numéro) et les dates du séjour. Ces données sont fournies directement par les hôtes." },
      { icon: "Database", label: "Finalité et base juridique", text: "Nous traitons ces données pour : respecter l'obligation légale de communiquer les données des hôtes à la Questura via le portail Alloggiati Web (art. 109 du R.D. 773/1931 — loi italienne sur la sécurité publique), base juridique : obligation légale (art. 6.1.c RGPD) ; et exécuter le contrat de séjour, par exemple pour organiser votre arrivée, base juridique : exécution du contrat (art. 6.1.b RGPD). La fourniture de ces données est obligatoire : sans elles, nous ne pouvons pas vous accueillir. Nous n'utilisons pas vos données à des fins marketing ni pour des décisions automatisées." },
      { icon: "Cookie", label: "Cookies et données techniques", text: "Le site utilise uniquement le stockage local du navigateur pour mémoriser la langue et le thème choisis : nous n'utilisons pas de cookies de profilage ou de tiers." },
      { icon: "Server", label: "Destinataires et conservation", text: "Les données sont communiquées à la Questura compétente, comme l'exige la loi. Elles ne sont pas cédées à des tiers à des fins commerciales. Elles sont conservées 30 jours après la fin du séjour, puis supprimées." },
    ],
    rights: {
      label: "Vos droits",
      text: "Vous pouvez à tout moment demander l'accès, la rectification, la suppression ou la limitation du traitement de vos données, ou vous y opposer, en écrivant à {email}. Vous avez également le droit de déposer une plainte auprès de l'autorité italienne de protection des données (garanteprivacy.it).",
    },
  },
  es: {
    title: "Privacidad",
    subtitle: "Cómo tratamos los datos personales de los huéspedes",
    items: [],
    controller: {
      label: "Responsable del tratamiento",
      text: "El responsable del tratamiento de los datos es {name}, {address}. Para cualquier solicitud relacionada con la privacidad puedes escribir a {email}.",
    },
    sections: [
      { icon: "IdCard", label: "Datos que recopilamos", text: "A través del formulario de check-in online recopilamos los datos personales de los huéspedes (nombre, apellidos, fecha y lugar de nacimiento, nacionalidad, género), los datos del documento de identidad (tipo y número) y las fechas de la estancia. Estos datos son proporcionados directamente por los huéspedes." },
      { icon: "Database", label: "Finalidad y base jurídica", text: "Tratamos estos datos para: cumplir con la obligación legal de comunicar los datos de los huéspedes a la Questura a través del portal Alloggiati Web (art. 109 del R.D. 773/1931 — ley italiana de seguridad pública), base jurídica: obligación legal (art. 6.1.c RGPD); y ejecutar el contrato de estancia, por ejemplo para organizar tu llegada, base jurídica: ejecución del contrato (art. 6.1.b RGPD). Aportar estos datos es obligatorio: sin ellos no podemos alojarte. No utilizamos tus datos con fines de marketing ni para decisiones automatizadas." },
      { icon: "Cookie", label: "Cookies y datos técnicos", text: "El sitio solo utiliza el almacenamiento local del navegador para recordar el idioma y el tema elegidos: no utilizamos cookies de perfilado ni de terceros." },
      { icon: "Server", label: "Destinatarios y conservación", text: "Los datos se comunican a la Questura competente, según lo exige la ley. No se ceden a terceros con fines comerciales. Se conservan durante 30 días tras el final de la estancia, tras lo cual se eliminan." },
    ],
    rights: {
      label: "Tus derechos",
      text: "Puedes solicitar en cualquier momento el acceso, la rectificación, la supresión o la limitación del tratamiento de tus datos, u oponerte a él, escribiendo a {email}. También tienes derecho a presentar una reclamación ante la autoridad italiana de protección de datos (garanteprivacy.it).",
    },
  },
  de: {
    title: "Datenschutz",
    subtitle: "Wie wir die persönlichen Daten der Gäste verarbeiten",
    items: [],
    controller: {
      label: "Verantwortlicher für die Datenverarbeitung",
      text: "Verantwortlicher für die Datenverarbeitung ist {name}, {address}. Für datenschutzbezogene Anfragen kannst du an {email} schreiben.",
    },
    sections: [
      { icon: "IdCard", label: "Erhobene Daten", text: "Über das Online-Check-in-Formular erheben wir die persönlichen Daten der Gäste (Vorname, Nachname, Geburtsdatum und -ort, Staatsangehörigkeit, Geschlecht), die Angaben zum Ausweisdokument (Art und Nummer) sowie die Aufenthaltsdaten. Diese Daten werden direkt von den Gästen angegeben." },
      { icon: "Database", label: "Zweck und Rechtsgrundlage", text: "Wir verarbeiten diese Daten, um: der gesetzlichen Pflicht zur Meldung der Gästedaten an die Questura über das Portal Alloggiati Web nachzukommen (Art. 109 des R.D. 773/1931 — italienisches Gesetz zur öffentlichen Sicherheit), Rechtsgrundlage: rechtliche Verpflichtung (Art. 6.1.c DSGVO); und den Beherbergungsvertrag zu erfüllen, z. B. um deine Ankunft zu organisieren, Rechtsgrundlage: Vertragserfüllung (Art. 6.1.b DSGVO). Die Angabe dieser Daten ist verpflichtend: ohne sie können wir dich nicht beherbergen. Wir nutzen deine Daten nicht für Marketingzwecke oder automatisierte Entscheidungen." },
      { icon: "Cookie", label: "Cookies und technische Daten", text: "Die Website verwendet nur den lokalen Speicher des Browsers, um die gewählte Sprache und das Design zu merken: wir setzen keine Profiling- oder Drittanbieter-Cookies ein." },
      { icon: "Server", label: "Empfänger und Speicherdauer", text: "Die Daten werden, wie gesetzlich vorgeschrieben, an die zuständige Questura übermittelt. Sie werden nicht zu kommerziellen Zwecken an Dritte weitergegeben. Sie werden 30 Tage nach Ende des Aufenthalts aufbewahrt und danach gelöscht." },
    ],
    rights: {
      label: "Deine Rechte",
      text: "Du kannst jederzeit Zugang, Berichtigung, Löschung oder Einschränkung der Verarbeitung deiner Daten verlangen oder der Verarbeitung widersprechen, indem du an {email} schreibst. Du hast außerdem das Recht, bei der italienischen Datenschutzbehörde (garanteprivacy.it) Beschwerde einzureichen.",
    },
  },
};

export default legalTranslations;
