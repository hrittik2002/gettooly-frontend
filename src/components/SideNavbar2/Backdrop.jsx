import React from "react";
import styles from "./styles.module.css";
const Backdrop = ({ sidebar , closeSidebar }) => {
  return (
    <div
      className={
        sidebar
          ? `${styles.backdrop} ${styles.backdropOpen}`
          : `${styles.backdrop}`
      }
      onClick={closeSidebar}
    ></div>
  );
};

export default Backdrop;
