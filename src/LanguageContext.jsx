import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./properties";

const LanguageContext = createContext(null);

const LANGS = ["it", "en", "fr", "es", "de"];
const FLAGS = { it: "🇮🇹", en: "🇬🇧", fr: "🇫🇷", es: "🇪🇸", de: "🇩🇪" };

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("lang");
    return LANGS.includes(saved) ? saved : "it";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, langs: LANGS, flags: FLAGS }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
