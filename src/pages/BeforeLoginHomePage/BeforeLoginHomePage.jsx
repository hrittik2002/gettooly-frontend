import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HomePageContents from "../../components/BeforeLoginHomePageComponents/HomePageContents/HomePageContents";
import SideNavbar2 from "../../components/SideNavbar2/SideNavbar2";

const BeforeLoginHomePage = ({ userData }) => {
  return (
    <>
      {userData ? <SideNavbar2 /> : <Navbar />}

      <HomePageContents />
    </>
  );
};

export default BeforeLoginHomePage;
