import { useEffect, useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import SectionShell from "../components/SectionShell";
import "./Availability.css";

const MONTHS_AHEAD = 6;

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

function Availability() {
  const { t, lang } = useLanguage();
  const p = t.pages.availability;

  const [blocked, setBlocked] = useState(null);
  const [error, setError] = useState(false);

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
        if (!cancelled) setError(true);
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

  return (
    <SectionShell icon={CalendarDays} sectionKey="availability">
      <div className="availability-legend">
        <span className="availability-legend-item">
          <span className="availability-dot availability-dot-free" />
          {p.legendAvailable}
        </span>
        <span className="availability-legend-item">
          <span className="availability-dot availability-dot-booked" />
          {p.legendBooked}
        </span>
      </div>

      {error && <p className="availability-status availability-status-error">{p.error}</p>}
      {!error && blocked === null && <p className="availability-status">{p.loading}</p>}

      {blocked !== null && (
        <div className="availability-months">
          {months.map(({ year, month }) => (
            <div className="availability-month" key={`${year}-${month}`}>
              <h2 className="availability-month-title">{monthFormatter.format(new Date(year, month, 1))}</h2>
              <div className="availability-weekdays">
                {weekdayLabels.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
              <div className="availability-grid">
                {buildMonth(year, month).map((date, i) =>
                  date === null ? (
                    <span key={i} className="availability-cell availability-cell-empty" />
                  ) : (
                    <span
                      key={i}
                      className={[
                        "availability-cell",
                        isBlocked(date) ? "availability-cell-booked" : "availability-cell-free",
                        toIsoDate(date) === toIsoDate(today) ? "availability-cell-today" : "",
                      ].join(" ").trim()}
                    >
                      {date.getDate()}
                    </span>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionShell>
  );
}

export default Availability;
