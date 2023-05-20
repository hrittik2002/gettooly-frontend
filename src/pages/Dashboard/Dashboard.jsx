import React, { useEffect } from "react";
import SideNavbar2 from "../../components/SideNavbar2/SideNavbar2";
import styles from './Dashboard.module.css'
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCoductUserData } from "../../config/apiCalls";
import { setUserData } from "../../redux/userSlice";
import { getUserData } from "../../config/ApiCalls/userApiCalls";

const Dashboard = () => {
  const {userId} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        const getUserDataFun = async () => {
          const data = await getUserData(userId);
          //console.log(data);
          return data;
        }
        
        getUserDataFun().then(userData => {
          dispatch(setUserData(userData));
        });
      }, []);
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
