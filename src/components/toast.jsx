
import React, { useEffect } from "react";
import "./toast.css";

const Toast = ({ message, type = "error", onClose, duration = 10000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
};

export default Toast;
