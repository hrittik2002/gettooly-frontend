import { loginFailure , loginStart , loginSuccess } from "../redux/userSlice";
import axios from "axios";
import { authenticate, getCookie, getUserId, setCookie } from "./Cookie";

export const login = async(dispatch , formData) =>{
    dispatch(loginStart()); // start the login process
    try {
        
        const { data } = await axios.post(
            "http://localhost:8000/api/auth/login/token/", 
            formData,
          )
          authenticate(data); // to set the data in the cookie storage
          const ConductUserId = getUserId(); // get the user id from the access token in cookie
          //console.log(ConductUserId);
          dispatch(loginSuccess({userId : ConductUserId}));
          return ConductUserId;
    }
    catch(err){
        dispatch(loginFailure()); // if login failed
    }
}

export const registerUser = async(formData) =>{
    try{
      console.log("hi")
        const { data } = await axios.post(
          "http://localhost:8000/api/auth/User/register/", 
          formData,
        )
          // console.log(data);
      }
      catch(err){
        console.log(err);
      }
}

export const registerOrganization = async(formData) => {
    try{
        const { data } = await axios.post(
          "http://127.0.0.1:8000/api/auth/ConductUser/register/", 
          formData,
        )
          // console.log(data);
      }
      catch(err){
        console.log(err);
      }
}

export const getCoductUserData = async(id) => {
  try{
    //console.log("hi from api call")
    const { data } = await axios.get(
      `http://localhost:8000/api/ConductUser/user/${id}`, 
      {
          headers: {
              Authorization: `Bearer ${getCookie("access_token")}`,
          },
          credentials : "include"
      }


  );
  //console.log(data);
  return data;
  }
  catch(err){
    return err;
  }
}

export const updateConductUserData = async(id , formData) => {
  try{
    const { data } = await axios.put(
      `http://localhost:8000/api/ConductUser/update-profile/${id}/`,
      formData,
      {
          headers: {
              Authorization: `Bearer ${getCookie("access_token")}`,
          },
          credentials : "include"
      },
  );

  // console.log(data);
  const userData = await getCoductUserData(id);
  // console.log(userData);
  return userData;
  }
  catch(err){
    return err;
  }
}
export const verifyToken = async(token)=>{
  const formData = new FormData();
  formData.append("token", token);
  try{
    const res = await axios.post(
      `http://localhost:8000/api/auth/login/token/verify/`, 
      formData
    )
    if(res) return true;
  }
  catch(err){
    return false;
  }
  
}

export const getAccessToken = async()=>{
  const refresh = getCookie("refresh_token");
  console.log(refresh)
  const formData = new FormData();
  formData.append("refresh", refresh);
  const res = await axios.post(
    `http://localhost:8000/api/auth/login/token/refresh/`, 
    formData
  )
   setCookie("access_token" , res.data.access);
    setCookie("refresh_token" , res.data.refresh);
  return res.access;
}