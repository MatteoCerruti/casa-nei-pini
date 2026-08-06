import { LogOut } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import SectionShell from "../components/SectionShell";
import InlinePhoto from "../components/InlinePhoto";
import cassettaPosta from "../assets/photos/checkout/cassetta-posta.png";

function CheckOut() {
  const { t } = useLanguage();

  return (
    <SectionShell icon={LogOut} sectionKey="checkout">
      <InlinePhoto src={cassettaPosta} alt={t.common.checkoutKeysTitle} className="inline-photo-center" />
    </SectionShell>
  );
}

export default CheckOut;
