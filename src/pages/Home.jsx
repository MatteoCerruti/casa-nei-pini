import { useLanguage } from "../LanguageContext";
import Card from "../components/Card";
import MapEmbed from "../components/MapEmbed";
import sectionIcons from "../sectionIcons";
import "./Home.css";

const SECTION_KEYS = [
  "checkin",
  "checkout",
  "wifi",
  "rules",
  "apartment",
  "rooms",
  "trash",
  "parking",
  "contacts",
  "dintorni",
];

function Home() {
  const { t } = useLanguage();

  return (
    <div className="page home-page">
      <main className="card-grid">
        {SECTION_KEYS.map((key) => {
          const nav = t.nav[key];
          return (
            <Card
              key={key}
              to={`/${key}`}
              icon={sectionIcons[key]}
              title={nav.title}
              desc={nav.desc}
            />
          );
        })}
      </main>

      <section className="where-section">
        <h2 className="where-title">{t.common.whereWeAre}</h2>
        <MapEmbed height={300} />
      </section>
    </div>
  );
}

export default Home;
