import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import styles from './styles.module.css'
const ToolBar = ({openSidebar}) => {
  return (
    <div className={styles.toolBar}>
        <div className={styles.burger} onClick={openSidebar}>
            <MenuIcon/>
        </div>
        <div className={styles.title}>The Brave Coder</div>
    </div>
  )
}

export default ToolBar