import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import HomePageContents from "../../components/BeforeLoginHomePageComponents/HomePageContents/HomePageContents";
import SideNavbar2 from "../../components/SideNavbar2/SideNavbar2";
import { useLocation } from "react-router-dom";
import { useToast } from '@chakra-ui/react'

const BeforeLoginHomePage = ({ userData }) => {
  const location = useLocation();
  const toast = useToast()
  const checkFormViewPage = () => {
    if(location.state && location.state.from && location.state.from === "formViewPage"){
      toast({
        title: 'Login',
        description: "Login using your User Credentials",
        status: 'error',
        position: 'top',
        duration: 3000,
        isClosable: true,
      })
    }
  }
  useEffect(()=>{
    checkFormViewPage()
  },[location])

  
  console.log(location)
  return (
    <>
      {userData ? <SideNavbar2 /> : <Navbar location={location}/>}
      <HomePageContents />
    </>
  );
};

export default BeforeLoginHomePage;
