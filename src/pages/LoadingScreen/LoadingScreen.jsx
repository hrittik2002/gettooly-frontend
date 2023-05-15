import { Box, Spinner } from "@chakra-ui/react";
import React from "react";
import Lottie from "lottie-react";
import loadingAni from "../../assets/animations/loadingAni.json"
const LoadingScreen = () => {
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Lottie animationData={loadingAni} style={{
                height : "35%",
                width : "35%",
                zIndex : 1,
            }}/>
    </Box>
  );
};

export default LoadingScreen;
