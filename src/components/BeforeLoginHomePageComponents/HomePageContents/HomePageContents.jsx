import React from 'react'
import styles from './HomePageContents.module.css'
import banner from '../../../assets/images/banner.svg'
import features from '../../../assets/images/features.svg'
import { Link, useNavigate } from 'react-router-dom'
import Animation1 from '../../../assets/animations/ani1.json'
import Animation2 from '../../../assets/animations/quizAni.json'
import WhyUsAnimation from '../../../assets/animations/whyUs.json'
import Lottie from "lottie-react";
import { useSelector } from 'react-redux'
import { useToast } from '@chakra-ui/react'

const HomePageContents = () => {
    const userData = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    const toast = useToast()
    const handleClickListner = () => {
        console.log(userData)
        if(!userData){
            toast({
                title: 'Login First',
                description: "Login to your account. If you dont have an account create a new one",
                status: 'info',
                duration: 3000,
                isClosable: true,
              })
        }
        else{
            navigate(`/ConductUser/${userData.id}`)
        }
        console.log("hola")
    }
  return (
    <div className={styles.container}>
            <div className={styles.contentLeft}>
                <div className={styles.heading}>
                <h1>Create, Share <span>quiz</span> easily</h1>
                </div>
                <div className={styles.font}>
                <p>99Types is a user-friendly website for easy quiz creation and simple pie chart surveys. Create quizzes effortlessly and analyze data with visually appealing pie charts. Perfect for educators, researchers, and quick insights.</p>
                </div>
                <div>
                <button onClick={()=>{handleClickListner()}} className={styles.btn}>get started</button>
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