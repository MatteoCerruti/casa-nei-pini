import PhotoGrid from "./PhotoGrid";
import "./RoomSection.css";

// Sezione per singola stanza: titolo + galleria foto della stanza.
function RoomSection({ id, title, photos }) {
  return (
    <div className="room-section">
      <PhotoGrid sectionKey={id} photos={photos} count={photos.length} title={title} />
    </div>
  );
}

export default RoomSection;
