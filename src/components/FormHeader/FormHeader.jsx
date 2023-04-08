import React from 'react'
import styles from './FormHeader.module.css'
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import FolderIcon from '@mui/icons-material/Folder';
import { Button, IconButton } from '@chakra-ui/react';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const FormHeader = () => {
  return (
    <div className={styles.formHeader}>
      <div className={styles.formHeaderLeft}>
        <img src='https://e7.pngegg.com/pngimages/709/627/png-clipart-google-docs-form-google-purple-violet.png'
        height="45px"
        width="40px"
        />
        <input type="text" placeholder='Untitled form' 
        className={styles.formName} value={""}/>
        <FolderIcon className={styles.formHeaderIcon} style={{marginRight:"10px"}}/>
        <StarOutlineIcon className={styles.formHeaderIcon} style={{marginRight:"10px"}}/>
        <span style={{fontSize:"12px",fontWeight:"600"}}>All Changes are saved in Drive</span>
      </div>
      <div className={styles.formHeaderRight}>
        <IconButton>
          <ColorLensIcon size="small" className={styles.formHeaderIcon}/>
        </IconButton>
        <IconButton>
          <RemoveRedEyeIcon  className={styles.formHeaderIcon}/>
        </IconButton>
        <IconButton>
          <SettingsIcon  className={styles.formHeaderIcon}/>
        </IconButton>
        <Button colorScheme='blue' href='#contained-button'>Send</Button>
        <IconButton>
          <MoreVertIcon className={styles.formHeaderIcon}/>
        </IconButton>
        <IconButton>
          <PersonIcon  className={styles.formHeaderIcon} 
          style={{height:"30px",width:"30px"}}/>
        </IconButton>
      </div>
    </div>
  )
}

export default FormHeader