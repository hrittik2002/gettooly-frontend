import React from "react";
import styles from "./styles.module.css";
import HomeIcon from "@mui/icons-material/Home";
const Sidebar = ({ sidebar }) => {
  return (
    <div
      className={
        sidebar
          ? `${styles.sidebar} ${styles.sidebarOpen}`
          : `${styles.sidebar}`
      }
    >
      <li>
        <HomeIcon />
        Home
      </li>
      <li>Products</li>
      <li>Carrer</li>
      <li>Contact Us</li>
      <li>About Us</li>
    </div>
  );
};

export default Sidebar;
