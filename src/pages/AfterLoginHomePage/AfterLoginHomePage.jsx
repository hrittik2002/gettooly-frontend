import React, { useEffect } from 'react'
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import HomeBody from '../../components/HomeBody/HomeBody'
import { getCoductUserData } from '../../config/apiCalls';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setUserData} from '../../redux/userSlice'
import { Box } from '@chakra-ui/react';
import Template from '../../components/Template/Template';

const AfterLoginHomePage = () => {
    const {userId} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        const getUserData = async () => {
          const data = await getCoductUserData(userId);
          return data;
        }
        
        getUserData().then(userData => {
          dispatch(setUserData(userData));
        });
      }, []);
  return (
    <div style={{display : "flex"}}>
        <SideNavbar />
        <Box width='100%'>
          <Template/>
          <HomeBody />
        </Box>
    </div>
  )
}

export default AfterLoginHomePage