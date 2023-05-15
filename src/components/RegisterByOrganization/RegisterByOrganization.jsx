import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { registerByOrganizationSchema } from "../../schemas";
import { registerOrganization } from "../../config/apiCalls";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const initialValues = {
  email: "",
  name: "",
  // phoneNumber: "",
  state: "",
  city: "",
  pin: "",
  gender: "",
  country: "",
  password: "",
  confirmPassword: "",
};
const RegisterByOrganization = ({closeDialog}) => {
  const [pic, setPic] = useState([]);
  const [loading , setLoading] = useState(false);
  const toast = useToast();
  const [phoneNumber , setPhoneNumber] = useState();
  const [phoneNumberError , setPhoneNumberError] = useState('');
  const poastDetails = async (e) => {
    setPic([...pic, ...Array.from(e.target.files)]);
  };

  useEffect(() => {
    console.log(pic);
  }, [pic]);

  const showToast = (title , description , status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  }

  const { values, errors, handleBlur, handleChange, handleSubmit , touched } = useFormik({
    initialValues: initialValues,
    validationSchema: registerByOrganizationSchema,
    onSubmit: async (values) => {
      //console.log(values);
      setLoading(true);
      const formData = new FormData();
      formData.append("type", 1);
      formData.append("email", values.email);
      formData.append("name", values.name);
      formData.append("phone_number", phoneNumber); 
      formData.append("state", values.state);
      formData.append("city", values.city);
      formData.append("pin", values.pin);
      formData.append("gender", values.gender);
      formData.append("profile_photo", pic[0]);
      formData.append("country", values.country);
      formData.append("password", values.password);
      formData.append("password2", values.confirmPassword);
      if(!phoneNumber || phoneNumber.length === 0){
        setPhoneNumberError("Phone Number field cannot be empty")
        return;
      }
      const responseData = await registerOrganization(formData);
      console.log(phoneNumber)
      
     
      console.log(responseData)
      if(responseData.success === true) {
        showToast("Successfully registered" , responseData.data , "success")
      }
      else{
        showToast("Registration Failed" , responseData.data , "error")
        setLoading(false);
      }
      closeDialog();
      setLoading(false);
    },
  });
  return (
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

      <FormControl id="Name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your Name"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && touched.name ? (<p style={{color : "red"}}>{errors.name}</p>) : null}
      </FormControl>

      <FormControl id="phone-number" isRequired>
        <FormLabel>Phone Number</FormLabel>
        <PhoneInput
        style={{width : "100%" , border : "1px solid skyblue" , borderRadius : "2px" , padding : "0.5%"}}
          placeholder="Enter your Phone Number"
          value={phoneNumber}
          onChange={setPhoneNumber}
          international
          defaultCountry="US"
        />
        {(!phoneNumber || phoneNumber.length === 0) && <p style={{color : "red"}}>{phoneNumberError}</p>}
        {/* {errors.phoneNumber && touched.phoneNumber ? (<p style={{color : "red"}}>{errors.phoneNumber}</p>) : null} */}
      </FormControl>

        <FormControl id="state" isRequired>
          <FormLabel>State</FormLabel>
          <Input
            placeholder="Enter your State"
            type="text"
            name="state"
            value={values.state}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.state && touched.state ? (<p style={{color : "red"}}>{errors.state}</p>) : null}
        </FormControl>
        <FormControl id="city" isRequired>
          <FormLabel>City</FormLabel>
          <Input
            placeholder="Enter your City"
            type="text"
            name="city"
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.city && touched.city ? (<p style={{color : "red"}}>{errors.city}</p>) : null}
        </FormControl>

 
        <FormControl id="pin" isRequired>
          <FormLabel>Pin</FormLabel>
          <Input
            placeholder="Enter your Pin-code"
            type="number"
            name="pin"
            value={values.pin}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.pin && touched.pin ? (<p style={{color : "red"}}>{errors.pin}</p>) : null}
        </FormControl>
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <Select
            placeholder="Select Gender"
            name="gender"
            value={values.gender}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option>Male</option>
            <option>Female</option>
          </Select>
          {errors.gender && touched.gender ? (<p style={{color : "red"}}>{errors.gender}</p>) : null}
        </FormControl>


      <FormControl id="country" isRequired>
        <FormLabel>Country</FormLabel>
        <Input
          placeholder="Enter your Country"
          type="country"
          name="country"
          value={values.country}
          onChange={handleChange}
          onBlur={handleBlur}
        />
         {errors.country && touched.country ? (<p style={{color : "red"}}>{errors.country}</p>) : null}
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
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          //name="pic"
          //value={values.pic}
          onChange={poastDetails}
          //onBlur={handleBlur}
          // onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        backgroundColor="rgb(6, 185, 6)"
        color="white"
        width="100%"
        onClick={handleSubmit}
        style={{ marginTop: 15 }}
      >
        {!loading?
        "Register"
        :
        <Spinner />
        }
      </Button>
    </VStack>
  );
};

export default RegisterByOrganization;
