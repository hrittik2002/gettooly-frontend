import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const RegisterByUser = () => {
  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input placeholder="Enter your email" type="email" />
      </FormControl>

      <HStack width="100%">
        <FormControl id="first-name" isRequired>
          <FormLabel>First Name</FormLabel>
          <Input placeholder="Enter your First Name" type="text" />
        </FormControl>
        <FormControl id="last-name" isRequired>
          <FormLabel>Last Name</FormLabel>
          <Input placeholder="Enter your Last Name" type="text" />
        </FormControl>
      </HStack>

      <FormControl id="phone-number" isRequired>
        <FormLabel>Phone Number</FormLabel>
        <Input placeholder="Enter your Phone Number" type="number" />
      </FormControl>
      <HStack width="100%">
        <FormControl id="state" isRequired>
          <FormLabel>State</FormLabel>
          <Input placeholder="Enter your State" type="text" />
        </FormControl>
        <FormControl id="city" isRequired>
          <FormLabel>City</FormLabel>
          <Input placeholder="Enter your City" type="text" />
        </FormControl>
      </HStack>
      <HStack width="100%">
      <FormControl id="pin" isRequired>
        <FormLabel>Pin</FormLabel>
        <Input placeholder="Enter your Pin-code" type="number" />
      </FormControl>
      <FormControl>
        <FormLabel>Gender</FormLabel>
        <Select placeholder="Select Gender">
          <option>Male</option>
          <option>Female</option>
        </Select>
      </FormControl>
      </HStack>
      
      <HStack width="100%">
      <FormControl id="DOB" isRequired>
        <FormLabel>Date Of Birth</FormLabel>
        <Input placeholder="Enter your DOB" type="text" />
      </FormControl>
      <FormControl id="country" isRequired>
        <FormLabel>Country</FormLabel>
        <Input placeholder="Enter your Country" type="country" />
      </FormControl>
      </HStack>
      
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input placeholder="Enter your Passowrd" type="password" />
      </FormControl>
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input placeholder="Enter your Confirm Password" type="password" />
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          // onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
    </VStack>
  );
};

export default RegisterByUser;
