import { Home } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import SectionShell from "../components/SectionShell";
import RoomSection from "../components/RoomSection";
import { getPhotos } from "../properties/photoLoader";
import { config } from "../properties";

function Rooms() {
  const { t } = useLanguage();

  return (
    <SectionShell icon={Home} sectionKey="rooms">
      {config.rooms.map(({ id, titleKey }) => (
        <RoomSection key={id} id={id} title={t.common[titleKey]} photos={getPhotos("apartment", id)} />
      ))}
    </SectionShell>
  );
}

export default Rooms;
