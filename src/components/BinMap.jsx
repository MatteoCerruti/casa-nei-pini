import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, ZoomControl, useMap } from "react-leaflet";
import { ExternalLink } from "lucide-react";
import L from "leaflet";
import { useLanguage } from "../LanguageContext";
import { useTheme } from "../ThemeContext";
import "leaflet/dist/leaflet.css";
import "./BinMap.css";

const HOUSE_POSITION = [44.3623255, 8.5665055]; // Via Nuova Cantalupo 29/1, Varazze

// Inquadra entrambi i punti (casa + bidone) con un margine, invece del
// decentramento fisso usato per la mappa a un solo marker.
function FitTwoPoints({ positions }) {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(positions);
    map.fitBounds(bounds, { padding: [32, 32] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

const housePin = L.divIcon({
  className: "map-pin-icon",
  html: `
    <div class="bin-map-pin bin-map-pin-house">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z" />
      </svg>
    </div>
  `,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

const binPin = L.divIcon({
  className: "map-pin-icon",
  html: `
    <div class="bin-map-pin bin-map-pin-bin">
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 6h18" /><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" /><path d="M19 6l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6" />
      </svg>
    </div>
  `,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

// Mini mappa con due marker: casa + bidone. Usata a coppie (uno per bidone)
// nella pagina Rifiuti.
function BinMap({ binPosition, mapsLink, height = 220 }) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const tileSet = theme === "dark" ? "dark_all" : "light_all";
  const positions = [HOUSE_POSITION, binPosition];

  return (
    <div className="bin-map">
      <div className="map-frame" style={{ height }}>
        <MapContainer
          center={HOUSE_POSITION}
          zoom={15}
          scrollWheelZoom={false}
          zoomControl={false}
          attributionControl={false}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer url={`https://{s}.basemaps.cartocdn.com/${tileSet}/{z}/{x}/{y}{r}.png`} />
          <Marker position={HOUSE_POSITION} icon={housePin} />
          <Marker position={binPosition} icon={binPin} />
          <ZoomControl position="bottomleft" />
          <FitTwoPoints positions={positions} />
        </MapContainer>
        <a className="map-open-btn" href={mapsLink} target="_blank" rel="noopener noreferrer">
          <ExternalLink size={15} strokeWidth={1.75} />
          <span>{t.common.openInMaps}</span>
        </a>
      </div>
    </div>
  );
}

export default BinMap;
