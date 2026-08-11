import { ClerkProvider } from "@clerk/clerk-react";
import { itIT, enUS, frFR, esES, deDE } from "@clerk/localizations";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

const clerkPublishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  throw new Error("Missing REACT_APP_CLERK_PUBLISHABLE_KEY environment variable");
}

const CLERK_LOCALES = {
  it: itIT,
  en: enUS,
  fr: frFR,
  es: esES,
  de: deDE,
};

const ADMIN_COPY = {
  it: { title: (name) => `Accedi a ${name}`, subtitle: "Bentornato, host" },
  en: { title: (name) => `Sign in to ${name}`, subtitle: "Welcome back, host" },
  fr: { title: (name) => `Connexion à ${name}`, subtitle: "Bon retour, host" },
  es: { title: (name) => `Accede a ${name}`, subtitle: "Bienvenido de nuevo, host" },
  de: { title: (name) => `Anmelden bei ${name}`, subtitle: "Willkommen zurück, Host" },
};

const clerkAppearance = {
  variables: {
    colorPrimary: "var(--color-accent)",
    colorPrimaryForeground: "var(--color-on-accent)",
    colorBackground: "var(--color-bg)",
    colorText: "var(--color-text)",
    colorTextSecondary: "var(--color-muted)",
    colorInputBackground: "var(--color-surface)",
    colorInputText: "var(--color-text)",
    colorNeutral: "var(--color-text)",
    colorDanger: "var(--color-accent-dark)",
    fontFamily: "var(--font-body)",
    borderRadius: "10px",
  },
  elements: {
    card: {
      boxShadow: "none",
      border: "1px solid var(--color-border)",
    },
    formButtonPrimary: {
      backgroundColor: "var(--color-accent)",
      "&:hover": { backgroundColor: "var(--color-accent-dark)" },
    },
    footerActionLink: {
      color: "var(--color-accent)",
      "&:hover": { color: "var(--color-accent-dark)" },
    },
    // Un solo account admin per proprietà: nessuna auto-registrazione.
    footerAction: { display: "none" },
    // Badge "Protetto da Clerk" — solo estetico, non rimuove la protezione.
    footer: { display: "none" },
    userButtonPopoverFooter: { display: "none" },
    userButtonAvatarBox: { width: "36px", height: "36px" },
  },
};

function ClerkWithLocale({ children }) {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const propertyName = t.header.title;
  const baseLocale = CLERK_LOCALES[lang] ?? itIT;
  const copy = ADMIN_COPY[lang] ?? ADMIN_COPY.it;

  const clerkLocalization = {
    ...baseLocale,
    signIn: {
      ...baseLocale.signIn,
      start: {
        ...baseLocale.signIn.start,
        title: copy.title(propertyName),
        subtitle: copy.subtitle,
      },
    },
  };

  return (
    <ClerkProvider
      key={lang}
      publishableKey={clerkPublishableKey}
      appearance={clerkAppearance}
      localization={clerkLocalization}
      navigate={(to) => navigate(to)}
    >
      {children}
    </ClerkProvider>
  );
}

export default ClerkWithLocale;
