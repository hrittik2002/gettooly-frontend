import React from 'react'
import styles from './HomePageContents.module.css'
import banner from '../../../assets/images/banner.svg'
import features from '../../../assets/images/features.svg'
import { Link } from 'react-router-dom'
import Animation1 from '../../../assets/animations/ani1.json'
import Animation2 from '../../../assets/animations/quizAni.json'
import Lottie from "lottie-react";

const HomePageContents = () => {
  return (
    <div className={`${styles.container} ${styles.main}`}>
        <div className={styles.section}>
            {/* <img src={banner} alt="banner" /> */}
            <Lottie animationData={Animation2} style={{
                height : "100%",
                width : "50%",
                zIndex : 1,
            }}/>
            <div className={styles.content}>
                <h1>Create, Share <span>forms</span> easily</h1>
                <p>Formale lets you create forms super simply. All you need to do is create a free account and you'll be all set. You can share the link of your form with others and see thier submissions. It's suitable for online MCQ exam and for job recruitments</p>
                <Link to="" className={styles.btn}>get started</Link>
            </div>
        </div>
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
            {/* <img src={features} alt="features" /> */}
            <Lottie animationData={Animation1} style={{
                height : "100%",
                width : "50%",
            }}/>
        </div>
    </div>
  )
}

export default HomePageContents