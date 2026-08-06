import { Link } from "react-router-dom";
import "./Card.css";

function Card({ to, icon: Icon, title, desc }) {
  return (
    <Link to={to} className="nav-card">
      <Icon className="nav-card-icon" size={28} strokeWidth={1.5} />
      <h2 className="nav-card-title">{title}</h2>
      <p className="nav-card-desc">{desc}</p>
    </Link>
  );
}

export default Card;
