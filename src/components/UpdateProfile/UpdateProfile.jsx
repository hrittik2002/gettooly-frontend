import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import { updateConductUserData } from "../../config/apiCalls";
import { setUserData } from "../../redux/userSlice";


  
const UpdateProfile = ({closeSettings}) => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.currentUser);
    const [pic , setPic] = useState(userData.profile_photo);
    const p = userData.phone_number.toString();
    console.log(userData.profile_photo);

   // console.log(pic);
    const initialValues = {
        name: userData.name,
        phoneNumber: p,
        city: userData.city,
        state: userData.state,
        country: userData.country,
        pin: userData.pin,
    };
    const poastDetails = async (e) => {
        setPic([...pic, ...Array.from(e.target.files)]);
      };
    
      useEffect(() => {
        console.log(pic[pic.length - 1]);
      }, [pic]);

    const { values, errors, handleBlur, handleChange, handleSubmit , touched } = useFormik({
        initialValues,
        onSubmit : async(value)=>{
            console.log(value);
            const formData = new FormData();
            formData.append("city", values.city);
            formData.append("country", values.country);
            formData.append("name", values.name);
            formData.append("phone_number", values.phoneNumber);
            formData.append("pin", values.pin);
            formData.append("state", values.state);
            formData.append("profile_photo", pic[pic.length - 1]);
            //console.log(pic);
            const data = await updateConductUserData(userData.id , formData);
            //console.log(data);
            dispatch(setUserData(data));
        }
    })
    

  return (
    <Box display="flex" flexDirection="column" width="100%" alignItems="center">
        <Box width="50%">
        <Heading>Update Profile</Heading>
        </Box>
      <VStack spacing="5px"  width="50%">
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Enter your email" type="text" name="name" value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}/>
        </FormControl>
        <FormControl id="phoneNumber" isRequired>
          <FormLabel>Phone Number</FormLabel>
          <PhoneInput placeholder="Enter your Phone Number" value={values.phoneNumber}
          style={{width : "30%" , border : "1px solid skyblue" , borderRadius : "2px" , padding : "0.5%"}}
          international
              onChange={handleChange}
/>
        </FormControl>
        <FormControl id="city" isRequired>
          <FormLabel>City</FormLabel>
          <Input placeholder="Enter your City" type="text" name="city" value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}/>
        </FormControl>
        <FormControl id="state" isRequired>
          <FormLabel>State</FormLabel>
          <Input placeholder="Enter your State" type="text" name="state" value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}/> 
        </FormControl>
        <FormControl id="country" isRequired>
          <FormLabel>Country</FormLabel>
          <Input placeholder="Enter your Country" type="text" name="country" value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}/>
        </FormControl>
        <FormControl id="pin" isRequired>
          <FormLabel>Pin Code</FormLabel>
          <Input placeholder="Enter your Pin Code" type="number" name="pin" value={values.pin}
              onChange={handleChange}
              onBlur={handleBlur}/>
        </FormControl>
        <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={poastDetails}
        />
      </FormControl>
      <HStack 
        width="100%"
      >
      <Button
        colorScheme="green"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
      >
        Update Profile
      </Button>
      <Button
      colorScheme="blue"
      width="100%"
      style={{ marginTop: 15 }}
      onClick={closeSettings}>
        Back
      </Button>

      </HStack>
      
      </VStack>
    </Box>
  );
};

export default UpdateProfile;
