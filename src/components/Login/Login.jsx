import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import styles from "./Login.module.css";
import { loginSchema } from "../../schemas";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { login } from "../../config/apiCalls";
import { color } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getUserId, getUserType } from "../../config/Cookie";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import { setUserType } from "../../redux/usertypeSlice";
const initialValues = {
  email: "",
  password: "",
};

const Login = ({ closeDialogForLogin , location }) => {
  const [forgotPassword , setForgotPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { values, errors, handleBlur, handleChange, handleSubmit , touched } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
        const userId = await login(dispatch , formData);
        const userType = await getUserType();
        // navigate to from View Page
        console.log(location)
        // if(userType === 2 && location && location.state && location.state.from && location.state.from === "formViewPage" && location.state.formCode){
        //   console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" , location.state.formCode)
        //   navigate(`/form/${location.state.formCode}/view`);
        //   return;
        // }
        // else{
        //   if(userType === 1){
        //     navigate(`ConductUser/${userId}`);
        //   }
        //   else{
        //     navigate(`/User/${userId}/dashboard`)
        //   }
        // }
        if(userType === 1){
          navigate(`ConductUser/${userId}`);
        }
        else{
          navigate(`/User/${userId}/dashboard`)
        }
        
        
    },
  });
  return (
    <>
    {
      forgotPassword ? 
      (
        <ForgotPassword closeDialogForLogin={closeDialogForLogin}/>
      ) :
      (
        <>
        <div className={styles.dialogWrapper} onClick={closeDialogForLogin}></div>
      <div className={styles.dialogContainer}>
        <VStack spacing="5px">
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              placeholder="Enter your email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (<p style={{color : "red"}}>{errors.email}</p>) : null}
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Enter your Passowrd"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (<p style={{color : "red"}}>{errors.password}</p>) : null}
          </FormControl>
          <Button
            onClick={handleSubmit}
            backgroundColor="#8700f5"
            color="white"
            width="100%"
            style={{ marginTop: 15 }}
          >
            Login
          </Button>
        </VStack>
        <Text onClick={()=>{setForgotPassword(true)}}>Forgot Password?</Text>
      </div>
      </>
      )
    }
      
    </>
  );
};

export default Login;
