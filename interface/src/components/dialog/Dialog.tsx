import React from "react";
import "./style.css";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseButton: boolean;
}

function Dialog({ isOpen, onClose, children, showCloseButton }: DialogProps) {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <div className="dialog-content">{children}</div>
        {showCloseButton && (
          <button className="dialog-close-btn" onClick={onClose}>
            Close
          </button>
        )}
      </div>
    </div>
  );
}

export default Dialog;
