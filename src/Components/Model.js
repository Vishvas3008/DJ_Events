import { useState, useEffect } from "react";
import styles from "../styles/Modal.module.css";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
export default function Model({ show, onClose, children, title }) {
  const [isbrowser, setIsBrowser] = useState(false);

  useEffect(() => setIsBrowser(true));
  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const modelContant = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href='#' onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isbrowser) {
    return ReactDOM.createPortal(
      modelContant,
      document.getElementById("model-root")
    );
  } else {
    return null;
  }
}
