import { loginFailure , loginStart , loginSuccess } from "../redux/userSlice";
import axios from "axios";
import { authenticate, getCookie, getUserId } from "./Cookie";

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
          console.log(data);
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
          console.log(data);
      }
      catch(err){
        console.log(err);
      }
}

export const getCoductUserData = async(id) => {
  try{
    const { data } = await axios.get(
      `http://localhost:8000/api/ConductUser/user/${id}`, 
      {
          headers: {
              Authorization: `Bearer ${getCookie("access_token")}`,
          },
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
      },
  );

  console.log(data);
  const userData = await getCoductUserData(id);
  console.log(userData);
  return userData;
  }
  catch(err){
    return err;
  }
}