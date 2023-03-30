import React from "react";
import SideNavbar from "../../components/SideNavbar/SideNavbar";
import styles from "./AboutPage.module.css";
import { Box, Button, FormControl, FormLabel, Heading, Image, Switch, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import UpdateProfile from "../../components/UpdateProfile/UpdateProfile";
import { logout } from "../../config/Cookie";
import { useNavigate } from "react-router-dom";
const AboutPage = () => {
  const navigate = useNavigate();
  const [settings , setSettings] = useState(false);
  const userData = useSelector((state) => state.user.currentUser);
  const handleSwitch=()=>{
    setSettings(!settings);
  }
  const closeSettings = () => {
    setSettings(false);
  }
  const logoutHandler = () => {
    logout();
    navigate("/");
  }
  return (
    <div style={{ display: "flex"}} className={styles.parentComponent}>
      <SideNavbar />
      
      {settings ? 
      <UpdateProfile closeSettings={closeSettings}/> 
      :
      (<div className={styles.parent}>
        <Box display="flex" width="100%" justifyContent="center" marginTop="2%">
          <Image
            borderRadius="full"
            boxSize="150px"
            src={
              userData.profile_photo
                ? userData.profile_photo
                : "https://bit.ly/dan-abramov"
            }
            alt="Dan Abramov"
          />
        </Box>
        <Box
          display="flex"
          width="100%"
          justifyContent="center"
          marginTop="0.5%"
          fontSize="xl"
        >
          <Text>{userData.name}</Text>
        </Box>
        { /* Update profile switch*/ }
        <FormControl 
          display="flex"
          width="100%"
          justifyContent="center"
          marginTop="0.5%"
          alignItems="center"
        >
          <FormLabel textTransform="uppercase" paddingRight="1%">Update Profile</FormLabel>
          <Switch id='email-alerts' onChange={()=>{handleSwitch()}}/>
          <Button onClick={logoutHandler}>Logout</Button>
        </FormControl>
        {/* Location */}
        <Box paddingLeft="20%" paddingRight="20%" marginTop="1%">
          <Heading as="h4" size="md" marginBottom="2%">
            Location Details
          </Heading>
          <Box
            display="flex"
            marginTop="1%"
            className={styles.contentContainer}
          >
            <Box flex="1">
              <Text>
                <b>city :</b> {userData.city}
              </Text>
            </Box>
            <Box flex="1">
              <Text>
                <b>pin code :</b> {userData.pin}
              </Text>
            </Box>

            <Box flex="1">
              <Text>
                <b>state :</b> {userData.state}
              </Text>
            </Box>
          </Box>
        </Box>
        {/* Contact Details */}
        <Box paddingLeft="20%" paddingRight="20%" marginTop="3%" >
          <Heading as="h4" size="md" marginBottom="2%">
            Contact Details
          </Heading>
          <Box
            display="flex"
            marginTop="1%"
            className={styles.contentContainer}
          >
            <Box flex="1">
              <Text>
                <b>email : </b>
                {userData.email}
              </Text>
            </Box>
            <Box flex="1">
              <Text>
                <b>phone Number :</b> {userData.phone_number}
              </Text>
            </Box>
          </Box>
        </Box>
        {/* Verification Status */}
        <Box paddingLeft="20%" paddingRight="20%" marginTop="3%">
          <Heading as="h4" size="md" marginBottom="2%">
            Verification Status
          </Heading>
          <Box
            display="flex"
            marginTop="1%"
            className={styles.contentContainer}
          >
            <Box flex="1">
              <Text>
                <b>Is Email Verified : </b>
                {userData.is_email_verified ? (
                  <CheckIcon color="green" />
                ) : (
                  <>
                  <CloseIcon color="red.500" />
                  <Text>verity email</Text>
                  </>
                )}
              </Text>
            </Box>
            <Box flex="1">
              <Text>
                <b>Is Phone Number Verified:</b>{" "}
                {userData.is_phone_verified ? (
                  <CheckIcon color="green" />
                ) : (
                  <CloseIcon color="red.500" />
                )}
              </Text>
            </Box>
          </Box>
        </Box>
      </div>
  )}
    </div>
  );
};

export default AboutPage;
