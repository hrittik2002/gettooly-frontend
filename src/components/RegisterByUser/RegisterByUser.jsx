import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useFormik } from "formik";
import { registerByUserSchema } from "../../schemas";

const initialValues = {
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  state: "",
  city: "",
  pin: "",
  gender: "",
  dob: "",
  country: "",
  password: "",
  confirmPassword: "",
};

const RegisterByUser = () => {
  const [pic , setPic] = useState();
  const [loading, setLoading] = useState(false);

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema : registerByUserSchema,
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      setLoading(false);
    },
  });
  const poastDetails = async(pics)=>{
    setLoading(true);
    if(pics === undefined){
      console.log("Please upload pic");
      setLoading(false);
      return;
    }
    if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
      setPic(pics);
      setLoading(false);
      return;
    }
    else{
      console.log("Something wrong");
      setLoading(false);
      return;
    }
  }
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
      </FormControl>

      <HStack width="100%">
        <FormControl id="first-name" isRequired>
          <FormLabel>First Name</FormLabel>
          <Input
            placeholder="Enter your First Name"
            type="text"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormControl>
        <FormControl id="last-name" isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input
            placeholder="Enter your Last Name"
            type="text"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormControl>
      </HStack>

      <FormControl id="phone-number" isRequired>
        <FormLabel>Phone Number</FormLabel>
        <Input
          placeholder="Enter your Phone Number"
          type="number"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormControl>
      <HStack width="100%">
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
        </FormControl>
      </HStack>
      <HStack width="100%">
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
        </FormControl>
      </HStack>

      <HStack width="100%">
        <FormControl id="DOB" isRequired>
          <FormLabel>Date Of Birth</FormLabel>
          <Input
            placeholder="Enter your DOB"
            type="date"
            name="dob"
            value={values.dob}
            onChange={handleChange}
            onBlur={handleBlur}
          />
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
        </FormControl>
      </HStack>

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
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          name="pic"
          onChange={(e) => poastDetails(e.target.files[0])}
          // value={values.pic}
          // onChange={handleChange}
          // onBlur={handleBlur}
          // onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
      >
        Register
      </Button>
    </VStack>
  );
};

export default RegisterByUser;
