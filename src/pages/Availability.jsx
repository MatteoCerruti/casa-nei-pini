import { useEffect, useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Mail, MessageCircle, X } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import SectionShell from "../components/SectionShell";
import "./Availability.css";

const MONTHS_AHEAD = 6;
const HOST_EMAIL = "mcerruti00@gmail.com";
const HOST_WHATSAPP = "393481138760";
const APARTMENT_NAME = "Casa nei Pini";

// Dati finti usati solo in sviluppo locale, dove /api/availability non è servito da react-scripts.
function mockBlocked() {
  const iso = (d) => toIsoDate(d);
  const today = new Date();
  const add = (days) => {
    const d = new Date(today);
    d.setDate(d.getDate() + days);
    return d;
  };
  return [
    { start: iso(add(3)), end: iso(add(7)) },
    { start: iso(add(15)), end: iso(add(16)) },
    { start: iso(add(30)), end: iso(add(40)) },
  ];
}

function toIsoDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function buildMonth(year, month) {
  const first = new Date(year, month, 1);
  // Lunedì = 0 ... Domenica = 6
  const leadingBlanks = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = Array(leadingBlanks).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(year, month, day));
  }
  return cells;
}

function fillTemplate(str, values) {
  return str.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

function Availability() {
  const { t, lang } = useLanguage();
  const p = t.pages.availability;

  const [blocked, setBlocked] = useState(null);
  const [error, setError] = useState(false);
  const [selection, setSelection] = useState(null); // { start: Date, end: Date | null }
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!dialogOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [dialogOpen]);
  const [guests, setGuests] = useState(2);
  const [monthIndex, setMonthIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/availability")
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setBlocked(data.blocked);
      })
      .catch(() => {
        if (cancelled) return;
        if (process.env.NODE_ENV === "development") {
          setBlocked(mockBlocked());
        } else {
          setError(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const isBlocked = useMemo(() => {
    if (!blocked) return () => false;
    return (date) => {
      if (date < today) return true;
      const iso = toIsoDate(date);
      return blocked.some((range) => iso >= range.start && iso < range.end);
    };
  }, [blocked, today]);

  // Verifica che nessun giorno tra due date selezionate sia occupato,
  // altrimenti un range "libero-occupato-libero" risulterebbe selezionabile per errore.
  const hasBlockedBetween = (start, end) => {
    const [from, to] = start <= end ? [start, end] : [end, start];
    const cursor = new Date(from);
    while (cursor <= to) {
      if (isBlocked(cursor)) return true;
      cursor.setDate(cursor.getDate() + 1);
    }
    return false;
  };

  const handleDayClick = (date) => {
    if (isBlocked(date)) return;

    if (!selection || selection.end || toIsoDate(date) === toIsoDate(selection.start)) {
      setSelection({ start: date, end: null });
      return;
    }

    if (hasBlockedBetween(selection.start, date)) {
      setSelection({ start: date, end: null });
      return;
    }

    const [start, end] = selection.start <= date ? [selection.start, date] : [date, selection.start];
    setSelection({ start, end });
  };

  const isSelected = (date) => {
    if (!selection) return false;
    const iso = toIsoDate(date);
    if (!selection.end) return iso === toIsoDate(selection.start);
    return iso >= toIsoDate(selection.start) && iso <= toIsoDate(selection.end);
  };

  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(lang, { day: "numeric", month: "long", year: "numeric" }),
    [lang]
  );

  const selectionLabel = useMemo(() => {
    if (!selection) return "";
    if (!selection.end) return `${p.selectionSingle}: ${dateFormatter.format(selection.start)}`;
    return fillTemplate(p.selectionRange, {
      start: dateFormatter.format(selection.start),
      end: dateFormatter.format(selection.end),
    });
  }, [selection, dateFormatter, p]);

  const quoteMessage = useMemo(() => {
    if (!selection) return "";
    const datesPart = !selection.end
      ? fillTemplate(p.quoteBodySingle, { date: dateFormatter.format(selection.start) })
      : fillTemplate(p.quoteBodyRange, {
          start: dateFormatter.format(selection.start),
          end: dateFormatter.format(selection.end),
        });
    const detailsPart = fillTemplate(p.quoteBodyDetails, {
      apartment: APARTMENT_NAME,
      guests: String(guests),
    });
    return `${datesPart} ${detailsPart}`;
  }, [selection, dateFormatter, guests, p]);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(p.quoteSubject);
    const body = encodeURIComponent(quoteMessage);
    return `mailto:${HOST_EMAIL}?subject=${subject}&body=${body}`;
  }, [quoteMessage, p]);

  const whatsappHref = useMemo(() => {
    const text = encodeURIComponent(quoteMessage);
    return `https://wa.me/${HOST_WHATSAPP}?text=${text}`;
  }, [quoteMessage]);

  const months = useMemo(() => {
    const list = [];
    const base = new Date(today.getFullYear(), today.getMonth(), 1);
    for (let i = 0; i < MONTHS_AHEAD; i++) {
      const d = new Date(base.getFullYear(), base.getMonth() + i, 1);
      list.push({ year: d.getFullYear(), month: d.getMonth() });
    }
    return list;
  }, [today]);

  const monthFormatter = useMemo(
    () => new Intl.DateTimeFormat(lang, { month: "long", year: "numeric" }),
    [lang]
  );
  const weekdayLabels = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(lang, { weekday: "short" });
    // 5 gennaio 2026 è un lunedì: base comoda per generare Lun...Dom.
    return Array.from({ length: 7 }, (_, i) => formatter.format(new Date(2026, 0, 5 + i)));
  }, [lang]);

  const renderDayGrid = (year, month) =>
    buildMonth(year, month).map((date, i) =>
      date === null ? (
        <span key={i} className="availability-cell availability-cell-empty" />
      ) : (
        <button
          type="button"
          key={i}
          disabled={isBlocked(date)}
          onClick={() => handleDayClick(date)}
          className={[
            "availability-cell",
            isBlocked(date) ? "availability-cell-booked" : "availability-cell-free",
            toIsoDate(date) === toIsoDate(today) ? "availability-cell-today" : "",
            isSelected(date) ? "availability-cell-selected" : "",
          ].join(" ").trim()}
        >
          {date.getDate()}
        </button>
      )
    );

  return (
    <SectionShell icon={CalendarDays} sectionKey="availability">
      {error && <p className="availability-status availability-status-error">{p.error}</p>}
      {!error && blocked === null && <p className="availability-status">{p.loading}</p>}

      {blocked !== null && (
        <>
          <p className="availability-hint">{p.hint}</p>

          <div className="availability-months availability-months-desktop">
            {months.map(({ year, month }) => (
              <div className="availability-month" key={`${year}-${month}`}>
                <h2 className="availability-month-title">{monthFormatter.format(new Date(year, month, 1))}</h2>
                <div className="availability-weekdays">
                  {weekdayLabels.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
                <div className="availability-grid">{renderDayGrid(year, month)}</div>
              </div>
            ))}
          </div>

          <div className="availability-carousel">
            <div className="availability-carousel-header">
              <button
                type="button"
                className="availability-carousel-nav"
                onClick={() => setMonthIndex((i) => Math.max(0, i - 1))}
                disabled={monthIndex === 0}
                aria-label="-"
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="availability-month-title">
                {monthFormatter.format(new Date(months[monthIndex].year, months[monthIndex].month, 1))}
              </h2>
              <button
                type="button"
                className="availability-carousel-nav"
                onClick={() => setMonthIndex((i) => Math.min(months.length - 1, i + 1))}
                disabled={monthIndex === months.length - 1}
                aria-label="+"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="availability-month">
              <div className="availability-weekdays">
                {weekdayLabels.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
              <div className="availability-grid">
                {renderDayGrid(months[monthIndex].year, months[monthIndex].month)}
              </div>
            </div>
          </div>
        </>
      )}

      {selection && (
        <div className="availability-selection-bar">
          <span className="availability-selection-label">{selectionLabel}</span>
          <div className="availability-selection-actions">
            <button type="button" className="availability-btn-ghost" onClick={() => setSelection(null)}>
              {p.clearSelection}
            </button>
            <button type="button" className="availability-btn-primary" onClick={() => setDialogOpen(true)}>
              {p.requestQuote}
            </button>
          </div>
        </div>
      )}

      {dialogOpen && (
        <div className="availability-dialog-overlay" onClick={() => setDialogOpen(false)}>
          <div className="availability-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="availability-dialog-header">
              <button
                type="button"
                className="availability-dialog-close"
                onClick={() => setDialogOpen(false)}
                aria-label={p.close}
              >
                <X size={18} />
              </button>
              <h3 className="availability-dialog-title">{p.dialogTitle}</h3>
            </div>

            <div className="availability-dialog-body">
              <p className="availability-dialog-selection">{selectionLabel}</p>

              <div className="availability-dialog-row">
                <label className="availability-guests-label" htmlFor="availability-guests">
                  {p.guestsLabel}
                </label>
                <div className="availability-guests-input">
                  <button
                    type="button"
                    onClick={() => setGuests((n) => Math.max(1, n - 1))}
                    aria-label="-"
                  >
                    −
                  </button>
                  <input
                    id="availability-guests"
                    type="number"
                    min={1}
                    max={8}
                    value={guests}
                    onChange={(e) => setGuests(Math.min(8, Math.max(1, Number(e.target.value) || 1)))}
                  />
                  <button
                    type="button"
                    onClick={() => setGuests((n) => Math.min(8, n + 1))}
                    aria-label="+"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="availability-dialog-footer">
              <p className="availability-dialog-subtitle">{p.dialogSubtitle}</p>
              <div className="availability-dialog-actions">
                <a className="availability-btn-secondary" href={mailtoHref} onClick={() => setDialogOpen(false)}>
                  <Mail size={18} />
                  {p.viaEmail}
                </a>
                <a
                  className="availability-btn-primary"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setDialogOpen(false)}
                >
                  <MessageCircle size={18} />
                  {p.viaWhatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </SectionShell>
  );
}

export default Availability;
