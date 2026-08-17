import it from "./it";
import en from "./en";
import fr from "./fr";
import es from "./es";
import de from "./de";
import legalTranslations from "../../../legalTranslations";

const raw = { it, en, fr, es, de };

// La pagina Privacy ha lo stesso contenuto per ogni proprietà (cambiano solo
// nome/indirizzo/email del titolare, sostituiti a runtime): tenuto in un
// unico file condiviso invece che duplicato in ogni traduzione.
const translations = Object.fromEntries(
  Object.entries(raw).map(([lang, t]) => [
    lang,
    { ...t, pages: { ...t.pages, privacy: legalTranslations[lang] } },
  ])
);

export default translations;
