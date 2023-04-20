import React from "react";
import styles from "./PasswordChangePage.module.css";
import SideNavbar from "../../components/SideNavbar/SideNavbar";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { passwordChangeSchema } from "../../schemas";
import { changePassword } from "../../config/apiCalls";
import { useSelector } from "react-redux";
import { useToast } from '@chakra-ui/react'
import SideNavbar2 from "../../components/SideNavbar2/SideNavbar2";
const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
const PasswordChangePage = () => {
    const userData = useSelector((state) => state.user.currentUser);
    const toast = useToast();
    const showToast = (title , description , status) => {
      toast({
        title: `${title}`,
        description: `${description}`,
        status: `${status}`,
        duration: 9000,
        isClosable: true,
      })
    }
    const { values, errors, handleBlur, handleChange, handleSubmit , touched } = useFormik({
        initialValues: initialValues,
        validationSchema: passwordChangeSchema,
        onSubmit: async (values) => {
          console.log(values);
          const formData = new FormData();
          formData.append("old_password", values.oldPassword);
          formData.append("password", values.newPassword);
          formData.append("password2", values.confirmPassword);
          const res = await changePassword(formData , userData.id);
          if(res === true){
            showToast(
              "Password Changed",
              "Your password has been changed",
              "success",
            )
          }
          else{
            showToast(
              "Password Not Changed",
              "Your password has not been changed",
              "error",
            )
          }
        },
      });
  return (
    <div >
      <SideNavbar2 />
    <Box marginTop="5%" display="flex" flexDirection="column" width="100%" alignItems="center">
      <Box display="flex" justifyContent="center" width="50%">
        <Heading textTransform="uppercase">Change Password</Heading>
      </Box>
      <VStack textTransform="uppercase" marginTop="3%"  spacing="15px" width="50%">
        <FormControl id="oldPassword" isRequired>
          <FormLabel>Old Password</FormLabel>
          <Input
            placeholder="Enter your Old Password"
            type="password"
            name="oldPassword"
            value={values.oldPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.oldPassword && touched.oldPassword ? (<p style={{color : "red"}}>{errors.oldPassword}</p>) : null}
        </FormControl>

        <FormControl id="newPassword" isRequired>
          <FormLabel>New Password</FormLabel>
          <Input
            placeholder="Enter your New Password"
            type="password"
            name="newPassword"
            value={values.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.newPassword && touched.newPassword ? (<p style={{color : "red"}}>{errors.newPassword}</p>) : null}
        </FormControl>
        <FormControl id="confirmPassword" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            placeholder="Enter your Confirm Password"
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.confirmPassword && touched.confirmPassword ? (<p style={{color : "red"}}>{errors.confirmPassword}</p>) : null}
        </FormControl>

        <button
          className={styles.button}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </VStack>
    </Box>
    </div>
  );
};

export default PasswordChangePage;
