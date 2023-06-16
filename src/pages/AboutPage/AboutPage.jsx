import React from "react";
import styles from "./AboutPage.module.css";
import {

  Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useState } from "react";
import UpdateProfile from "../../components/UpdateProfile/UpdateProfile";
import { logout } from "../../config/Cookie";
import { useNavigate } from "react-router-dom";
import { emailVerification } from "../../config/apiCalls";
import { useToast } from "@chakra-ui/react";
import SideNavbar2 from "../../components/SideNavbar2/SideNavbar2";
import EmailIcon from "@mui/icons-material/Email";


const AboutPage = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(false);
  const toast = useToast();
  const userData = useSelector((state) => state.user.currentUser);
  const handleSwitch = () => {
    setSettings(!settings);
  };
  const closeSettings = () => {
    setSettings(false);
  };
  const logoutHandler = () => {
    logout();
    navigate("/");
  };
  const verifyEmail = async () => {
    console.log("helllooo");
    const res = await emailVerification();
    if (res.success) {
      toast({
        title: "Check Your Email",
        description: "A verification email has been sent to your gmail account",
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <div>
      <SideNavbar2 />

      {settings ? (
        <UpdateProfile closeSettings={closeSettings} />
      ) : (
        <div className={styles.container}>
          <img
            className={styles.profilePic}
            src={
              userData.profile_photo
                ? userData.profile_photo
                : "https://www.debugpoint.com/wp-content/uploads/2021/04/Debian-10-Buster-wallpaper-2560x1080-1.png"
            }
            alt="Profile Picture"
          />
          <div className={styles.editBtnContainer}>
          <button
            className={styles.editButton}
            onClick={() => {
              handleSwitch();
            }}
          >
            Edit About
          </button>
          </div>
          <div className={`${styles.section} ${styles.location}`}>
            <h2 className={styles.sectionHeading}>Location Details</h2>
            <p>City: {userData.city}</p>
            <p>Pin Code: {userData.pin}</p>
            <p>State: {userData.state}</p>
          </div>
          <div className={`${styles.section} ${styles.contact}`}>
            <h2 className={styles.sectionHeading}>Contact Details</h2>
            <p>Email: {userData.email}</p>
            <p>Phone: {userData.phone_number}</p>
          </div>
          <div className={`${styles.section} ${styles.verified}`}>
            <h2 className={styles.sectionHeading}>Verification Status</h2>
            {userData.is_email_verified ? (
              <p>Email Verified: Yes</p>
            ) : (
              <>
                <p style={{ color: "red" }}>Email Verified: NO</p>
                <Button onClick={verifyEmail} className={styles.verifyButton}>
                  <EmailIcon />
                  Verify Email
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
