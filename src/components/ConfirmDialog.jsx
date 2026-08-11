import { X } from "lucide-react";
import "./ConfirmDialog.css";

function ConfirmDialog({ title, message, confirmLabel, cancelLabel, onConfirm, onCancel }) {
  return (
    <div className="confirm-dialog-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-dialog-header">
          <button type="button" className="confirm-dialog-close" onClick={onCancel} aria-label={cancelLabel}>
            <X size={18} />
          </button>
          <h3 className="confirm-dialog-title">{title}</h3>
        </div>

        <div className="confirm-dialog-body">
          <p>{message}</p>
        </div>

        <div className="confirm-dialog-actions">
          <button type="button" className="availability-btn-secondary" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className="availability-btn-primary" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
