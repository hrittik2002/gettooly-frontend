import React from "react";
import SideNavbar2 from "../components/SideNavbar2/SideNavbar2";
import styles from "./Test.module.css";
const Test = () => {
 
  return (
    <div className={styles.container}>
      <h1>Response Page</h1>
      <button idName="edit-btn">Edit Response</button>
      <button idName="view-btn">View Response</button>
    </div>
  );
};

export default Test;
