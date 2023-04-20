import React from 'react'
import SideNavbar2 from '../components/SideNavbar2/SideNavbar2'
import styles from './Test.module.css'
import EmailIcon from '@mui/icons-material/Email';
import { Button } from '@chakra-ui/react';

const Test = () => {
  return (
    <>
    <SideNavbar2/>
    <div className={styles.container}>
      <img className={styles.profilePic} src="https://www.thestatesman.com/wp-content/uploads/2022/06/TCS.jpg" alt="Profile Picture"/>
      <button className={styles.editButton}>Edit About</button>
      <div className={`${styles.section} ${styles.location}`}>
        <h2 className={styles.sectionHeading}>Location Details</h2>
        <p>City: New York</p>
        <p>Pin Code: 10001</p>
        <p>State: New York</p>
      </div>
      <div className={`${styles.section} ${styles.contact}`}>
        <h2 className={styles.sectionHeading}>Contact Details</h2>
        <p>Email: john@example.com</p>
        <p>Phone: 123-456-7890</p>
      </div>
      <div className={`${styles.section} ${styles.verified}`}>
        <h2 className={styles.sectionHeading}>Verification Status</h2>
        <p>Email Verified: Yes</p>
        <Button className={styles.verifyButton}><EmailIcon/>Verify Email</Button>
      </div>
    </div>
    </>
  )
}

export default Test