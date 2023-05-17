import React from "react";
import { Box } from "@chakra-ui/react";
import Lottie from "lottie-react";
import paymentSuccess from '../../assets/animations/paymentSuccess.json'

const PaymentSuccess = () => {
 
  return (
    <Box
      width="100%"
      height="90vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Lottie animationData={paymentSuccess} style={{
                height : "35%",
                width : "35%",
                zIndex : 1,
            }}/>
    </Box>
  )
};

export default PaymentSuccess;
