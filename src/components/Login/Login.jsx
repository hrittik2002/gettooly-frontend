import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import styles from "./Login.module.css";
import { loginSchema } from "../../schemas";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { login } from "../../config/apiCalls";
import { color } from "framer-motion";

const initialValues = {
  email: "",
  password: "",
};

const Login = ({ closeDialogForLogin }) => {
  const dispatch = useDispatch()
  const { values, errors, handleBlur, handleChange, handleSubmit , touched } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
        login(dispatch , formData);
      // try{
      //   const { data } = await axios.post(
      //     "http://localhost:8000/api/auth/login/token/", 
      //     formData,
      //     // headers: { "Content-Type": "multipart/form-data" }
      //   )
      //     console.log(data);
      // }
      // catch(err){
      //   console.log(err);
      // }
    },
  });
  return (
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
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
          >
            Login
          </Button>
        </VStack>
      </div>
    </>
  );
};

export default Login;
