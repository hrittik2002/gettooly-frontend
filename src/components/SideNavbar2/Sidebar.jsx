import React from "react";
import styles from "./styles.module.css";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ArticleIcon from "@mui/icons-material/Article";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Sidebar = ({ sidebar }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.currentUser)
  const changePage = (link) => {
    navigate(link)
  }
  return (
    <div
      className={
        sidebar
          ? `${styles.sidebar} ${styles.sidebarOpen}`
          : `${styles.sidebar}`
      }
    >
      <li className={styles.listItem}
        onClick={()=>{changePage('/')}}
      >
        <HomeIcon />
        Home
      </li>
      <li className={styles.listItem}
      onClick={()=>{changePage(`/ConductUser/${userData.id}`)}}
      > 
        <ArticleIcon />
        CreateForm
      </li>
      <li className={styles.listItem}
      onClick={()=>{changePage(`/ConductUser/${userData.id}/about`)}}
      >
        <PersonIcon />
        About
      </li>
      <li className={styles.listItem}
      onClick={()=>{changePage( `/ConductUser/${userData.id}/changePassword`)}}
      >
        <LockOpenIcon />
        Change Password
      </li>
      <li className={styles.listItem} 
      onClick={()=>{changePage(`/ConductUser/${userData.id}/subscription`)}}
      >
        <SubscriptionsIcon />

        Subscriptions
      </li>
    </div>
  );
};

export default Sidebar;
