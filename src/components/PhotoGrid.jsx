import { useState } from "react";
import { Camera } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import Lightbox from "./Lightbox";
import "./PhotoGrid.css";

/*
 * COME AGGIUNGERE LE FOTO REALI
 * ------------------------------
 * 1. Copia il file immagine dentro src/assets/photos/<nome-sezione>/
 *    (es. src/assets/photos/checkin/foto1.jpg)
 * 2. In cima al file della pagina che usa questo componente (es. src/pages/CheckIn.jsx)
 *    aggiungi l'import dell'immagine:
 *      import foto1 from "../assets/photos/checkin/foto1.jpg";
 * 3. Passa le immagini importate alla prop `photos` di <PhotoGrid />:
 *      <PhotoGrid sectionKey="checkin" photos={[foto1]} />
 *    Ogni immagine nell'array sostituisce automaticamente un placeholder
 *    con la foto reale. Gli slot restanti restano vuoti finché non aggiungi altre foto.
 */
function PhotoGrid({ sectionKey, photos = [], count = 4, title }) {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);
  const slotsCount = Math.max(count, photos.length);
  const slots = Array.from({ length: slotsCount });
  // Con solo 2 foto niente slot "lead" più alto: le due foto restano appaiate
  // alla stessa altezza (raddoppiata) invece che una grande e una piccola.
  const isPair = photos.length === 2;
  const hasLead = !isPair;

  return (
    <section className="photo-section">
      <h2 className="photo-section-title">{title || t.common.photosTitle}</h2>
      <div className={`photo-grid ${isPair ? "photo-grid-pair" : ""}`}>
        {slots.map((_, i) => {
          const photo = photos[i];
          const spanClass = hasLead && i === 0 ? "photo-slot-lead" : "";
          if (photo) {
            return (
              <button
                type="button"
                className={`photo-slot photo-filled ${spanClass}`}
                key={i}
                onClick={() => setOpenIndex(i)}
                aria-label={`Apri foto ${i + 1}`}
              >
                <img src={photo} alt={`${sectionKey} ${i + 1}`} />
              </button>
            );
          }
          return (
            <div className={`photo-slot photo-placeholder ${spanClass}`} key={i}>
              <Camera size={24} strokeWidth={1.5} />
              <span>{t.common.addPhoto}</span>
            </div>
          );
        })}
      </div>

      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </section>
  );
}

export default PhotoGrid;
