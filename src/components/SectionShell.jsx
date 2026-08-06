import { MapPin, Users, Link2, LifeBuoy } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import InfoBlock from "./InfoBlock";
import LinkPill from "./LinkPill";
import ContactCard from "./ContactCard";
import PlatformCard from "./PlatformCard";
import PhotoGrid from "./PhotoGrid";
import MapEmbed, { MAPS_LINK } from "./MapEmbed";
import EmergencyCard from "./EmergencyCard";
import contactAvatars from "../contactAvatars";
import platformMeta from "../platformMeta";
import "./SectionShell.css";

const FULL_ADDRESS = "Via Nuova Cantalupo 29/1, 17019 Varazze (SV)";

// Raggruppa gli item in blocchi: i testi restano singoli (etichetta + corpo),
// una coppia tel+wa con foto profilo diventa una card contatto, un link con id
// piattaforma (airbnb/booking) diventa una card piattaforma, gli altri
// link/telefono/whatsapp/email consecutivi finiscono in una riga.
function groupItems(items) {
  const groups = [];
  let i = 0;
  while (i < items.length) {
    const item = items[i];

    if (item.type === "text") {
      groups.push({ kind: "text", item });
      i++;
      continue;
    }

    if (item.type === "tel" && contactAvatars[item.id]) {
      const next = items[i + 1];
      const wa = next && next.type === "wa" && next.id === item.id ? next : null;
      const contact = {
        id: item.id,
        name: item.text.split(" — ")[0],
        telUrl: item.url,
        waUrl: wa ? wa.url : null,
        mail: item.mail || null,
      };
      const last = groups[groups.length - 1];
      if (last && last.kind === "contacts") {
        last.items.push(contact);
      } else {
        groups.push({ kind: "contacts", items: [contact] });
      }
      i += wa ? 2 : 1;
      continue;
    }

    if (item.type === "link" && platformMeta[item.id]) {
      const last = groups[groups.length - 1];
      if (last && last.kind === "platforms") {
        last.items.push(item);
      } else {
        groups.push({ kind: "platforms", items: [item] });
      }
      i++;
      continue;
    }

    const last = groups[groups.length - 1];
    if (last && last.kind === "links") {
      last.items.push(item);
    } else {
      groups.push({ kind: "links", items: [item] });
    }
    i++;
  }
  return groups;
}

function SectionShell({
  icon: Icon,
  sectionKey,
  showMap = false,
  showPhotoGrid = false,
  showEmergency = false,
  photos = [],
  mapHeight = 220,
  mapTitleKey = "whereWeAre",
  iconColor,
  children,
}) {
  const { t } = useLanguage();
  const page = t.pages[sectionKey];
  const groups = groupItems(page.items);

  return (
    <div className={`page section-page section-page-${sectionKey}`}>

      <div className="section-title-row">
        <Icon className="section-title-icon" size={24} strokeWidth={1.75} style={iconColor ? { color: iconColor } : undefined} />
        <h1 className="section-title">{page.title}</h1>
      </div>
      {page.subtitle && <p className="section-subtitle">{page.subtitle}</p>}

      <hr className="section-title-divider" />

      <div className="section-content">
        {groups.map((group, i) => {
          if (group.kind === "text") {
            return (
              <InfoBlock
                key={i}
                icon={group.item.icon}
                label={group.item.label}
                text={group.item.text}
                important={group.item.important}
                mono={group.item.mono}
              />
            );
          }
          if (group.kind === "contacts") {
            return (
              <div className="card-group" key={i}>
                <h2 className="card-group-title">
                  <Users size={18} strokeWidth={1.75} />
                  {t.common.hostsTitle}
                </h2>
                <div className="contact-card-grid">
                  {group.items.map((c) => (
                    <ContactCard key={c.id} id={c.id} name={c.name} telUrl={c.telUrl} waUrl={c.waUrl} mail={c.mail} />
                  ))}
                </div>
              </div>
            );
          }
          if (group.kind === "platforms") {
            return (
              <div className="card-group" key={i}>
                <h2 className="card-group-title">
                  <Link2 size={18} strokeWidth={1.75} />
                  {t.common.platformsTitle}
                </h2>
                <div className="contact-card-grid">
                  {group.items.map((p) => (
                    <PlatformCard key={p.id} id={p.id} url={p.url} />
                  ))}
                </div>
              </div>
            );
          }
          return (
            <div className="link-pill-row" key={i}>
              {group.items.map((item, j) => (
                <LinkPill key={j} type={item.type} text={item.text} url={item.url} />
              ))}
            </div>
          );
        })}

        {showEmergency && (
          <div className="card-group">
            <h2 className="card-group-title">
              <LifeBuoy size={18} strokeWidth={1.75} />
              {t.common.emergencyTitle}
            </h2>
            <EmergencyCard />
          </div>
        )}
        {showMap && (
          <div className="map-section">
            <h2 className="map-section-title">
              <MapPin size={18} strokeWidth={1.75} />
              {t.common[mapTitleKey]}
            </h2>
            {mapTitleKey === "addressTitle" && (
              <a className="map-address-line" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">
                {FULL_ADDRESS}
              </a>
            )}
            <MapEmbed height={mapHeight} />
          </div>
        )}
        {showPhotoGrid && (
          <PhotoGrid sectionKey={sectionKey} photos={photos} />
        )}
        {children}
      </div>
    </div>
  );
}

export default SectionShell;
