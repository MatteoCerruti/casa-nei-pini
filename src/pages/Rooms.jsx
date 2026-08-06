import { Home } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import SectionShell from "../components/SectionShell";
import RoomSection from "../components/RoomSection";

import salotto1 from "../assets/photos/apartment/salotto/salotto-1.jpeg";
import salotto2 from "../assets/photos/apartment/salotto/salotto-2.jpeg";
import salotto3 from "../assets/photos/apartment/salotto/salotto-3.jpeg";
import salotto4 from "../assets/photos/apartment/salotto/salotto-4.jpeg";
import salotto5 from "../assets/photos/apartment/salotto/salotto-5.jpeg";

import cucina1 from "../assets/photos/apartment/cucina/cucina-1.jpeg";
import cucina2 from "../assets/photos/apartment/cucina/cucina-2.jpeg";
import cucina3 from "../assets/photos/apartment/cucina/cucina-3.jpeg";
import cucina4 from "../assets/photos/apartment/cucina/cucina-4.jpeg";

import matrimoniale1 from "../assets/photos/apartment/camera-matrimoniale/camera-matrimoniale-1.jpeg";
import matrimoniale2 from "../assets/photos/apartment/camera-matrimoniale/camera-matrimoniale-2.jpeg";

import doppia1 from "../assets/photos/apartment/camera-doppia/camera-doppia-1.jpeg";
import doppia2 from "../assets/photos/apartment/camera-doppia/camera-doppia-2.jpeg";
import doppia3 from "../assets/photos/apartment/camera-doppia/camera-doppia-3.jpeg";

import unaEMezza1 from "../assets/photos/apartment/camera-una-e-mezza/camera-una-e-mezza-1.jpeg";
import unaEMezza2 from "../assets/photos/apartment/camera-una-e-mezza/camera-una-e-mezza-2.jpeg";

import bagno1 from "../assets/photos/apartment/bagno/bagno-1.jpeg";
import bagno2 from "../assets/photos/apartment/bagno/bagno-2.jpeg";

import interni1 from "../assets/photos/apartment/interni/interni-1.jpeg";
import interni2 from "../assets/photos/apartment/interni/interni-2.jpeg";

import esterni1 from "../assets/photos/apartment/esterni/esterni-1.jpeg";
import esterni2 from "../assets/photos/apartment/esterni/esterni-2.jpeg";
import esterni3 from "../assets/photos/apartment/esterni/esterni-3.jpeg";

function Rooms() {
  const { t } = useLanguage();

  return (
    <SectionShell icon={Home} sectionKey="rooms">
      <RoomSection
        id="salotto"
        title={t.common.roomLivingRoom}
        photos={[salotto1, salotto2, salotto3, salotto4, salotto5]}
      />
      <RoomSection
        id="cucina"
        title={t.common.roomKitchen}
        photos={[cucina1, cucina2, cucina3, cucina4]}
      />
      <RoomSection
        id="camera-matrimoniale"
        title={t.common.roomMasterBedroom}
        photos={[matrimoniale1, matrimoniale2]}
      />
      <RoomSection
        id="camera-doppia"
        title={t.common.roomTwinRoom}
        photos={[doppia1, doppia2, doppia3]}
      />
      <RoomSection
        id="camera-una-e-mezza"
        title={t.common.roomSingleRoom}
        photos={[unaEMezza1, unaEMezza2]}
      />
      <RoomSection
        id="bagno"
        title={t.common.roomBathroom}
        photos={[bagno1, bagno2]}
      />
      <RoomSection
        id="interni"
        title={t.common.roomInterior}
        photos={[interni1, interni2]}
      />
      <RoomSection
        id="esterni"
        title={t.common.roomExterior}
        photos={[esterni1, esterni2, esterni3]}
      />
    </SectionShell>
  );
}

export default Rooms;
