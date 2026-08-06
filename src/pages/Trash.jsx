import { Trash2 } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import SectionShell from "../components/SectionShell";
import BinMap from "../components/BinMap";

const BIN_1_POSITION = [44.364209, 8.566304]; // Bidoni salendo in collina
const BIN_1_LINK = "https://maps.app.goo.gl/zmBFnHKvSrUUXTUg9";
const BIN_2_POSITION = [44.361637, 8.568313]; // Bidoni scendendo verso Varazze
const BIN_2_LINK = "https://maps.app.goo.gl/A7ZyppM8kPYLgZTR7";

function Trash() {
  const { t } = useLanguage();

  return (
    <SectionShell icon={Trash2} sectionKey="trash">
      <div className="trash-maps">
        <div className="card-group">
          <h2 className="card-group-title">{t.common.bin1Title}</h2>
          <BinMap binPosition={BIN_1_POSITION} mapsLink={BIN_1_LINK} />
        </div>
        <div className="card-group">
          <h2 className="card-group-title card-group-title-important">{t.common.bin2Title}</h2>
          <BinMap binPosition={BIN_2_POSITION} mapsLink={BIN_2_LINK} />
        </div>
      </div>
    </SectionShell>
  );
}

export default Trash;
