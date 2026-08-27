import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import { it, enGB, fr, es, de } from "react-day-picker/locale";
import { LayoutDashboard, RotateCcw, Trash2, Copy, Check } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import ConfirmDialog from "../components/ConfirmDialog";
import "react-day-picker/style.css";
import "./Admin.css";

const LOCALE_MAP = { it: "it-IT", en: "en-GB", fr: "fr-FR", es: "es-ES", de: "de-DE" };
const RDP_LOCALES = { it, en: enGB, fr, es, de };

const COPY = {
  it: {
    labelMinors: "Minori <12",
    labelArrival: "Arrivo",
    labelDeparture: "Partenza",
    labelNotes: "Note",
    labelFirstName: "Nome",
    labelLastName: "Cognome",
    labelGender: "Genere",
    labelBirthDate: "Nascita",
    labelBirthPlace: "Luogo nascita",
    labelResidencePlace: "Residenza",
    labelNationality: "Cittadinanza",
    labelDocType: "Documento",
    labelDocNumber: "N. documento",
    title: "Moduli completati",
    loading: "Caricamento…",
    empty: "Nessun check-in ricevuto per ora.",
    error: "Impossibile caricare i check-in.",
    statusDraft: "In compilazione",
    statusComplete: "Completata",
    reopen: "Riapri",
    reopening: "Riapertura…",
    delete: "Elimina",
    deleting: "Eliminazione…",
    deleteConfirmTitle: "Eliminare questo modulo?",
    deleteConfirmMessage: "L'operazione non è reversibile: tutti i dati degli ospiti di questa prenotazione verranno cancellati.",
    cancel: "Annulla",
  },
  en: {
    labelMinors: "Minors <12",
    labelArrival: "Arrival",
    labelDeparture: "Departure",
    labelNotes: "Notes",
    labelFirstName: "First name",
    labelLastName: "Last name",
    labelGender: "Gender",
    labelBirthDate: "Birth date",
    labelBirthPlace: "Birth place",
    labelResidencePlace: "Residence",
    labelNationality: "Nationality",
    labelDocType: "Document",
    labelDocNumber: "Doc. number",
    title: "Completed forms",
    loading: "Loading…",
    empty: "No check-ins received yet.",
    error: "Could not load check-ins.",
    statusDraft: "In progress",
    statusComplete: "Complete",
    reopen: "Reopen",
    reopening: "Reopening…",
    delete: "Delete",
    deleting: "Deleting…",
    deleteConfirmTitle: "Delete this form?",
    deleteConfirmMessage: "This cannot be undone: all guest data for this booking will be removed.",
    cancel: "Cancel",
  },
  fr: {
    labelMinors: "Mineurs <12",
    labelArrival: "Arrivée",
    labelDeparture: "Départ",
    labelNotes: "Notes",
    labelFirstName: "Prénom",
    labelLastName: "Nom",
    labelGender: "Genre",
    labelBirthDate: "Naissance",
    labelBirthPlace: "Lieu de naissance",
    labelResidencePlace: "Résidence",
    labelNationality: "Nationalité",
    labelDocType: "Document",
    labelDocNumber: "N° document",
    title: "Formulaires complétés",
    loading: "Chargement…",
    empty: "Aucun enregistrement reçu pour le moment.",
    error: "Impossible de charger les enregistrements.",
    statusDraft: "En cours",
    statusComplete: "Terminée",
    reopen: "Rouvrir",
    reopening: "Réouverture…",
    delete: "Supprimer",
    deleting: "Suppression…",
    deleteConfirmTitle: "Supprimer ce formulaire ?",
    deleteConfirmMessage: "Cette action est irréversible : toutes les données des hôtes de cette réservation seront supprimées.",
    cancel: "Annuler",
  },
  es: {
    labelMinors: "Menores <12",
    labelArrival: "Llegada",
    labelDeparture: "Salida",
    labelNotes: "Notas",
    labelFirstName: "Nombre",
    labelLastName: "Apellido",
    labelGender: "Género",
    labelBirthDate: "Nacimiento",
    labelBirthPlace: "Lugar de nacimiento",
    labelResidencePlace: "Residencia",
    labelNationality: "Nacionalidad",
    labelDocType: "Documento",
    labelDocNumber: "N.º documento",
    title: "Formularios completados",
    loading: "Cargando…",
    empty: "Aún no se ha recibido ningún registro.",
    error: "No se pudieron cargar los registros.",
    statusDraft: "En curso",
    statusComplete: "Completada",
    reopen: "Reabrir",
    reopening: "Reabriendo…",
    delete: "Eliminar",
    deleting: "Eliminando…",
    deleteConfirmTitle: "¿Eliminar este formulario?",
    deleteConfirmMessage: "Esta acción no se puede deshacer: se eliminarán todos los datos de los huéspedes de esta reserva.",
    cancel: "Cancelar",
  },
  de: {
    labelMinors: "Minderj. <12",
    labelArrival: "Ankunft",
    labelDeparture: "Abreise",
    labelNotes: "Notizen",
    labelFirstName: "Vorname",
    labelLastName: "Nachname",
    labelGender: "Geschlecht",
    labelBirthDate: "Geburt",
    labelBirthPlace: "Geburtsort",
    labelResidencePlace: "Wohnort",
    labelNationality: "Staatsangehörigkeit",
    labelDocType: "Dokument",
    labelDocNumber: "Dok.-Nr.",
    title: "Abgeschlossene Formulare",
    loading: "Wird geladen…",
    empty: "Bisher keine Check-ins erhalten.",
    error: "Check-ins konnten nicht geladen werden.",
    statusDraft: "In Bearbeitung",
    statusComplete: "Abgeschlossen",
    reopen: "Erneut öffnen",
    reopening: "Wird geöffnet…",
    delete: "Löschen",
    deleting: "Wird gelöscht…",
    deleteConfirmTitle: "Dieses Formular löschen?",
    deleteConfirmMessage: "Das kann nicht rückgängig gemacht werden: alle Gästedaten dieser Buchung werden entfernt.",
    cancel: "Abbrechen",
  },
};

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);
  if (value === null || value === undefined || value === "") return null;

  function handleClick() {
    navigator.clipboard
      .writeText(String(value))
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      })
      .catch(() => {});
  }

  return (
    <span className="admin-field">
      {label && <span className="admin-field-label">{label}</span>}
      <button type="button" className={copied ? "admin-field-badge copied" : "admin-field-badge"} onClick={handleClick} title="Copia">
        {copied ? <Check size={11} strokeWidth={2} /> : <Copy size={11} strokeWidth={2} />}
        {value}
      </button>
    </span>
  );
}

function dateKey(dateStr) {
  return dateStr?.slice(0, 10);
}

function isBeforeArrival(arrivalDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(arrivalDate) >= today;
}

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

function countMinors(guests, arrivalDate) {
  return guests.filter((g) => g.birthDate && ageAt(g.birthDate, arrivalDate) < 12).length;
}

function Admin() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { lang } = useLanguage();
  const c = COPY[lang] ?? COPY.en;
  const locale = LOCALE_MAP[lang] ?? "en-GB";
  const rdpLocale = RDP_LOCALES[lang] ?? RDP_LOCALES.en;
  const [checkins, setCheckins] = useState(null);
  const [error, setError] = useState(null);
  const [reopeningId, setReopeningId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [highlightedId, setHighlightedId] = useState(null);

  async function loadCheckins({ focusNext = false } = {}) {
    try {
      const token = await getToken();
      const res = await fetch("/api/checkins", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("request failed");
      const data = await res.json();
      setCheckins(data.checkins);

      if (focusNext) {
        const today = dateKey(new Date().toISOString());
        const next = data.checkins.find((ci) => dateKey(ci.arrival_date) >= today);
        if (next) {
          setTimeout(() => goToCard(next.id), 400);
        }
      }
    } catch {
      setError(c.error);
    }
  }

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    loadCheckins({ focusNext: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn]);

  async function reopenBooking(id, bookingRef) {
    setReopeningId(id);
    try {
      const token = await getToken();
      await fetch("/api/booking", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ bookingRef, status: "draft" }),
      });
      await loadCheckins();
    } catch {
      // best-effort: l'host può riprovare
    } finally {
      setReopeningId(null);
    }
  }

  async function deleteBooking(id) {
    setDeletingId(id);
    try {
      const token = await getToken();
      await fetch("/api/checkins", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id }),
      });
      await loadCheckins();
    } catch {
      // best-effort: l'host può riprovare
    } finally {
      setDeletingId(null);
    }
  }

  function goToCard(id) {
    const el = document.getElementById(`booking-${id}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setHighlightedId(id);
    setTimeout(() => setHighlightedId(null), 1600);
  }

  function handleDayClick(date) {
    if (!checkins) return;
    const clickedKey = dateKey(date.toISOString());
    const match = checkins.find((ci) => dateKey(ci.arrival_date) === clickedKey);
    if (match) goToCard(match.id);
  }

  if (isLoaded && !isSignedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isLoaded) {
    return null;
  }

  const cutoffDate = new Date();
  cutoffDate.setHours(0, 0, 0, 0);
  cutoffDate.setDate(cutoffDate.getDate() - 30);

  // Una data → grigio se c'è almeno una prenotazione in compilazione,
  // altrimenti primario se sono tutte completate.
  const draftDates = [];
  const completeDates = [];
  if (checkins) {
    const byDate = {};
    checkins.forEach((ci) => {
      const key = dateKey(ci.arrival_date);
      if (!key) return;
      if (!byDate[key]) byDate[key] = { date: new Date(ci.arrival_date), hasDraft: false };
      if (ci.status !== "complete") byDate[key].hasDraft = true;
    });
    Object.values(byDate).forEach(({ date, hasDraft }) => {
      (hasDraft ? draftDates : completeDates).push(date);
    });
  }

  return (
    <div className="page section-page section-page-admin">
      {pendingDeleteId !== null && (
        <ConfirmDialog
          title={c.deleteConfirmTitle}
          message={c.deleteConfirmMessage}
          confirmLabel={c.delete}
          cancelLabel={c.cancel}
          onCancel={() => setPendingDeleteId(null)}
          onConfirm={() => {
            const id = pendingDeleteId;
            setPendingDeleteId(null);
            deleteBooking(id);
          }}
        />
      )}

      <div className="section-title-row">
        <LayoutDashboard className="section-title-icon" size={24} strokeWidth={1.75} />
        <h1 className="section-title">{c.title}</h1>
      </div>

      <hr className="section-title-divider" />

      <div className="section-content">
        {error && <p className="guestcheckin-error">{error}</p>}
        {!error && checkins === null && <p>{c.loading}</p>}
        {!error && checkins?.length === 0 && <p>{c.empty}</p>}

        {checkins && checkins.length > 0 && (
          <div className="admin-layout">
            <div className="admin-calendar-wrap">
              <DayPicker
                locale={rdpLocale}
                defaultMonth={new Date()}
                startMonth={new Date(cutoffDate.getFullYear(), cutoffDate.getMonth(), 1)}
                hidden={{ before: cutoffDate }}
                modifiers={{ draft: draftDates, complete: completeDates }}
                onDayClick={handleDayClick}
                components={{
                  DayButton: (props) => {
                    const { day, modifiers, className, ...rest } = props;
                    return (
                      <button type="button" className={className} {...rest}>
                        {day.date.getDate()}
                        {modifiers.draft && <span className="admin-cal-dot grey" />}
                        {modifiers.complete && !modifiers.draft && <span className="admin-cal-dot primary" />}
                      </button>
                    );
                  },
                }}
              />
            </div>

            <div className="admin-list">
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
                {checkins.map((ci) => {
                  const modifiable = isBeforeArrival(ci.arrival_date);
                  return (
                    <div
                      key={ci.id}
                      id={`booking-${ci.id}`}
                      className={
                        highlightedId === ci.id ? "guestcheckin-guest-card admin-card admin-card-highlight" : "guestcheckin-guest-card admin-card"
                      }
                    >
                      <div className="guestcheckin-guest-header admin-dates-row">
                        <span className="admin-dates-pair">
                          <CopyField label={c.labelArrival} value={new Date(ci.arrival_date).toLocaleDateString(locale)} />
                          <CopyField label={c.labelDeparture} value={new Date(ci.departure_date).toLocaleDateString(locale)} />
                          <span className="admin-badge admin-badge-ref">{c.labelMinors}: {countMinors(ci.guests, ci.arrival_date)}</span>
                        </span>
                        <span>{new Date(ci.created_at).toLocaleString(locale)}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
                        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                          {ci.booking_ref && (
                            <span className="admin-badge admin-badge-ref">
                              {ci.booking_ref}
                            </span>
                          )}
                          <span className={ci.status === "complete" ? "admin-badge admin-badge-complete" : "admin-badge admin-badge-draft"}>
                            {ci.status === "complete" ? c.statusComplete : c.statusDraft}
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                          {modifiable && ci.status === "complete" && ci.booking_ref && (
                            <button
                              type="button"
                              className="guestcheckin-remove"
                              onClick={() => reopenBooking(ci.id, ci.booking_ref)}
                              disabled={reopeningId !== null}
                            >
                              <RotateCcw size={14} strokeWidth={1.75} />
                              {reopeningId === ci.id ? c.reopening : c.reopen}
                            </button>
                          )}
                          <button
                            type="button"
                            className="guestcheckin-remove"
                            onClick={() => setPendingDeleteId(ci.id)}
                            disabled={deletingId !== null}
                          >
                            <Trash2 size={14} strokeWidth={1.75} />
                            {deletingId === ci.id ? c.deleting : c.delete}
                          </button>
                        </div>
                      </div>
                      {ci.notes && <p style={{ margin: 0 }}><CopyField label={c.labelNotes} value={ci.notes} /></p>}
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "4px" }}>
                        {ci.guests.map((g, i) => (
                          <div key={i} style={{ borderTop: "1px solid var(--color-border)", paddingTop: "8px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 10px" }}>
                            <span className="admin-guest-index">{i + 1}</span>
                            {g.gender && <CopyField label={c.labelGender} value={g.gender} />}
                            <CopyField label={c.labelLastName} value={g.lastName} />
                            <CopyField label={c.labelFirstName} value={g.firstName} />
                            <CopyField label={c.labelBirthDate} value={g.birthDate && new Date(g.birthDate).toLocaleDateString(locale)} />
                            <CopyField label={c.labelNationality} value={g.nationality} />
                            <CopyField label={c.labelBirthPlace} value={g.birthPlace} />
                            {g.residencePlace && <CopyField label={c.labelResidencePlace} value={g.residencePlace} />}
                            {g.documentType && <CopyField label={c.labelDocType} value={g.documentType} />}
                            {g.documentNumber && <CopyField label={c.labelDocNumber} value={g.documentNumber} />}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
