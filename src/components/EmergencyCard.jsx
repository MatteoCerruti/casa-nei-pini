import { PhoneCall } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import "./EmergencyCard.css";

// Card emergenze: solo il 112 (NUE, Numero Unico Emergenze), attivo in
// tutta Italia/UE e che smista automaticamente a Polizia/Vigili del
// fuoco/Ambulanza — i vecchi numeri diretti (113/115/118) sono ridondanti.
function EmergencyCard() {
  const { t } = useLanguage();

  return (
    <div className="emergency-card">
      <a className="emergency-main" href="tel:112">
        <span className="emergency-main-icon">
          <PhoneCall size={20} strokeWidth={1.75} />
        </span>
        <span className="emergency-main-info">
          <span className="emergency-main-number">112</span>
          <span className="emergency-main-label">{t.common.emergencyMainLabel}</span>
        </span>
      </a>
      <p className="emergency-note">{t.common.emergencyNote}</p>
    </div>
  );
}

export default EmergencyCard;
