import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, ZoomControl, useMap } from "react-leaflet";
import { ExternalLink } from "lucide-react";
import L from "leaflet";
import { useLanguage } from "../LanguageContext";
import { useTheme } from "../ThemeContext";
import { config } from "../properties";
import "leaflet/dist/leaflet.css";
import "./MapEmbed.css";

const POSITION = config.location.position;
export const MAPS_LINK = config.location.mapsLink;

// Decentra la vista: sposta la camera in basso a destra rispetto al pin,
// così il marker resta nella parte alta/sinistra del riquadro.
function DecenterView() {
  const map = useMap();
  useEffect(() => {
    map.panBy([50, 20], { animate: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

// Pin custom in HTML/CSS (stile Airbnb: goccia piena con icona casa),
// al posto del marker di default di Leaflet.
const pinIcon = L.divIcon({
  className: "map-pin-icon",
  html: `
    <div class="map-pin">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z" />
      </svg>
    </div>
  `,
  iconSize: [34, 44],
  iconAnchor: [17, 44],
});

function MapEmbed({ height = 300 }) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const tileSet = theme === "dark" ? "dark_all" : "light_all";

  return (
    <div className="map-embed">
      <div className="map-frame" style={{ height }}>
        <MapContainer
          center={POSITION}
          zoom={15}
          scrollWheelZoom={false}
          zoomControl={false}
          attributionControl={false}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer url={`https://{s}.basemaps.cartocdn.com/${tileSet}/{z}/{x}/{y}{r}.png`} />
          <Marker position={POSITION} icon={pinIcon} />
          <ZoomControl position="bottomleft" />
          <DecenterView />
        </MapContainer>
        <a className="map-open-btn" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">
          <ExternalLink size={15} strokeWidth={1.75} />
          <span>{t.common.openInMaps}</span>
        </a>
      </div>
    </div>
  );
}

export default MapEmbed;
