import { Button, FormControl, FormLabel, Input, VStack, useToast } from '@chakra-ui/react'
import React from 'react'
import styles from './ForgotPassword.module.css';
import { forgotPasswordSchema } from '../../schemas';
import { useFormik } from 'formik';
import { requestPasswordReset } from '../../config/apiCalls';

const initialValues = {
    email: "",
};
const ForgotPassword = ({closeDialogForLogin}) => {
    const toast = useToast();
    const showToast = (title , description) =>{
        toast({
            title: `'Check Your Email'`,
            description: "Password reset link to your email",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
    }
    const { values, errors, handleBlur, handleChange, handleSubmit , touched } = useFormik({
        initialValues: initialValues,
        validationSchema: forgotPasswordSchema,
        onSubmit: async (values) => {
          console.log(values);
            const data = await requestPasswordReset(values.email);
            console.log(data);
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
          <Button
            onClick={handleSubmit}
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
          >
            Send Email
          </Button>
          </VStack>
          </div>
          
        </>
  )
}

export default ForgotPassword