import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { registerByUserSchema } from "../../schemas";
import axios from "axios";
import { registerUser } from "../../config/apiCalls";

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
  const [pic, setPic] = useState([]);
  const [loading, setLoading] = useState(false);

  const poastDetails = async (e) => {
    setPic([...pic, ...Array.from(e.target.files)]);
  };

  useEffect(() => {
    console.log(pic);
  }, [pic]);

  const { values, errors, handleBlur, handleChange, handleSubmit , touched } = useFormik({
    initialValues: initialValues,
    validationSchema: registerByUserSchema,
    onSubmit: async (values) => {
      console.log("hiii from r")
      const formData = new FormData();
      formData.append("type", 2);
      formData.append("email", values.email);
      formData.append("first_name", values.firstName);
      formData.append("last_name", values.lastName);
      formData.append("phone_number", "+91" + values.phoneNumber);
      formData.append("state", values.state);
      formData.append("city", values.city);
      formData.append("pin", values.pin);
      formData.append("gender", values.gender);
      formData.append("DOB", values.dob);
      formData.append("profile_photo", pic);
      formData.append("country", values.country);
      formData.append("password", values.password);
      formData.append("password2", values.confirmPassword);
      registerUser(formData);
    },
  });
  // const poastDetails = async(e)=>{
  //   // setPic({"file": e.currentTarget.files[0]);

  //   // console.log(pic);
  // }

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
          {errors.firstName && touched.firstName ? (<p style={{color : "red"}}>{errors.firstName}</p>) : null}
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
          {errors.lastName && touched.lastName ? (<p style={{color : "red"}}>{errors.lastName}</p>) : null}
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
        {errors.phoneNumber && touched.phoneNumber ? (<p style={{color : "red"}}>{errors.phoneNumber}</p>) : null}
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
          {errors.dob && touched.dob ? (<p style={{color : "red"}}>{errors.dob}</p>) : null}
        </FormControl>
        <FormControl id="country" isRequired>
          <FormLabel>Country</FormLabel>
          <Input
            placeholder="Enter your Country"
            type="text"
            name="country"
            value={values.country}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.country && touched.country ? (<p style={{color : "red"}}>{errors.country}</p>) : null}
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
          name="pic"
          onChange={poastDetails}
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
