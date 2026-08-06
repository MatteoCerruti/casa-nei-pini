import platformMeta from "../platformMeta";
import "./PlatformCard.css";

// Card piattaforma (stile home): logo + nome, tutta la card è cliccabile.
function PlatformCard({ id, url }) {
  const meta = platformMeta[id];
  const Icon = meta.icon;

  return (
    <a className="platform-card" href={url} target="_blank" rel="noopener noreferrer">
      <span className="platform-card-logo" style={{ background: meta.color }}>
        <Icon size={22} strokeWidth={1.75} color="#FFFFFF" />
      </span>
      <span className="platform-card-name">{meta.label}</span>
    </a>
  );
}

export default PlatformCard;
