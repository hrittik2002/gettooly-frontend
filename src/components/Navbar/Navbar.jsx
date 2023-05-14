import React from "react";
import styles from "./Navbar.module.css";
import { useState } from "react";
import Register from "../Register/Register";
import { Button } from "@chakra-ui/react";
import Login from "../Login/Login";
import { Link } from "react-router-dom";

const Navbar = ({location}) => {
  const [showDialogForRegister, setShowDialogForRegister] = useState(false);
  const [showDialogForLogin, setShowDialogForLogin] = useState(false);
  const closeDialog = () => {
    setShowDialogForRegister(false);
  };
  const closeDialogForLogin = () => {
    setShowDialogForLogin(false);
  };
  const user = false;
  return (
    <>
      <div className={styles.parentContainer}>
        <div className={styles.logo}>99Types</div>
        <div className={styles.btnContainer}>
          <div className={styles.loginBtnContainer}>
            <button  className={styles.loginBtn} onClick={() => setShowDialogForLogin(true)}>Login</button>
          </div>
          <div className={styles.registerBtnContainer}>
            <button className={styles.registerBtn} onClick={() => setShowDialogForRegister(true)}>
              Register
            </button>
          </div>
        </div>
      </div>
      {showDialogForRegister && <Register closeDialog={closeDialog} />}
      {showDialogForLogin && (
        <Login closeDialogForLogin={closeDialogForLogin} location={location}/>
      )}
    </>
  );
};

export default Navbar;
