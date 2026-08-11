import { KeyRound, MapPin, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import SectionShell from "../components/SectionShell";
import InlinePhoto from "../components/InlinePhoto";
import MapEmbed from "../components/MapEmbed";
import { getPhotos } from "../properties/photoLoader";
import "./GuestCheckin.css";

const GUEST_CTA = {
  it: "Registra i tuoi dati online prima di arrivare",
  en: "Register your details online before you arrive",
  fr: "Enregistrez vos informations en ligne avant votre arrivée",
  es: "Registra tus datos en línea antes de llegar",
  de: "Registriere deine Daten online vor der Ankunft",
};

function CheckIn() {
  const { t, lang } = useLanguage();
  const [portaIngresso] = getPhotos("checkin", "porta");
  const [cassettaSicurezza] = getPhotos("checkin", "cassetta");

  return (
    <SectionShell icon={KeyRound} sectionKey="checkin">
      <Link to="/checkin-online" className="guestcheckin-cta">
        <UserPlus size={18} strokeWidth={1.75} />
        {GUEST_CTA[lang] ?? GUEST_CTA.en}
      </Link>

      <div className="equal-columns">
        <div className="card-group">
          <h2 className="card-group-title">{t.common.checkinDoorTitle}</h2>
          <InlinePhoto src={portaIngresso} alt={t.common.checkinDoorTitle} />
        </div>
        <div className="card-group">
          <h2 className="card-group-title">{t.common.checkinLockboxTitle}</h2>
          <InlinePhoto src={cassettaSicurezza} alt={t.common.checkinLockboxTitle} />
        </div>
      </div>

      <div className="map-section">
        <h2 className="map-section-title">
          <MapPin size={18} strokeWidth={1.75} />
          {t.common.whereWeAre}
        </h2>
        <MapEmbed height={220} />
      </div>
    </SectionShell>
  );
}

export default CheckIn;
