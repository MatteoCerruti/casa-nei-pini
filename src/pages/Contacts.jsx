import { Phone } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import SectionShell from "../components/SectionShell";
import InfoBlock from "../components/InfoBlock";

function Contacts() {
  const { t } = useLanguage();

  return (
    <SectionShell icon={Phone} sectionKey="contacts" showMap mapHeight={280} mapTitleKey="addressTitle" showEmergency>
      <InfoBlock
        icon="ShieldCheck"
        label={t.common.privacyLink}
        text={`<a href="/privacy">${t.common.privacyLinkText}</a>`}
      />
    </SectionShell>
  );
}

export default Contacts;
