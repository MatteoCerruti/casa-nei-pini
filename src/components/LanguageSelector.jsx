import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import "./LanguageSelector.css";

function LanguageSelector() {
  const { lang, setLang, langs, flags, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const pick = (code) => {
    setLang(code);
    setOpen(false);
  };

  return (
    <>
      {/* Desktop: riga di bandierine, tutte visibili */}
      <div className="lang-selector lang-selector-inline">
        {langs.map((code) => (
          <button
            key={code}
            className={`lang-flag ${lang === code ? "active" : ""}`}
            onClick={() => setLang(code)}
            aria-label={code}
            title={code === lang ? t.langName : code}
          >
            {flags[code]}
          </button>
        ))}
      </div>

      {/* Mobile: bottone + menu a tendina, stile Airbnb */}
      <div className="lang-dropdown" ref={dropdownRef}>
        <button
          type="button"
          className="lang-dropdown-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span>{flags[lang]}</span>
          <ChevronDown size={16} strokeWidth={1.75} />
        </button>

        {open && (
          <ul className="lang-dropdown-menu" role="listbox">
            {langs.map((code) => (
              <li key={code}>
                <button
                  type="button"
                  className={`lang-dropdown-item ${lang === code ? "active" : ""}`}
                  onClick={() => pick(code)}
                  role="option"
                  aria-selected={lang === code}
                >
                  <span className="lang-dropdown-flag">{flags[code]}</span>
                  <span>{code.toUpperCase()}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default LanguageSelector;
