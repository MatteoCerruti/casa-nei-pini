import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { UserPlus, Trash2, CheckCircle2, Share2, Check, Loader2 } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import DateField from "../components/DateField";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";
import { config } from "../properties";
import "./GuestCheckin.css";

const COPY = {
  it: {
    errorRequiredFields: "Compila tutti i campi obbligatori.",
    errorArrivalPast: "La data di arrivo non può essere nel passato.",
    errorDepartureBeforeArrival: "La data di partenza deve essere successiva a quella di arrivo.",
    errorBirthDateFuture: "La data di nascita non può essere nel futuro.",
    codeStepTitle: "Trova la tua prenotazione",
    codeStepSubtitle: "Inserisci il codice di conferma che hai ricevuto da Airbnb o Booking, insieme alle date del tuo soggiorno.",
    codeLabel: "Codice di conferma",
    codePlaceholder: "es. HMW3QX4Q8K",
    codeContinue: "Continua",
    noDocumentYet: "Serve il documento di almeno un ospite prima di poter concludere.",
    finalizeConfirmTitle: "Confermi?",
    cancel: "Annulla",
    finalizeConfirm: "Confermi di aver finito? Dopo non potrai più modificare o aggiungere ospiti a questa prenotazione.",
    inviteSubtitle: "Manda questo link a chi manca: potrà compilare da solo i suoi dati, senza bisogno di te.",
    maxGuestsReached: (n) => `Hai raggiunto il numero massimo di ospiti (${n}) previsto per questo alloggio.`,
    inviteTitle: "Invita un altro ospite",
    shareLink: "Condividi link con un altro ospite",
    linkCopied: "Link copiato!",
    alreadyRegistered: "Ospiti già registrati",
    continueLater: "Continua più tardi",
    finish: "Ho finito, nessun altro ospite",
    finishing: "Salvataggio…",
    completeBanner: "Registrazione completata. Grazie, non serve aggiungere altro.",
    savedBanner: "Dati salvati. Puoi chiudere e riaprire questo link quando vuoi per aggiungere altri ospiti, oppure condividerlo con loro così possono compilarlo da soli.",
    sharedBanner: (n) => `Questa prenotazione ha già ${n} ospit${n === 1 ? "e" : "i"} registrat${n === 1 ? "o" : "i"}.`,
    datesLocked: "Date fissate dal link ricevuto",
    title: "Registrazione ospiti",
    subtitle: "Compila questo modulo prima del tuo arrivo: ci serve per la registrazione in questura.",
    arrival: "Data di arrivo",
    departure: "Data di partenza",
    notes: "Note per l'host (opzionale)",
    guestsTitle: "Ospiti",
    guest: "Ospite",
    firstName: "Nome",
    lastName: "Cognome",
    birthDate: "Data di nascita",
    birthPlace: "Luogo di nascita",
    nationality: "Cittadinanza",
    documentType: "Tipo documento",
    documentNumber: "Numero documento",
    addGuest: "Aggiungi ospite",
    removeGuest: "Rimuovi",
    submit: "Invia registrazione",
    submitting: "Invio in corso…",
    success: "Registrazione inviata! Ti aspettiamo.",
    error: "Qualcosa è andato storto, riprova o contattaci direttamente.",
    documentTypes: ["Carta d'identità", "Passaporto", "Patente"],
    privacyNotePrefix: "Inviando questi dati dichiari di aver preso visione dell'",
    privacyLinkLabel: "informativa privacy",
    privacyNoteSuffix: ". I dati vengono usati solo per la registrazione obbligatoria in Questura e per la gestione del soggiorno.",
    gender: "Genere",
    genders: [
      { value: "F", label: "Femmina" },
      { value: "M", label: "Maschio" },
      { value: "X", label: "Altro" },
    ],
  },
  en: {
    errorRequiredFields: "Please fill in all required fields.",
    errorArrivalPast: "The arrival date cannot be in the past.",
    errorDepartureBeforeArrival: "The departure date must be after the arrival date.",
    errorBirthDateFuture: "The date of birth cannot be in the future.",
    codeStepTitle: "Find your booking",
    codeStepSubtitle: "Enter the confirmation code you received from Airbnb or Booking, along with your stay dates.",
    codeLabel: "Confirmation code",
    codePlaceholder: "e.g. HMW3QX4Q8K",
    codeContinue: "Continue",
    noDocumentYet: "At least one guest needs a document before you can finish.",
    finalizeConfirmTitle: "Are you sure?",
    cancel: "Cancel",
    finalizeConfirm: "Are you sure you're done? After this you won't be able to edit or add guests to this booking anymore.",
    inviteSubtitle: "Send this link to anyone missing: they can fill in their own details, no need for you.",
    maxGuestsReached: (n) => `You have reached the maximum number of guests (${n}) allowed for this property.`,
    inviteTitle: "Invite another guest",
    shareLink: "Share link with another guest",
    linkCopied: "Link copied!",
    alreadyRegistered: "Already registered guests",
    continueLater: "Continue later",
    finish: "Done, no other guests",
    finishing: "Saving…",
    completeBanner: "Registration complete. Thanks, nothing else to add.",
    savedBanner: "Saved. You can close and reopen this link anytime to add more guests, or share it with them so they can fill it in themselves.",
    sharedBanner: (n) => `This booking already has ${n} guest${n === 1 ? "" : "s"} registered.`,
    datesLocked: "Dates set by the link you received",
    title: "Guest registration",
    subtitle: "Fill in this form before your arrival: we need it for the local police registration.",
    arrival: "Arrival date",
    departure: "Departure date",
    notes: "Notes for the host (optional)",
    guestsTitle: "Guests",
    guest: "Guest",
    firstName: "First name",
    lastName: "Last name",
    birthDate: "Date of birth",
    birthPlace: "Place of birth",
    nationality: "Nationality",
    documentType: "Document type",
    documentNumber: "Document number",
    addGuest: "Add guest",
    removeGuest: "Remove",
    submit: "Send registration",
    submitting: "Sending…",
    success: "Registration sent! See you soon.",
    error: "Something went wrong, please try again or contact us directly.",
    documentTypes: ["ID card", "Passport", "Driving licence"],
    privacyNotePrefix: "By submitting this form you confirm you have read our ",
    privacyLinkLabel: "privacy notice",
    privacyNoteSuffix: ". Your data is used only for the mandatory registration with the local Police and to manage your stay.",
    gender: "Gender",
    genders: [
      { value: "F", label: "Female" },
      { value: "M", label: "Male" },
      { value: "X", label: "Other" },
    ],
  },
  fr: {
    errorRequiredFields: "Veuillez remplir tous les champs obligatoires.",
    errorArrivalPast: "La date d'arrivée ne peut pas être dans le passé.",
    errorDepartureBeforeArrival: "La date de départ doit être postérieure à la date d'arrivée.",
    errorBirthDateFuture: "La date de naissance ne peut pas être dans le futur.",
    codeStepTitle: "Trouvez votre réservation",
    codeStepSubtitle: "Saisissez le code de confirmation reçu d'Airbnb ou de Booking, ainsi que les dates de votre séjour.",
    codeLabel: "Code de confirmation",
    codePlaceholder: "ex. HMW3QX4Q8K",
    codeContinue: "Continuer",
    noDocumentYet: "Au moins un hôte doit fournir un document avant de pouvoir terminer.",
    finalizeConfirmTitle: "Confirmez-vous ?",
    cancel: "Annuler",
    finalizeConfirm: "Confirmez-vous avoir terminé ? Vous ne pourrez plus modifier ni ajouter d'hôtes à cette réservation ensuite.",
    inviteSubtitle: "Envoyez ce lien à qui manque : il pourra remplir ses propres informations, sans avoir besoin de vous.",
    maxGuestsReached: (n) => `Vous avez atteint le nombre maximum d'hôtes (${n}) autorisé pour ce logement.`,
    inviteTitle: "Inviter un autre hôte",
    shareLink: "Partager le lien avec un autre hôte",
    linkCopied: "Lien copié !",
    alreadyRegistered: "Hôtes déjà enregistrés",
    continueLater: "Continuer plus tard",
    finish: "Terminé, aucun autre hôte",
    finishing: "Enregistrement…",
    completeBanner: "Enregistrement terminé. Merci, rien d'autre à ajouter.",
    savedBanner: "Enregistré. Vous pouvez fermer et rouvrir ce lien à tout moment pour ajouter d'autres hôtes, ou le partager avec eux pour qu'ils le remplissent eux-mêmes.",
    sharedBanner: (n) => `Cette réservation compte déjà ${n} hôte${n === 1 ? "" : "s"} enregistré${n === 1 ? "" : "s"}.`,
    datesLocked: "Dates fixées par le lien reçu",
    title: "Enregistrement des hôtes",
    subtitle: "Remplissez ce formulaire avant votre arrivée : il nous sert pour la déclaration à la police locale.",
    arrival: "Date d'arrivée",
    departure: "Date de départ",
    notes: "Notes pour l'hôte (facultatif)",
    guestsTitle: "Hôtes",
    guest: "Hôte",
    firstName: "Prénom",
    lastName: "Nom",
    birthDate: "Date de naissance",
    birthPlace: "Lieu de naissance",
    nationality: "Nationalité",
    documentType: "Type de document",
    documentNumber: "Numéro de document",
    addGuest: "Ajouter un hôte",
    removeGuest: "Supprimer",
    submit: "Envoyer l'enregistrement",
    submitting: "Envoi en cours…",
    success: "Enregistrement envoyé ! À bientôt.",
    error: "Une erreur est survenue, réessayez ou contactez-nous directement.",
    documentTypes: ["Carte d'identité", "Passeport", "Permis de conduire"],
    privacyNotePrefix: "En envoyant ce formulaire, vous confirmez avoir pris connaissance de notre ",
    privacyLinkLabel: "politique de confidentialité",
    privacyNoteSuffix: ". Vos données ne sont utilisées que pour l'enregistrement obligatoire auprès de la police locale et pour la gestion de votre séjour.",
    gender: "Genre",
    genders: [
      { value: "F", label: "Femme" },
      { value: "M", label: "Homme" },
      { value: "X", label: "Autre" },
    ],
  },
  es: {
    errorRequiredFields: "Completa todos los campos obligatorios.",
    errorArrivalPast: "La fecha de llegada no puede ser en el pasado.",
    errorDepartureBeforeArrival: "La fecha de salida debe ser posterior a la de llegada.",
    errorBirthDateFuture: "La fecha de nacimiento no puede ser en el futuro.",
    codeStepTitle: "Encuentra tu reserva",
    codeStepSubtitle: "Introduce el código de confirmación que recibiste de Airbnb o Booking, junto con las fechas de tu estancia.",
    codeLabel: "Código de confirmación",
    codePlaceholder: "ej. HMW3QX4Q8K",
    codeContinue: "Continuar",
    noDocumentYet: "Al menos un huésped debe aportar un documento antes de poder finalizar.",
    finalizeConfirmTitle: "¿Confirmas?",
    cancel: "Cancelar",
    finalizeConfirm: "¿Confirmas que has terminado? Después no podrás modificar ni añadir huéspedes a esta reserva.",
    inviteSubtitle: "Envía este enlace a quien falte: podrá rellenar sus propios datos sin necesitarte a ti.",
    maxGuestsReached: (n) => `Has alcanzado el número máximo de huéspedes (${n}) permitido para este alojamiento.`,
    inviteTitle: "Invitar a otro huésped",
    shareLink: "Compartir enlace con otro huésped",
    linkCopied: "¡Enlace copiado!",
    alreadyRegistered: "Huéspedes ya registrados",
    continueLater: "Continuar más tarde",
    finish: "Listo, ningún otro huésped",
    finishing: "Guardando…",
    completeBanner: "Registro completado. Gracias, no hace falta añadir nada más.",
    savedBanner: "Guardado. Puedes cerrar y reabrir este enlace cuando quieras para añadir más huéspedes, o compartirlo con ellos para que lo rellenen ellos mismos.",
    sharedBanner: (n) => `Esta reserva ya tiene ${n} huésped${n === 1 ? "" : "es"} registrado${n === 1 ? "" : "s"}.`,
    datesLocked: "Fechas fijadas por el enlace recibido",
    title: "Registro de huéspedes",
    subtitle: "Completa este formulario antes de tu llegada: lo necesitamos para el registro ante la policía local.",
    arrival: "Fecha de llegada",
    departure: "Fecha de salida",
    notes: "Notas para el anfitrión (opcional)",
    guestsTitle: "Huéspedes",
    guest: "Huésped",
    firstName: "Nombre",
    lastName: "Apellido",
    birthDate: "Fecha de nacimiento",
    birthPlace: "Lugar de nacimiento",
    nationality: "Nacionalidad",
    documentType: "Tipo de documento",
    documentNumber: "Número de documento",
    addGuest: "Añadir huésped",
    removeGuest: "Eliminar",
    submit: "Enviar registro",
    submitting: "Enviando…",
    success: "¡Registro enviado! Te esperamos.",
    error: "Algo salió mal, inténtalo de nuevo o contáctanos directamente.",
    documentTypes: ["DNI", "Pasaporte", "Carné de conducir"],
    privacyNotePrefix: "Al enviar este formulario confirmas que has leído nuestra ",
    privacyLinkLabel: "política de privacidad",
    privacyNoteSuffix: ". Tus datos solo se usan para el registro obligatorio ante la policía local y para gestionar tu estancia.",
    gender: "Género",
    genders: [
      { value: "F", label: "Mujer" },
      { value: "M", label: "Hombre" },
      { value: "X", label: "Otro" },
    ],
  },
  de: {
    errorRequiredFields: "Bitte fülle alle Pflichtfelder aus.",
    errorArrivalPast: "Das Ankunftsdatum darf nicht in der Vergangenheit liegen.",
    errorDepartureBeforeArrival: "Das Abreisedatum muss nach dem Ankunftsdatum liegen.",
    errorBirthDateFuture: "Das Geburtsdatum darf nicht in der Zukunft liegen.",
    codeStepTitle: "Finde deine Buchung",
    codeStepSubtitle: "Gib den Bestätigungscode ein, den du von Airbnb oder Booking erhalten hast, sowie deine Aufenthaltsdaten.",
    codeLabel: "Bestätigungscode",
    codePlaceholder: "z. B. HMW3QX4Q8K",
    codeContinue: "Weiter",
    noDocumentYet: "Mindestens ein Gast muss ein Dokument angeben, bevor du abschließen kannst.",
    finalizeConfirmTitle: "Bist du sicher?",
    cancel: "Abbrechen",
    finalizeConfirm: "Bist du sicher, dass du fertig bist? Danach kannst du dieser Buchung keine Gäste mehr hinzufügen oder ändern.",
    inviteSubtitle: "Sende diesen Link an fehlende Personen: sie können ihre eigenen Daten selbst eintragen, ohne dich zu brauchen.",
    maxGuestsReached: (n) => `Du hast die maximale Anzahl an Gästen (${n}) für diese Unterkunft erreicht.`,
    inviteTitle: "Einen weiteren Gast einladen",
    shareLink: "Link mit einem anderen Gast teilen",
    linkCopied: "Link kopiert!",
    alreadyRegistered: "Bereits registrierte Gäste",
    continueLater: "Später fortsetzen",
    finish: "Fertig, keine weiteren Gäste",
    finishing: "Wird gespeichert…",
    completeBanner: "Registrierung abgeschlossen. Danke, es muss nichts mehr hinzugefügt werden.",
    savedBanner: "Gespeichert. Du kannst diesen Link jederzeit schließen und wieder öffnen, um weitere Gäste hinzuzufügen, oder ihn teilen, damit sie es selbst ausfüllen können.",
    sharedBanner: (n) => `Für diese Buchung sind bereits ${n} Gast${n === 1 ? "" : "e"} registriert.`,
    datesLocked: "Daten durch den erhaltenen Link festgelegt",
    title: "Gästeregistrierung",
    subtitle: "Fülle dieses Formular vor deiner Ankunft aus: wir benötigen es für die Meldung bei der örtlichen Polizei.",
    arrival: "Ankunftsdatum",
    departure: "Abreisedatum",
    notes: "Notizen für den Gastgeber (optional)",
    guestsTitle: "Gäste",
    guest: "Gast",
    firstName: "Vorname",
    lastName: "Nachname",
    birthDate: "Geburtsdatum",
    birthPlace: "Geburtsort",
    nationality: "Staatsangehörigkeit",
    documentType: "Dokumenttyp",
    documentNumber: "Dokumentnummer",
    addGuest: "Gast hinzufügen",
    removeGuest: "Entfernen",
    submit: "Registrierung senden",
    submitting: "Wird gesendet…",
    success: "Registrierung gesendet! Wir freuen uns auf dich.",
    error: "Etwas ist schiefgelaufen, versuche es erneut oder kontaktiere uns direkt.",
    documentTypes: ["Personalausweis", "Reisepass", "Führerschein"],
    privacyNotePrefix: "Mit dem Absenden dieses Formulars bestätigst du, unsere ",
    privacyLinkLabel: "Datenschutzerklärung",
    privacyNoteSuffix: " gelesen zu haben. Deine Daten werden nur für die verpflichtende Meldung bei der Polizei und für die Verwaltung deines Aufenthalts verwendet.",
    gender: "Geschlecht",
    genders: [
      { value: "F", label: "Weiblich" },
      { value: "M", label: "Männlich" },
      { value: "X", label: "Divers" },
    ],
  },
};

function dateOnlyIso(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// I link automatici di Airbnb/Booking potrebbero inserire le date in un
// formato diverso da YYYY-MM-DD a seconda della lingua dell'host/ospite
// (es. 13/08/2026). Se il parametro non è ISO valido lo scartiamo invece
// di rischiare di interpretarlo male: l'ospite lo inserirà a mano.
function parseIsoDateParam(value) {
  return value && ISO_DATE_RE.test(value) ? value : "";
}

const EMPTY_GUEST = {
  firstName: "",
  lastName: "",
  gender: "",
  birthDate: "",
  birthPlace: "",
  nationality: "",
  documentType: "",
  documentNumber: "",
};

function GuestCheckin() {
  const { lang } = useLanguage();
  const c = COPY[lang] ?? COPY.en;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const rawRef = searchParams.get("ref") || "";
  const urlArrival = parseIsoDateParam(searchParams.get("arrival"));
  const urlDeparture = parseIsoDateParam(searchParams.get("departure"));
  // Il ref da solo basta: se la prenotazione esiste già a DB (l'ha aperta
  // prima qualcun altro), recuperiamo le sue date da lì. Le date nell'URL
  // sono solo un aiuto per crearla la prima volta.
  const bookingRef = rawRef;

  const [codeInput, setCodeInput] = useState(rawRef);
  const [codeArrival, setCodeArrival] = useState("");
  const [codeDeparture, setCodeDeparture] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  function handleCodeSubmit(e) {
    e.preventDefault();

    if (!codeInput.trim() || !codeArrival || !codeDeparture) {
      setToastMessage(c.errorRequiredFields);
      return;
    }

    const todayIso = dateOnlyIso(new Date());
    if (codeArrival < todayIso) {
      setToastMessage(c.errorArrivalPast);
      return;
    }
    if (codeDeparture <= codeArrival) {
      setToastMessage(c.errorDepartureBeforeArrival);
      return;
    }

    const params = new URLSearchParams({
      ref: codeInput.trim(),
      arrival: codeArrival,
      departure: codeDeparture,
    });
    setInitialLoading(true);
    navigate(`/checkin-online?${params.toString()}`, { replace: true });
  }

  const [arrivalDate, setArrivalDate] = useState(urlArrival);
  const [departureDate, setDepartureDate] = useState(urlDeparture);

  useEffect(() => {
    if (urlArrival) setArrivalDate(urlArrival);
    if (urlDeparture) setDepartureDate(urlDeparture);
  }, [urlArrival, urlDeparture]);

  const [notes, setNotes] = useState("");
  const [guests, setGuests] = useState([{ ...EMPTY_GUEST }]);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [savedGuests, setSavedGuests] = useState([]);
  const [bookingStatus, setBookingStatus] = useState(null); // null | draft | complete
  const [hasDocument, setHasDocument] = useState(false);
  const [removingIndex, setRemovingIndex] = useState(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [initialLoading, setInitialLoading] = useState(Boolean(bookingRef));
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [pendingFinalize, setPendingFinalize] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ url });
        return;
      } catch {
        // utente ha annullato o share non disponibile: fallback a copia
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // niente clipboard disponibile: non blocchiamo l'utente
    }
  }

  function refreshBooking() {
    if (!bookingRef) return Promise.resolve();
    return fetch(`/api/booking?ref=${encodeURIComponent(bookingRef)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.exists) {
          setArrivalDate(data.arrivalDate.slice(0, 10));
          setDepartureDate(data.departureDate.slice(0, 10));
          setSavedGuests(data.guests || []);
          setBookingStatus(data.status);
          setHasDocument(Boolean(data.hasDocument));
          setBookingConfirmed(true);
        }
        return data;
      })
      .catch(() => null);
  }

  useEffect(() => {
    if (!bookingRef) {
      setInitialLoading(false);
      return;
    }

    // Il ref potrebbe già esistere a DB (creato da chi ha aperto prima lo
    // stesso link): se sì, usiamo le sue date invece di richiederle di
    // nuovo. Solo se non esiste ancora e abbiamo date valide nell'URL la
    // creiamo noi ora.
    fetch(`/api/booking?ref=${encodeURIComponent(bookingRef)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.exists) {
          setArrivalDate(data.arrivalDate.slice(0, 10));
          setDepartureDate(data.departureDate.slice(0, 10));
          setSavedGuests(data.guests || []);
          setBookingStatus(data.status);
          setHasDocument(Boolean(data.hasDocument));
          setBookingConfirmed(true);
          return;
        }
        if (urlArrival && urlDeparture) {
          return fetch("/api/booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookingRef, arrivalDate: urlArrival, departureDate: urlDeparture }),
          })
            .then(refreshBooking)
            .then(() => setBookingConfirmed(true));
        }
        setBookingConfirmed(false);
      })
      .catch(() => setBookingConfirmed(false))
      .finally(() => setInitialLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingRef, urlArrival, urlDeparture]);

  // Se al caricamento la prenotazione ha già raggiunto la capienza
  // massima, non mostriamo la card ospite vuota di default.
  useEffect(() => {
    if (initialLoading) return;
    if (savedGuests.length >= config.maxGuests) {
      setGuests([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLoading]);

  function updateGuest(index, field, value) {
    setGuests((prev) => prev.map((g, i) => (i === index ? { ...g, [field]: value } : g)));
  }

  const maxGuests = config.maxGuests;
  const totalGuests = savedGuests.length + guests.length;
  const maxGuestsReached = totalGuests >= maxGuests;
  const canFinish = hasDocument || guests.some((g) => g.documentType?.trim() && g.documentNumber?.trim());

  function addGuest() {
    if (maxGuestsReached) return;
    setGuests((prev) => [...prev, { ...EMPTY_GUEST }]);
  }

  function removeGuest(index) {
    setGuests((prev) => prev.filter((_, i) => i !== index));
  }

  async function removeSavedGuest(index) {
    setRemovingIndex(index);
    try {
      await fetch("/api/checkin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingRef, guestIndex: index }),
      });
      refreshBooking();
    } catch {
      // best-effort: se fallisce l'utente può riprovare
    } finally {
      setRemovingIndex(null);
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const hasMissingFields = guests.some((g, i) => {
      if (!g.firstName?.trim() || !g.lastName?.trim() || !g.birthDate || !g.birthPlace?.trim() || !g.nationality?.trim() || !g.gender) {
        return true;
      }
      if (i === 0 && !hasDocument && (!g.documentType?.trim() || !g.documentNumber?.trim())) {
        return true;
      }
      return false;
    });
    if (hasMissingFields) {
      setToastMessage(c.errorRequiredFields);
      return;
    }

    const todayIso = dateOnlyIso(new Date());
    const hasFutureBirthDate = guests.some((g) => g.birthDate && g.birthDate > todayIso);
    if (hasFutureBirthDate) {
      setToastMessage(c.errorBirthDateFuture);
      return;
    }

    const finalize = e.nativeEvent.submitter?.dataset.finalize === "true";
    if (finalize && bookingRef) {
      setPendingFinalize(true);
      return;
    }
    doSubmit(finalize);
  }

  async function doSubmit(finalize) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingRef: bookingRef || undefined, arrivalDate, departureDate, notes, guests, finalize }),
      });
      if (!res.ok) throw new Error("request failed");

      if (finalize || !bookingRef) {
        setStatus("success");
      } else {
        const newTotal = savedGuests.length + guests.length;
        setGuests(newTotal >= config.maxGuests ? [] : [{ ...EMPTY_GUEST }]);
        setNotes("");
        setStatus("saved");
        refreshBooking();
      }
    } catch {
      setStatus("error");
    }
  }

  if (initialLoading) {
    return (
      <div className="page section-page section-page-guestcheckin">
        <div className="section-title-row">
          <UserPlus className="section-title-icon" size={24} strokeWidth={1.75} />
          <h1 className="section-title">{c.title}</h1>
        </div>
        <hr className="section-title-divider" />
        <div className="guestcheckin-layout has-sidebar">
          <div className="guestcheckin-form">
            <div className="guestcheckin-row">
              <div className="guestcheckin-skeleton guestcheckin-skeleton-field" />
              <div className="guestcheckin-skeleton guestcheckin-skeleton-field" />
            </div>
            <div className="guestcheckin-skeleton guestcheckin-skeleton-field" />
            <div className="guestcheckin-skeleton guestcheckin-skeleton-card" />
            <div className="guestcheckin-skeleton guestcheckin-skeleton-card" />
          </div>
          <aside className="guestcheckin-sidebar">
            <div className="guestcheckin-skeleton guestcheckin-skeleton-line" style={{ width: "60%" }} />
            <div className="guestcheckin-skeleton guestcheckin-skeleton-line" style={{ width: "90%", marginTop: 8 }} />
            <div className="guestcheckin-skeleton guestcheckin-skeleton-field" style={{ marginTop: 16 }} />
          </aside>
        </div>
      </div>
    );
  }

  if (!bookingConfirmed) {
    return (
      <div className="page section-page section-page-guestcheckin">
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
        <div className="section-title-row">
          <UserPlus className="section-title-icon" size={24} strokeWidth={1.75} />
          <h1 className="section-title">{c.codeStepTitle}</h1>
        </div>
        <p className="section-subtitle">{c.codeStepSubtitle}</p>
        <hr className="section-title-divider" />

        <form className="guestcheckin-form" onSubmit={handleCodeSubmit}>
          <label>
            {c.codeLabel}
            <input
              required
              value={codeInput}
              placeholder={c.codePlaceholder}
              onChange={(e) => setCodeInput(e.target.value)}
            />
          </label>
          <div className="guestcheckin-row">
            <label>
              {c.arrival}
              <DateField lang={lang} value={codeArrival} onChange={setCodeArrival} />
            </label>
            <label>
              {c.departure}
              <DateField lang={lang} value={codeDeparture} onChange={setCodeDeparture} />
            </label>
          </div>
          <button type="submit" className="guestcheckin-submit">
            {c.codeContinue}
          </button>
        </form>
      </div>
    );
  }

  if (status === "success" || bookingStatus === "complete") {
    return (
      <div className="page section-page section-page-guestcheckin">
        <div className="guestcheckin-success">
          <CheckCircle2 size={40} strokeWidth={1.5} />
          <p>{bookingStatus === "complete" ? c.completeBanner : c.success}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page section-page section-page-guestcheckin">
      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      {pendingFinalize && (
        <ConfirmDialog
          title={c.finalizeConfirmTitle}
          message={c.finalizeConfirm}
          confirmLabel={c.finish}
          cancelLabel={c.cancel}
          onCancel={() => setPendingFinalize(false)}
          onConfirm={() => {
            setPendingFinalize(false);
            doSubmit(true);
          }}
        />
      )}

      <div className="section-title-row">
        <UserPlus className="section-title-icon" size={24} strokeWidth={1.75} />
        <h1 className="section-title">{c.title}</h1>
      </div>
      <p className="section-subtitle">{c.subtitle}</p>

      <hr className="section-title-divider" />

      {status === "saved" && <p className="guestcheckin-shared-banner">{c.savedBanner}</p>}

      <div className={bookingRef ? "guestcheckin-layout has-sidebar" : "guestcheckin-layout"}>
      <form
        className="guestcheckin-form"
        onSubmit={handleFormSubmit}
      >
        <div className="guestcheckin-row">
          <label>
            {c.arrival}
            <div className="guestcheckin-locked-date">{new Date(arrivalDate).toLocaleDateString(lang)}</div>
          </label>
          <label>
            {c.departure}
            <div className="guestcheckin-locked-date">{new Date(departureDate).toLocaleDateString(lang)}</div>
          </label>
        </div>

        <label>
          {c.notes}
          <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>

        <h2 className="card-group-title guestcheckin-guests-title">{c.guestsTitle}</h2>

        {guests.map((guest, i) => (
          <div className="guestcheckin-guest-card" key={i}>
            <div className="guestcheckin-guest-header">
              <span>{c.guest} {savedGuests.length + i + 1}</span>
              {(guests.length > 1 || savedGuests.length > 0) && (
                <button type="button" className="guestcheckin-remove" onClick={() => removeGuest(i)}>
                  <Trash2 size={14} strokeWidth={1.75} />
                  {c.removeGuest}
                </button>
              )}
            </div>
            <div className="guestcheckin-row">
              <label>
                {c.firstName}
                <input value={guest.firstName} onChange={(e) => updateGuest(i, "firstName", e.target.value)} />
              </label>
              <label>
                {c.lastName}
                <input value={guest.lastName} onChange={(e) => updateGuest(i, "lastName", e.target.value)} />
              </label>
            </div>
            <div className="guestcheckin-row">
              <label>
                {c.birthDate}
                <DateField lang={lang} value={guest.birthDate} onChange={(v) => updateGuest(i, "birthDate", v)} />
              </label>
              <label>
                {c.birthPlace}
                <input value={guest.birthPlace} onChange={(e) => updateGuest(i, "birthPlace", e.target.value)} />
              </label>
            </div>
            <div className="guestcheckin-row">
              <label>
                {c.nationality}
                <input value={guest.nationality} onChange={(e) => updateGuest(i, "nationality", e.target.value)} />
              </label>
              <label>
                {c.gender}
                <select value={guest.gender} onChange={(e) => updateGuest(i, "gender", e.target.value)}>
                  <option value="" disabled></option>
                  {c.genders.map((g) => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </label>
            </div>
            {i === 0 && !hasDocument && (
              <>
                <div className="guestcheckin-row">
                  <label>
                    {c.documentType}
                    <select value={guest.documentType} onChange={(e) => updateGuest(i, "documentType", e.target.value)}>
                      <option value="" disabled></option>
                      {c.documentTypes.map((docType) => (
                        <option key={docType} value={docType}>{docType}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    {c.documentNumber}
                    <input value={guest.documentNumber} onChange={(e) => updateGuest(i, "documentNumber", e.target.value)} />
                  </label>
                </div>
              </>
            )}
          </div>
        ))}

        {maxGuestsReached ? (
          <p className="guestcheckin-max-guests">{c.maxGuestsReached(maxGuests)}</p>
        ) : (
          <button type="button" className="guestcheckin-add" onClick={addGuest}>
            <UserPlus size={16} strokeWidth={1.75} />
            {c.addGuest}
          </button>
        )}

        <p className="guestcheckin-privacy-note">
          {c.privacyNotePrefix}
          <Link to="/privacy" target="_blank" rel="noopener noreferrer">{c.privacyLinkLabel}</Link>
          {c.privacyNoteSuffix}
        </p>

        {status === "error" && <p className="guestcheckin-error">{c.error}</p>}
        {bookingRef && !canFinish && <p className="guestcheckin-max-guests">{c.noDocumentYet}</p>}

        {bookingRef ? (
          <div className="guestcheckin-actions">
            <button type="submit" className="guestcheckin-submit-secondary" disabled={status === "submitting"}>
              {status === "submitting" ? c.finishing : c.continueLater}
            </button>
            <button
              type="submit"
              data-finalize="true"
              className="guestcheckin-submit"
              disabled={status === "submitting" || !canFinish}
              title={!canFinish ? c.noDocumentYet : undefined}
            >
              {status === "submitting" ? c.finishing : c.finish}
            </button>
          </div>
        ) : (
          <button type="submit" className="guestcheckin-submit" disabled={status === "submitting"}>
            {status === "submitting" ? c.submitting : c.submit}
          </button>
        )}
      </form>

      {bookingRef && (
        <aside className="guestcheckin-sidebar">
          <div className={savedGuests.length > 0 ? "guestcheckin-invite has-guests" : "guestcheckin-invite"}>
            <h2 className="card-group-title guestcheckin-guests-title">{c.inviteTitle}</h2>
            <p className="guestcheckin-invite-subtitle">{c.inviteSubtitle}</p>
            <button type="button" className="guestcheckin-share" onClick={handleShare}>
              {linkCopied ? <Check size={16} strokeWidth={1.75} /> : <Share2 size={16} strokeWidth={1.75} />}
              {linkCopied ? c.linkCopied : c.shareLink}
            </button>
          </div>
          {savedGuests.length > 0 && (
            <div className="guestcheckin-saved-list">
              <h2 className="card-group-title guestcheckin-guests-title">{c.alreadyRegistered}</h2>
              {status !== "saved" && (
                <p className="guestcheckin-shared-banner">{c.sharedBanner(savedGuests.length)}</p>
              )}
              {savedGuests.map((g, i) => (
                <div className="guestcheckin-saved-row" key={i}>
                  <span>{g.firstName} {g.lastName} — {new Date(g.birthDate).toLocaleDateString(lang)}</span>
                  <button
                    type="button"
                    className="guestcheckin-remove"
                    onClick={() => removeSavedGuest(i)}
                    disabled={removingIndex !== null}
                  >
                    {removingIndex === i ? (
                      <Loader2 size={14} strokeWidth={1.75} className="guestcheckin-spin" />
                    ) : (
                      <Trash2 size={14} strokeWidth={1.75} />
                    )}
                    {c.removeGuest}
                  </button>
                </div>
              ))}
            </div>
          )}
        </aside>
      )}
      </div>
    </div>
  );
}

export default GuestCheckin;
