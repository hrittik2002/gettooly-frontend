import React, { useEffect } from 'react'
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import { getUserId } from '../../config/Cookie';
import { getCoductUserData } from '../../config/apiCalls';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setUserData} from '../../redux/userSlice'

const AfterLoginHomePage = () => {
    const {userId} = useParams();
    const dispatch = useDispatch();
    // console.log(params);
    // useEffect( ()=>{
    //     const getUserData = async() =>{
    //         const data = await getCoductUserData(userId);
    //         console.log(data);//obj
    //         return data;
    //     }
    //     const userData = getUserData();
    //     console.log(userData); // promise
    //     dispatch(setUserData(userData));
        
    // });
    useEffect(() => {
        const getUserData = async () => {
          const data = await getCoductUserData(userId);
          //console.log(data);//obj
          return data;
        }
        
        getUserData().then(userData => {
          dispatch(setUserData(userData));
        });
      }, []);
  return (
    <div style={{display : "flex"}}>
        <SideNavbar />
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias veniam nobis corporis maiores temporibus ratione, suscipit perspiciatis impedit ad sed, animi hic asperiores tenetur ea necessitatibus totam mollitia, illum distinctio?
        </div>
    </div>
  )
}

export default AfterLoginHomePage