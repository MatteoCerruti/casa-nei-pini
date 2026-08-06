import { HelpCircle } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import SectionShell from "../components/SectionShell";
import Accordion from "../components/Accordion";

function Faq() {
  const { t } = useLanguage();
  const p = t.pages.faq;

  return (
    <SectionShell icon={HelpCircle} sectionKey="faq">
      <Accordion groups={p.groups} />
    </SectionShell>
  );
}

export default Faq;
