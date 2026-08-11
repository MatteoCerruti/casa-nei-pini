import { Phone } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import SectionShell from "../components/SectionShell";
import InfoBlock from "../components/InfoBlock";
import { config } from "../properties";

function Contacts() {
  const { t } = useLanguage();

  return (
    <SectionShell icon={Phone} sectionKey="contacts" showMap mapHeight={280} mapTitleKey="addressTitle" showEmergency>
      <InfoBlock icon="IdCard" label={t.common.cinLabel} text={config.legal.cin} mono />
    </SectionShell>
  );
}

export default Contacts;
