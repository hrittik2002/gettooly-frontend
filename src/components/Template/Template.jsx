import React from 'react'
import styles from "./Template.module.css"
import { MoreVert, UnfoldMore } from '@mui/icons-material'
import { IconButton } from '@chakra-ui/react'
import { createForm, getFormData } from '../../config/ApiCalls/formApiCalls'
import { useDispatch } from 'react-redux'
// import { setFormCode, setFormCreator, setFormTitle } from '../../redux/formSlice'
import { setFormTitle , setFormCode, setFormCreator, setQuestions } from '../../redux/questionsSlice'
import { useNavigate } from 'react-router-dom'


const Template = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const createNewForm = async () =>{
        const res = await createForm(); // create new form
        const res2 = await getFormData(res.data.code); // get form data
        console.log(res)
        console.log(res2)

        /* Store all data in redux */
        dispatch(setFormCode(res2.data.code));
        dispatch(setFormCreator(res2.data.creator));
        dispatch(setFormTitle(res2.data.title));
        const dummyQuestion = [];
        for(let i in res2.data.questions){
            dummyQuestion.push({});
            dummyQuestion[i].questionText = res2.data.questions[i].question;
            dummyQuestion[i].answerKey = res2.data.questions[i].answer_key;
            dummyQuestion[i].required = res2.data.questions[i].required;
            dummyQuestion[i].points = res2.data.questions[i].score;
            if(res2.data.questions[i].question_type === "multiple choice") dummyQuestion[i].questionType = "radio"; 
            dummyQuestion[i].options = [];
            for(let j in res2.data.questions[i].choices){
                dummyQuestion[i].options.push({});
                dummyQuestion[i].options[j].optionText = res2.data.questions[i].choices[j].choice;
                dummyQuestion[i].options[j].id = res2.data.questions[i].choices[j].id;
                dummyQuestion[i].options[j].isAnswer = res2.data.questions[i].choices[j].is_answer;
            }
        }
        console.log(dummyQuestion);
        dispatch(setQuestions(dummyQuestion));
        // dispatch(set)

        /***************************/

        navigate(`/form/${res.data.code}/edit` , {formCode : res.data.code});
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