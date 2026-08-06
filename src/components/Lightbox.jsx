import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "./Lightbox.css";

// Carosello fullscreen stile Airbnb: freccia prev/next, contatore, chiudi con
// X, click sul fondo, tasto Esc; frecce tastiera per navigare.
function Lightbox({ photos, index, onClose, onNavigate }) {
  const goPrev = useCallback(
    (e) => {
      e?.stopPropagation();
      onNavigate((index - 1 + photos.length) % photos.length);
    },
    [index, photos.length, onNavigate]
  );

  const goNext = useCallback(
    (e) => {
      e?.stopPropagation();
      onNavigate((index + 1) % photos.length);
    },
    [index, photos.length, onNavigate]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, goPrev, goNext]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Chiudi">
        <X size={22} strokeWidth={2} />
      </button>

      {photos.length > 1 && (
        <button className="lightbox-nav lightbox-prev" onClick={goPrev} aria-label="Foto precedente">
          <ChevronLeft size={24} strokeWidth={2} />
        </button>
      )}

      <img
        className="lightbox-image"
        src={photos[index]}
        alt={`Foto ${index + 1} di ${photos.length}`}
        onClick={(e) => e.stopPropagation()}
      />

      {photos.length > 1 && (
        <button className="lightbox-nav lightbox-next" onClick={goNext} aria-label="Foto successiva">
          <ChevronRight size={24} strokeWidth={2} />
        </button>
      )}

      {photos.length > 1 && (
        <span className="lightbox-counter">{index + 1} / {photos.length}</span>
      )}
    </div>
  );
}

export default Lightbox;
