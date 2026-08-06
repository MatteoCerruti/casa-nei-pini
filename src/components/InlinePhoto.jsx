import { useState } from "react";
import Lightbox from "./Lightbox";
import "./InlinePhoto.css";

// Singola foto cliccabile (apre il lightbox), da affiancare a un InfoBlock
// senza il titolo/griglia di PhotoGrid.
function InlinePhoto({ src, alt, className = "" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={`inline-photo ${className}`} onClick={() => setOpen(true)} aria-label={alt}>
        <img src={src} alt={alt} />
      </button>
      {open && (
        <Lightbox photos={[src]} index={0} onClose={() => setOpen(false)} onNavigate={() => {}} />
      )}
    </>
  );
}

export default InlinePhoto;
