import React from "react";
import Lottie from "lottie-react";
import styles from "./ExamStartPage.module.css";
import examAni from "../../assets/animations/exam.json";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const ExamStartPage = () => {
    const {formCode} = useParams();
    const [email , setEmail] = useState('');
    const navigate = useNavigate();
    const startExamHandler =() => {
        navigate(`/form/${formCode}/view`,  { state : { email : email } });
    }
  return (
    <div className={styles.container}>
      <div className={styles.emailInput}>
        <div className={styles.examTitle}>Exam Title</div>
        <div className={styles.examDesc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error tenetur
          officiis aut minus nemo qui illum temporibus sit facere atque! Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Rem sed est omnis
          doloremque in impedit dignissimos exercitationem et blanditiis quis.
        </div>
        <div className={styles.examContainer}>
          <input type="email" placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}} className={styles.inputEmail}/>
          <button type="submit" className={styles.startBtn} onClick={startExamHandler}>start</button>
        </div>
      </div>
      <div className={styles.pictureContainer}>
        <Lottie
          animationData={examAni}
          style={{
            height: "70%",
            width: "70%",
            zIndex: 1,
          }}
        />
      </div>
    </div>
  )
}

export default ExamStartPage