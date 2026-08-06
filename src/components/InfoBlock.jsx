import infoIcons from "../infoIcons";
import "./InfoBlock.css";

function InfoBlock({ icon, label, text, important, mono }) {
  const Icon = infoIcons[icon];

  return (
    <div className={`info-block ${important ? "info-block-important" : ""}`}>
      {label && (
        <h3 className="info-block-label">
          {Icon && <Icon className="info-block-icon" size={18} strokeWidth={1.75} />}
          {label}
        </h3>
      )}
      {mono ? (
        <code className="info-block-code">{text}</code>
      ) : (
        // Il testo può contenere link/grassetto inline (es. <a>, <strong>)
        // definiti direttamente nelle traduzioni: contenuto fidato, non input utente.
        <p className="info-block-text" dangerouslySetInnerHTML={{ __html: text }} />
      )}
    </div>
  );
}

export default InfoBlock;
