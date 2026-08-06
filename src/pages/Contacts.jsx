import { Phone } from "lucide-react";
import SectionShell from "../components/SectionShell";

function Contacts() {
  return <SectionShell icon={Phone} sectionKey="contacts" showMap mapHeight={280} mapTitleKey="addressTitle" showEmergency />;
}

export default Contacts;
