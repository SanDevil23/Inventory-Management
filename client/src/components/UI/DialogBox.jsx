import React from 'react';
import '../css/MainCss.css';

const DialogBox = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="dialog-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
