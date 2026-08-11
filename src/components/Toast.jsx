import { useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import "./Toast.css";

function Toast({ message, onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="toast" role="alert">
      <AlertCircle size={18} strokeWidth={1.75} />
      <span className="toast-message">{message}</span>
      <button type="button" className="toast-close" onClick={onClose} aria-label="Chiudi">
        <X size={16} strokeWidth={1.75} />
      </button>
    </div>
  );
}

export default Toast;
