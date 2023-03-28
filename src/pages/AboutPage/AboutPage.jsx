import React from "react";
import SideNavbar from "../../components/SideNavbar/SideNavbar";
import styles from "./AboutPage.module.css";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { CheckIcon , CloseIcon } from '@chakra-ui/icons'
const AboutPage = () => {
  const userData = useSelector((state) => state.user.currentUser);
  return (
    <div style={{ display: "flex" }}>
      <SideNavbar />
      <div className={styles.parent}>
        <Box display="flex" width="100%" justifyContent="center" marginTop="2%">
          <Image
            borderRadius="full"
            boxSize="150px"
            src={
              userData.profile_photo ? userData.profile_photo : "https://bit.ly/dan-abramov"
            }
            alt="Dan Abramov"
          />
        </Box>
        <Box
          display="flex"
          width="100%"
          justifyContent="center"
          marginTop="1%"
          fontSize="xl"
        >
          <Text>{userData.name}</Text>
        </Box>
        {/* Location */}
        <Box paddingLeft="20%" paddingRight="20%" marginTop="2%">
          <Heading as="h4" size="md">
            Location Details
          </Heading>
          <Box display="flex" marginTop="1%">
            <Box flex="1">
              <Text><b>city :</b> {userData.city}</Text>
              <Text><b>pin code :</b> {userData.pin}</Text>
            </Box>
            <Box flex="1">
              <Text><b>state :</b> {userData.state}</Text>
            </Box>
          </Box>
        </Box>
        {/* Contact Details */}
        <Box paddingLeft="20%" paddingRight="20%" marginTop="3%">
          <Heading as="h4" size="md">
            Contact Details
          </Heading>
          <Box display="flex" marginTop="1%">
            <Box flex="1">
              <Text><b>email : </b>{userData.email}</Text>
            </Box>
            <Box flex="1">
              <Text><b>phone Number :</b> {userData.phone_number}</Text>
            </Box>
          </Box>
        </Box>
         {/* Verification Status */}
         <Box paddingLeft="20%" paddingRight="20%" marginTop="3%">
          <Heading as="h4" size="md">
            Verification Status
          </Heading>
          <Box display="flex" marginTop="1%">
            <Box flex="1">
              <Text><b>Is Email Verified :   </b>{userData.is_email_verified ? <CheckIcon  color="green"/> : <CloseIcon color="red.500"/>}</Text>
            </Box>
            <Box flex="1">
              <Text ><b>Is Phone Number Verified:</b>   {userData.is_phone_verified ? <CheckIcon  color="green"/> : <CloseIcon  color="red.500"/>}</Text>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default AboutPage;
