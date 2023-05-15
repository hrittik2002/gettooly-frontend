import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import styles from './styles.module.css'
import { Button } from '@chakra-ui/react';
import { logout } from '../../config/Cookie';
import { useNavigate } from 'react-router-dom';
const ToolBar = ({openSidebar}) => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    logout();
    navigate("/");
    window.location.reload();
  }
  return (
    <div className={styles.toolBar}>
      <div className={styles.left}>
      <div className={styles.burger} onClick={openSidebar}>
            <MenuIcon fontSize="large" className={styles.burgerIcon}/>
        </div>
        <div className={styles.title}>99Types</div>

      </div>
      <div className={styles.right}>
        <button className={styles.logoutBtn} onClick={logoutHandler}>Logout</button>
      </div>
    </div>
  )
}

export default ToolBar