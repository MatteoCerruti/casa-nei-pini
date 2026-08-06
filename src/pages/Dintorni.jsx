import { MapPin, Pizza, Fish, Coffee, Umbrella, ShoppingCart, Compass } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import SectionShell from "../components/SectionShell";
import PlaceCard from "../components/PlaceCard";
import nearbyPlaces from "../nearbyPlaces";
import "./Dintorni.css";

const CATEGORY_ICONS = {
  Pizza,
  Fish,
  Coffee,
  Umbrella,
  ShoppingCart,
  Compass,
};

function Dintorni() {
  const { t } = useLanguage();
  const p = t.pages.dintorni;

  return (
    <SectionShell icon={MapPin} sectionKey="dintorni">
      <nav className="dintorni-chips" aria-label={p.title}>
        {nearbyPlaces.map((category) => (
          <a key={category.id} href={`#${category.id}`} className="dintorni-chip">
            {p.categories[category.id].title}
          </a>
        ))}
      </nav>

      {nearbyPlaces.map((category) => {
        const Icon = CATEGORY_ICONS[category.icon];
        return (
          <div className="card-group dintorni-category" key={category.id} id={category.id}>
            <h2 className="card-group-title dintorni-category-title">
              <Icon size={18} strokeWidth={1.75} />
              {p.categories[category.id].title}
            </h2>
            <div className="dintorni-place-list">
              {category.places.map((place) => (
                <PlaceCard
                  key={place.id}
                  icon={Icon}
                  name={place.name}
                  address={place.address}
                  phone={place.phone}
                  desc={p.places[place.id]}
                  mapsUrl={place.mapsUrl}
                />
              ))}
            </div>
          </div>
        );
      })}
    </SectionShell>
  );
}

export default Dintorni;
