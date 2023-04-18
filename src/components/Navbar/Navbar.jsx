import React from "react";
import styles from "./Navbar.module.css";
import { useState } from "react";
import Register from "../Register/Register";
import { Button } from "@chakra-ui/react";
import Login from "../Login/Login";
import { Link } from "react-router-dom";

const Navbar = () => {
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
        <div className={styles.logo}>ABCD</div>
        <div className={styles.btnContainer}>
          <div className={styles.loginBtnContainer}>
            <Button borderRadius="50px" height="47px" className={styles.loginBtn} onClick={() => setShowDialogForLogin(true)}>Login</Button>
          </div>
          <div className={styles.registerBtnContainer}>
            <Button borderRadius="50px" height="47px" className={styles.registerBtn} onClick={() => setShowDialogForRegister(true)}>
              Register
            </Button>
          </div>
        </div>
      </div>
      {showDialogForRegister && <Register closeDialog={closeDialog} />}
      {showDialogForLogin && (
        <Login closeDialogForLogin={closeDialogForLogin} />
      )}
    </>
  );
};

export default Navbar;
