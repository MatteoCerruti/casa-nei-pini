import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import logo from "../properties/branding";
import "./Layout.css";

function Layout() {
  const { t } = useLanguage();

  // Il <title> statico in public/index.html è condiviso da tutte le
  // proprietà (public/ non passa da REACT_APP_PROPERTY_ID): lo aggiorniamo
  // qui a runtime col nome tradotto della proprietà attiva.
  useEffect(() => {
    document.title = t.header.title;
  }, [t]);

  return (
    <>
      <header className="site-bar">
        <div className="site-bar-inner">
          <Link to="/" className="site-bar-name">
            <img src={logo} alt="" className="site-bar-logo" />
            {t.header.title}
          </Link>
          <div className="site-bar-actions">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Layout;
