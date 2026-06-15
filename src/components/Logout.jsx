import React from "react";
import "./LogoutModal.css"; // put your CSS here

const LogoutModal = ({ showLogout, onCancel, onDeactivate }) => {
  if (!showLogout) return null;
  

  return (
    <div className="container-logout-background">
      <div className="container-logout-laptop-sub">
        <div>
          <img src="/images/info-disclaimer.svg" alt="Info Disclaimer" />
        </div>

        <div className="logout-question-laptop">
          <span>Are you sure you want to log out of your account</span>
        </div>

        <div className="logout-note-laptop">
          <span>
            If you continue whatever you are working on will be deleted
          </span>
        </div>

        <div className="logout-btn-container">
          <button onClick={onCancel}>GO BACK</button>
          <button onClick={onDeactivate}>CONTINUE &gt;</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
