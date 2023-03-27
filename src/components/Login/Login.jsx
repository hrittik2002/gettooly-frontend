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

const initialValues = {
  email: "",
  password: "",
};

const Login = ({ closeDialogForLogin }) => {
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values);
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
