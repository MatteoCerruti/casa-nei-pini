import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { it, enGB, fr, es, de } from "react-day-picker/locale";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import "react-day-picker/style.css";
import "./DateField.css";

const LOCALES = { it, en: enGB, fr, es, de };
const YEARS_PER_PAGE = 10;

function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function fromISODate(value) {
  if (!value) return undefined;
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function decadeStartFor(year) {
  return Math.floor(year / YEARS_PER_PAGE) * YEARS_PER_PAGE;
}

function MonthGrid({ viewDate, locale, onPick, onChangeYear }) {
  const monthNames = Array.from({ length: 12 }, (_, m) =>
    new Date(2026, m, 1).toLocaleDateString(locale.code, { month: "short" })
  );

  return (
    <div className="date-field-grid-panel">
      <div className="date-field-grid-header">
        <button type="button" onClick={() => onChangeYear(-1)}><ChevronLeft size={16} /></button>
        <span>{viewDate.getFullYear()}</span>
        <button type="button" onClick={() => onChangeYear(1)}><ChevronRight size={16} /></button>
      </div>
      <div className="date-field-grid date-field-grid-months">
        {monthNames.map((name, m) => (
          <button
            type="button"
            key={name}
            className={m === viewDate.getMonth() ? "date-field-grid-cell active" : "date-field-grid-cell"}
            onClick={() => onPick(m)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

function YearGrid({ viewDate, onPick, onChangeDecade }) {
  const start = decadeStartFor(viewDate.getFullYear());
  const years = Array.from({ length: YEARS_PER_PAGE }, (_, i) => start + i);

  return (
    <div className="date-field-grid-panel">
      <div className="date-field-grid-header">
        <button type="button" onClick={() => onChangeDecade(-1)}><ChevronLeft size={16} /></button>
        <span>{start} – {start + YEARS_PER_PAGE - 1}</span>
        <button type="button" onClick={() => onChangeDecade(1)}><ChevronRight size={16} /></button>
      </div>
      <div className="date-field-grid date-field-grid-years">
        {years.map((year) => (
          <button
            type="button"
            key={year}
            className={year === viewDate.getFullYear() ? "date-field-grid-cell active" : "date-field-grid-cell"}
            onClick={() => onPick(year)}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}

function formatMasked(date) {
  if (!date) return "";
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

function maskDigits(digits) {
  const d = digits.slice(0, 2);
  const m = digits.slice(2, 4);
  const y = digits.slice(4, 8);
  if (digits.length <= 2) return d;
  if (digits.length <= 4) return `${d}/${m}`;
  return `${d}/${m}/${y}`;
}

function DateField({ value, onChange, lang = "en", ...rest }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("days"); // days | months | years
  const wrapperRef = useRef(null);
  const selected = fromISODate(value);
  const locale = LOCALES[lang] ?? LOCALES.en;
  const [viewDate, setViewDate] = useState(() => selected || new Date());
  const [textValue, setTextValue] = useState(() => formatMasked(selected));

  useEffect(() => {
    setTextValue(formatMasked(fromISODate(value)));
  }, [value]);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setView("days");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  function openPicker() {
    setViewDate(selected || new Date());
    setView("days");
    setOpen((o) => !o);
  }

  function handleTextChange(e) {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 8);
    setTextValue(maskDigits(digits));

    if (digits.length === 8) {
      const day = Number(digits.slice(0, 2));
      const month = Number(digits.slice(2, 4));
      const year = Number(digits.slice(4, 8));
      const date = new Date(year, month - 1, day);
      const isValid =
        month >= 1 && month <= 12 &&
        day >= 1 && day <= 31 &&
        date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
      if (isValid) {
        setViewDate(date);
        onChange(toISODate(date));
        return;
      }
    }
    onChange("");
  }

  return (
    <div className="date-field" ref={wrapperRef}>
      <div className="date-field-trigger">
        <input
          type="text"
          inputMode="numeric"
          placeholder="GG/MM/AAAA"
          className="date-field-input"
          value={textValue}
          onChange={handleTextChange}
        />
        <button type="button" className="date-field-icon-btn" onClick={openPicker} aria-label="Calendario">
          <CalendarDays size={16} strokeWidth={1.75} />
        </button>
      </div>
      {open && (
        <div className="date-field-popover">
          {view === "days" && (
            <DayPicker
              mode="single"
              selected={selected}
              month={viewDate}
              onMonthChange={setViewDate}
              onSelect={(date) => {
                onChange(date ? toISODate(date) : "");
                setOpen(false);
                setView("days");
              }}
              locale={locale}
              components={{
                MonthCaption: ({ calendarMonth }) => (
                  <div className="date-field-caption">
                    <button type="button" className="date-field-caption-btn" onClick={() => setView("months")}>
                      {calendarMonth.date.toLocaleDateString(locale.code, { month: "long" })}
                    </button>
                    <button type="button" className="date-field-caption-btn" onClick={() => setView("years")}>
                      {calendarMonth.date.getFullYear()}
                    </button>
                  </div>
                ),
              }}
              {...rest}
            />
          )}
          {view === "months" && (
            <MonthGrid
              viewDate={viewDate}
              locale={locale}
              onPick={(m) => {
                setViewDate((d) => new Date(d.getFullYear(), m, 1));
                setView("days");
              }}
              onChangeYear={(delta) => setViewDate((d) => new Date(d.getFullYear() + delta, d.getMonth(), 1))}
            />
          )}
          {view === "years" && (
            <YearGrid
              viewDate={viewDate}
              onPick={(year) => {
                setViewDate((d) => new Date(year, d.getMonth(), 1));
                setView("months");
              }}
              onChangeDecade={(delta) => setViewDate((d) => new Date(d.getFullYear() + delta * YEARS_PER_PAGE, d.getMonth(), 1))}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default DateField;
