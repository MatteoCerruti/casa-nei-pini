import { Wifi as WifiIcon } from "lucide-react";
import SectionShell from "../components/SectionShell";

// Unica eccezione alla regola "niente verde": l'icona WiFi resta verde.

function Wifi() {
  return <SectionShell icon={WifiIcon} sectionKey="wifi" />;
}

export default Wifi;
