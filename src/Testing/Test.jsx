import React from "react";
import Lottie from "lottie-react";
import styles from "./Test.module.css";
import examAni from "../assets/animations/exam.json";
const Test = () => {
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
          <input type="email" placeholder="Enter your email" className={styles.inputEmail}/>
          <button type="submit" className={styles.startBtn}>start</button>
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
  );
};

export default Test;
