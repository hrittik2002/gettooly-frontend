import React from "react";
import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import styles from './Login.module.css'
const Login = ({ closeDialogForLogin }) => {
  return (
    <>
    
      <div className={styles.dialogWrapper} onClick={closeDialogForLogin}></div>
      <div className={styles.dialogContainer}>
        <VStack spacing="5px">
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input placeholder="Enter your email" type="email" />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input placeholder="Enter your Passowrd" type="password" />
          </FormControl>
        </VStack>
      </div>
    </>
  );
};

export default Login;
