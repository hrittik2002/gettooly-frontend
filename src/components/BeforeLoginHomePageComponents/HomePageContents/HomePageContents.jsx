import React from 'react'
import styles from './HomePageContents.module.css'
import banner from '../../../assets/images/banner.svg'
import features from '../../../assets/images/features.svg'
import { Link } from 'react-router-dom'
import Animation1 from '../../../assets/animations/ani1.json'
import Animation2 from '../../../assets/animations/quizAni.json'
import WhyUsAnimation from '../../../assets/animations/whyUs.json'
import Lottie from "lottie-react";

const HomePageContents = () => {
  return (
    <div className={styles.container}>
            <div className={styles.contentLeft}>
                <div className={styles.heading}>
                <h1>Create, Share <span>forms</span> easily</h1>
                </div>
                <div className={styles.font}>
                <p>99Types is an online platform that allows users to create and share forms with ease. The website offers a simple and user-friendly interface that allows users to create various types of forms, including MCQ exams and job recruitment forms. With a free account, users can create and customize their forms, and easily share the link with others to gather responses.</p>
                </div>
                <div>
                <Link to="" className={styles.btn}>get started</Link>
                </div>
                
            </div>
            <div className={styles.contentRight}>
            <Lottie animationData={WhyUsAnimation} style={{
                height : "100%",
                width : "100%",
                zIndex : 1,
            }}/>
            </div>
    </div>
  )
}

export default HomePageContents

/*
 <div className={styles.section}>
            <div className={styles.content}>
                <h1>Why choose us</h1>
                <p>
                    <span className={styles.li}>Easy to use</span>
                    <span className={styles.li}>100% free</span>
                    <span className={styles.li}>Share with friends</span>
                    <span className={styles.li}>No login required for submitting form</span>
                    <span className={styles.li}>Supports media file</span>
                </p>
            </div>
            
            <Lottie animationData={WhyUsAnimation} style={{
                height : "100%",
                width : "50%",
            }}/>
        </div>

*/