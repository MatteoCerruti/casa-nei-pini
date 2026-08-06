import { Link, Outlet } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "./ThemeToggle";
import "./Layout.css";

function Layout() {
  const { t } = useLanguage();

  return (
    <>
      <header className="site-bar">
        <div className="site-bar-inner">
          <Link to="/" className="site-bar-name">{t.header.title}</Link>
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
