import { LogOut } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import SectionShell from "../components/SectionShell";
import InlinePhoto from "../components/InlinePhoto";
import { getPhotos } from "../properties/photoLoader";

function CheckOut() {
  const { t } = useLanguage();
  const [cassettaPosta] = getPhotos("checkout", "cassetta-posta");

  return (
    <SectionShell icon={LogOut} sectionKey="checkout">
      <InlinePhoto src={cassettaPosta} alt={t.common.checkoutKeysTitle} className="inline-photo-center" />
    </SectionShell>
  );
}

export default CheckOut;
