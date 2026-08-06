import { MapPin as PinIcon, Phone, ExternalLink } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import "./PlaceCard.css";

function PlaceCard({ icon: Icon, name, address, phone, desc, mapsUrl }) {
  const { t } = useLanguage();

  return (
    <div className="place-card">
      <Icon className="place-card-icon" size={22} strokeWidth={1.75} />
      <div className="place-card-body">
        <h3 className="place-card-name">
          <Icon className="place-card-name-icon" size={18} strokeWidth={1.75} />
          <span>{name}</span>
          <a
            className="place-card-maps-link"
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.common.openInMapsShort}
            title={t.common.openInMapsShort}
          >
            <ExternalLink size={14} strokeWidth={1.75} />
          </a>
        </h3>
        {(address || phone) && (
          <p className="place-card-meta">
            {address && (
              <span className="place-card-meta-item">
                <PinIcon size={13} strokeWidth={1.75} />
                {address}
              </span>
            )}
            {phone && (
              <span className="place-card-meta-item">
                <Phone size={13} strokeWidth={1.75} />
                {phone}
              </span>
            )}
          </p>
        )}
        {desc && <p className="place-card-desc">{desc}</p>}
      </div>
    </div>
  );
}

export default PlaceCard;
