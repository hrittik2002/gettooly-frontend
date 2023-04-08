import React from 'react'
import styles from "./Template.module.css"
import { MoreVert, UnfoldMore } from '@mui/icons-material'
import { IconButton } from '@chakra-ui/react'
import { createForm } from '../../config/ApiCalls/formApiCalls'
import { useDispatch } from 'react-redux'
import { setFormCode, setFormCreator, setFormTitle } from '../../redux/formSlice'
import { useNavigate } from 'react-router-dom'


const Template = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const createNewForm = async () =>{
        const res = await createForm(); // create new form
        dispatch(setFormCode(res.data.code));
        dispatch(setFormCreator(res.data.creator));
        dispatch(setFormTitle(res.data.title));
        navigate(`/form/${res.data.code}/edit`);
    }
  return (
    <div className={styles.templateSection}>

        {/* Template Top */}
        <div className={styles.templateTop}>
            <div className={styles.templateLeft}>
                <span style={{fontSize:"16px" , color : "#202124"}}>Start a new Form</span>
            </div>
            <div className={styles.templateRight}>
                <div className={styles.galleryButton}>
                    Template Gallery
                    <UnfoldMore/>
                </div>
                <IconButton>
                    <MoreVert/>
                </IconButton>
  
            </div>
        </div>

        {/* Template Body */}
        <div className={styles.templateBody}>
            <div className={styles.card} onClick={createNewForm}>
                <img className={styles.cardImage} src="https://thumbs.dreamstime.com/b/add-icon-flat-illustration-plus-sign-symbol-vector-174197726.jpg" alt="no image" />
                <p className={styles.cardTitle}>Blank</p>
            </div>
            <div className={styles.card}>
                <img className={styles.cardImage} src="https://thumbs.dreamstime.com/b/add-icon-flat-illustration-plus-sign-symbol-vector-174197726.jpg" alt="no image" />
                <p className={styles.cardTitle}>Party Invite</p>
            </div>
            <div className={styles.card}>
                <img className={styles.cardImage} src="https://thumbs.dreamstime.com/b/add-icon-flat-illustration-plus-sign-symbol-vector-174197726.jpg" alt="no image" />
                <p className={styles.cardTitle}>Contact Information</p>
            </div>
        </div>

    </div>
  )
}

export default Template