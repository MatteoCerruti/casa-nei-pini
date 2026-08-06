import { ExternalLink, Phone, MessageCircle, Mail } from "lucide-react";
import "./LinkPill.css";

const iconByType = {
  link: ExternalLink,
  tel: Phone,
  wa: MessageCircle,
  mail: Mail,
};

// tel / wa / mail → link testuale sottolineato (stile contatti Airbnb)
// link → bottone CTA secondario (per pagine esterne: Airbnb, Booking, percorsi Maps)
function LinkPill({ type, text, url }) {
  const Icon = iconByType[type] || ExternalLink;
  const isExternal = type === "link" || type === "wa";
  const isTextLink = type === "tel" || type === "wa" || type === "mail";

  return (
    <a
      className={isTextLink ? "text-link" : "cta-secondary"}
      href={url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <Icon size={16} strokeWidth={1.75} />
      <span>{text}</span>
    </a>
  );
}

export default LinkPill;
