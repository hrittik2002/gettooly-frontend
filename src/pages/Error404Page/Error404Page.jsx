import React from 'react'
import { Box, Spinner } from "@chakra-ui/react";
import errIcn from "../../assets/animations/404error.json"
import Lottie from "lottie-react";

const Error404Page = () => {
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
}

export default Error404Page