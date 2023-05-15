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
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import styles from "./Login.module.css";
import { loginSchema } from "../../schemas";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../config/apiCalls";
import { color } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getUserId, getUserType, logout } from "../../config/Cookie";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import { setUserType } from "../../redux/usertypeSlice";
import { Spinner } from '@chakra-ui/react'
const initialValues = {
  email: "",
  password: "",
};



const Login = ({ closeDialogForLogin, location }) => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading , setLoading] = useState(false);

  const showToast = (title , description , status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  }


  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        setLoading(true);
        console.log(values);
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);

        const userId = await login(dispatch, formData);

        console.log(userId);

        if(userId === "error"){
          setLoading(false);
          showToast("Login Failed" , "Wrong Credentials" , "error")
          return;
        }
        const userType = await getUserType();
        
        console.log(location);
        if (
          userType === 2 &&
          location &&
          location.state &&
          location.state.from &&
          location.state.from === "formViewPage" &&
          location.state.formCode
        ) {
          setLoading(false);
          showToast("Successfully login" , "" , "success")
          navigate(`/form/${location.state.formCode}/view`);
          return;
        } else {
          if (userType === 1) {
            setLoading(false);
            showToast("Successfully login" , "" , "success")
            navigate(`ConductUser/${userId}`);
          } else {
            setLoading(false);
            showToast("Successfully login" , "" , "success")
            navigate(`/User/${userId}/dashboard`);
          }
        }
      },
    });
  return (
    <>
      {forgotPassword ? (
        <ForgotPassword closeDialogForLogin={closeDialogForLogin} />
      ) : (
        <>
          <div
            className={styles.dialogWrapper}
            onClick={closeDialogForLogin}
          ></div>
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
                {errors.email && touched.email ? (
                  <p style={{ color: "red" }}>{errors.email}</p>
                ) : null}
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
                {errors.password && touched.password ? (
                  <p style={{ color: "red" }}>{errors.password}</p>
                ) : null}
              </FormControl>
              <Button
                onClick={handleSubmit}
                backgroundColor="rgb(6, 185, 6)"
                color="white"
                width="100%"
                style={{ marginTop: 15 }}
              >
                {!loading?
        "Login"
        :
        <Spinner />
        }
                
              </Button>
            </VStack>
            <Text
              onClick={() => {
                setForgotPassword(true);
              }}
            >
              Forgot Password?
            </Text>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
