import { KeyRound, MapPin } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import SectionShell from "../components/SectionShell";
import InlinePhoto from "../components/InlinePhoto";
import MapEmbed from "../components/MapEmbed";
import { getPhotos } from "../properties/photoLoader";

function CheckIn() {
  const { t } = useLanguage();
  const [portaIngresso] = getPhotos("checkin", "porta");
  const [cassettaSicurezza] = getPhotos("checkin", "cassetta");

  return (
    <SectionShell icon={KeyRound} sectionKey="checkin">
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
