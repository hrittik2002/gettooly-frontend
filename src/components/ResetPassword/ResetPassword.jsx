import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { passwordSchema } from "../../schemas";
import { setNewPassword } from "../../config/apiCalls";
import { useNavigate } from "react-router-dom";
import styles from "./ResetPassword.module.css";
const initialValues = {
  password: "",
  confirmPassword: "",
};
const ResetPassword = ({ uibd, token }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const showToast = (title, status) => {
    toast({
      title: `${title}`,
      status: `${status}`,
      duration: 9000,
      isClosable: true,
    });
  };
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: passwordSchema,
      onSubmit: async (values) => {
        console.log(uibd, token);
        const res = await setNewPassword(values.password, token, uibd);
        if (res === true) {
          showToast("Password Succesfully Updated", "success");
          navigate("/");
        } else {
          showToast("Password Reset Failed", "error");
        }
      },
    });

  return (
    <div className={styles.passwordSetForm}>
      <h2>Set Your Password</h2>

      <div>
        <FormControl className={styles.formGroup} id="password" isRequired>
          <FormLabel className={styles.label}>Password</FormLabel>
          <Input
            placeholder="Enter your Passowrd"
            type="password"
            name="password"
            value={values.password}
            className={styles.input}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password ? (
            <p style={{ color: "red" }}>{errors.password}</p>
          ) : null}
        </FormControl>
        <FormControl
          className={styles.formGroup}
          id="confirmPassword"
          isRequired
        >
          <FormLabel className={styles.label}>Confirm Password</FormLabel>
          <Input
            placeholder="Enter your Confirm Password"
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            className={styles.input}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.confirmPassword && touched.confirmPassword ? (
            <p style={{ color: "red" }}>{errors.confirmPassword}</p>
          ) : null}
        </FormControl>
        <Button
          onClick={handleSubmit}
          backgroundColor="rgb(6, 185, 6)"
          color="white"
          width="100%"
          style={{ marginTop: 15 }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
