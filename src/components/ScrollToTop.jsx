import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router non resetta lo scroll tra una pagina e l'altra: senza questo,
// una nuova pagina si apre alla stessa posizione di scroll di quella
// precedente invece di partire dall'alto.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
