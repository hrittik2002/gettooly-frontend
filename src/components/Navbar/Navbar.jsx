import React from "react";
import styles from "./Navbar.module.css";
import { useState } from "react";
import Register from "../Register/Register";
import { Button } from "@chakra-ui/react";
import Login from "../Login/Login";

const Navbar = () => {
  const [showDialogForRegister , setShowDialogForRegister] = useState(false);
  const [showDialogForLogin, setShowDialogForLogin] = useState(false);
  const closeDialog = ()=>{
    setShowDialogForRegister(false);
  }
  const closeDialogForLogin = ()=>{
    setShowDialogForLogin(false);
  }
  return (
    <>
    <div className={styles.parentContainer}>
      <div>Logo</div>
      <div>
        <Button onClick={() => setShowDialogForLogin(true)}>Login</Button>
        <Button onClick={() => setShowDialogForRegister(true)}>Register</Button>
      </div>
    </div>
    {showDialogForRegister && < Register closeDialog={closeDialog}/>}
    {showDialogForLogin && < Login closeDialogForLogin={closeDialogForLogin}/>}
    </>
  );
};

export default Navbar;
