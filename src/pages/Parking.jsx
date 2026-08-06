import { ParkingCircle } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import SectionShell from "../components/SectionShell";
import InfoBlock from "../components/InfoBlock";
import InlinePhoto from "../components/InlinePhoto";
import svolta1 from "../assets/photos/parking/svolta-1.png";
import parcheggio1 from "../assets/photos/parking/parcheggio-1.jpg";

function Parking() {
  const { t } = useLanguage();
  const p = t.pages.parking;

  return (
    <SectionShell
      icon={ParkingCircle}
      sectionKey="parking"
      showMap
      mapHeight={280}
      mapTitleKey="addressTitle"
    >
      <div className="parking-columns">
        <div className="card-group parking-col">
          <InfoBlock icon="Navigation" label={p.route.label} text={p.route.text} />
          <InlinePhoto src={svolta1} alt={p.route.label} />
        </div>

        <div className="card-group parking-col parking-col-wide">
          <InfoBlock icon="Car" label={p.spot.label} text={p.spot.text} important={p.spot.important} />
          <InlinePhoto src={parcheggio1} alt={p.spot.label} className="inline-photo-wide" />
        </div>
      </div>

      <div className="parking-col parking-alt">
        <InfoBlock icon="ParkingCircle" label={p.alternative.label} text={p.alternative.text} />
      </div>
    </SectionShell>
  );
}

export default Parking;
