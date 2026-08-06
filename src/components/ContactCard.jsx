import { Phone, MessageCircle, Mail } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import contactAvatars from "../contactAvatars";
import "./ContactCard.css";

// Card contatto (stile home): foto, nome, email (se presente), bottone chiamata + bottone WhatsApp.
function ContactCard({ id, name, telUrl, waUrl, mail }) {
  const { t } = useLanguage();
  const avatar = contactAvatars[id];

  return (
    <div className="contact-card">
      <div className="contact-card-avatar">
        <div className="contact-card-avatar-img">
          {avatar && <img src={avatar} alt={name} />}
        </div>
        <span className="contact-card-badge">
          <Phone size={11} strokeWidth={2} />
        </span>
      </div>
      <h3 className="contact-card-name">{name}</h3>
      {mail ? (
        <a className="contact-card-mail" href={`mailto:${mail}`} title={mail}>
          <Mail size={13} strokeWidth={1.75} />
          <span className="contact-card-mail-text">{mail}</span>
        </a>
      ) : (
        <span className="contact-card-mail contact-card-mail-empty" aria-hidden="true" />
      )}
      <div className="contact-card-actions">
        {telUrl && (
          <a className="contact-card-call" href={telUrl}>
            <Phone size={15} strokeWidth={1.75} />
            <span>{t.common.callAction}</span>
          </a>
        )}
        {waUrl && (
          <a className="contact-card-wa" href={waUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={15} strokeWidth={1.75} />
            <span>{t.common.whatsappAction}</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default ContactCard;
