import { Shield } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import SectionShell from "../components/SectionShell";
import InfoBlock from "../components/InfoBlock";
import { config } from "../properties";

function fillTemplate(str, values) {
  return str.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

function Privacy() {
  const { t } = useLanguage();
  const p = t.pages.privacy;
  const { controllerName, controllerEmail } = config.legal;
  const { address } = config.location;

  return (
    <SectionShell icon={Shield} sectionKey="privacy">
      <InfoBlock
        icon="UserCheck"
        label={p.controller.label}
        text={fillTemplate(p.controller.text, { name: controllerName, email: controllerEmail, address })}
      />
      {p.sections.map((item, i) => (
        <InfoBlock key={i} icon={item.icon} label={item.label} text={item.text} />
      ))}
      <InfoBlock
        icon="ShieldCheck"
        label={p.rights.label}
        text={fillTemplate(p.rights.text, { email: controllerEmail })}
      />
    </SectionShell>
  );
}

export default Privacy;
