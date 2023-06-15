import React, { useEffect } from "react";
import SideNavbar2 from "../../components/SideNavbar2/SideNavbar2";
import styles from './Dashboard.module.css'
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCoductUserData } from "../../config/apiCalls";
import { setUserData } from "../../redux/userSlice";
import { getAllResultsApiCall, getUserData } from "../../config/ApiCalls/userApiCalls";
import { useState } from "react";

const Dashboard = () => {
  const {userId} = useParams();
  const [resultData , setResultData] = useState([]);
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

    useEffect(async()=>{
      const res = await getAllResultsApiCall(userId);
      console.log(res)
      setResultData(res.data);
    },[])
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

          {
            resultData.map((result , idx)=>(
              <tr>
            <td>{result.quiz_name}</td>
            <td>{result.total_score}</td>
            <td>{result.score}</td>
            <td>{result.percentage} %</td>
          </tr>
            ))
          }
          {
resultData.length === 0 && (
  <div>No result Found</div>
)
          }
          
        </table>
      </div>
    </>
  );
};

export default Dashboard;
