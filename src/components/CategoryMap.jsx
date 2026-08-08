import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet";
import { ExternalLink } from "lucide-react";
import L from "leaflet";
import { useLanguage } from "../LanguageContext";
import { useTheme } from "../ThemeContext";
import { config } from "../properties";
import "leaflet/dist/leaflet.css";
import "./CategoryMap.css";

const HOUSE_POSITION = config.location.position;

function FitAllPoints({ positions }) {
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
    <div class="category-map-pin category-map-pin-house">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z" />
      </svg>
    </div>
  `,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

const placePin = L.divIcon({
  className: "map-pin-icon",
  html: `<div class="category-map-pin category-map-pin-place"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

// Mini mappa con la casa + tutti i marker di una categoria di "Dintorni".
function CategoryMap({ places, height = 240 }) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const tileSet = theme === "dark" ? "dark_all" : "light_all";

  const geocoded = places.filter((p) => typeof p.lat === "number" && typeof p.lon === "number");
  if (geocoded.length === 0) return null;

  const positions = [HOUSE_POSITION, ...geocoded.map((p) => [p.lat, p.lon])];

  return (
    <div className="category-map">
      <div className="map-frame" style={{ height }}>
        <MapContainer
          center={HOUSE_POSITION}
          zoom={14}
          scrollWheelZoom={false}
          zoomControl={false}
          attributionControl={false}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer url={`https://{s}.basemaps.cartocdn.com/${tileSet}/{z}/{x}/{y}{r}.png`} />
          <Marker position={HOUSE_POSITION} icon={housePin} />
          {geocoded.map((p) => (
            <Marker key={p.id} position={[p.lat, p.lon]} icon={placePin}>
              <Popup>
                <span className="category-map-popup-name">{p.name}</span>
                <a href={p.mapsUrl} target="_blank" rel="noopener noreferrer" className="category-map-popup-link">
                  <ExternalLink size={12} strokeWidth={1.75} />
                  {t.common.openInMapsShort}
                </a>
              </Popup>
            </Marker>
          ))}
          <ZoomControl position="bottomleft" />
          <FitAllPoints positions={positions} />
        </MapContainer>
      </div>
    </div>
  );
}

export default CategoryMap;
