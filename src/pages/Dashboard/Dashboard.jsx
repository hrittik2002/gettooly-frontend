import React from "react";
import SideNavbar2 from "../../components/SideNavbar2/SideNavbar2";
import styles from './Dashboard.module.css'

const Dashboard = () => {
  return (
    <>
      <SideNavbar2 />
      <div className={styles.ItemsContainer}>
        <div className={styles.heading}>DASHBOARD</div>

        <table className={styles.borderedTable}>
          <tr>
            <th>Quiz Name</th>
            <th>Full Marks</th>
            <th>Marks Obtained</th>
            <th>Percentage</th>
          </tr>

          <tr>
            <td>abcd</td>
            <td>45</td>
            <td>10</td>
            <td>20%</td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
