import { Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { passwordSchema } from "../../schemas";
import { setNewPassword } from "../../config/apiCalls";
import { useNavigate } from "react-router-dom";

const initialValues = {
    password: "",
    confirmPassword: "",
  };
const ResetPassword = ({uibd , token}) => {
    const navigate = useNavigate();
    const { values, errors, handleBlur, handleChange, handleSubmit , touched } = useFormik({
        initialValues: initialValues,
        validationSchema: passwordSchema,
        onSubmit: async (values) => {
          console.log(uibd , token);
          const res = await setNewPassword(values.password , token , uibd);
          if(res === true){
            navigate('/');
          }
        },
      });
    
  return (
    <VStack spacing="5px">
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
      <Button
        onClick={handleSubmit}
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
      >
        Submit
      </Button>
    </VStack>
  );
};

export default ResetPassword;
