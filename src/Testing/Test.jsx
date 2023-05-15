import React from "react";
import SideNavbar2 from "../components/SideNavbar2/SideNavbar2";
import styles from "./Test.module.css";
import { Box, Spinner } from "@chakra-ui/react";
import Lottie from "lottie-react";
import loadingAni from "../assets/animations/loadingAni.json"
import errIcn from "../assets/animations/404error.json"
const Test = () => {
 
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Lottie animationData={errIcn} style={{
                height : "35%",
                width : "35%",
                zIndex : 1,
            }}/>
    </Box>
  )
};

export default Test;
