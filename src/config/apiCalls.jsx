import { loginFailure , loginStart , loginSuccess } from "../redux/userSlice";
import axios from "axios";

export const login = async(dispatch , formData) =>{
    dispatch(loginStart()); // start the login process
    try {
        
        const { data } = await axios.post(
            "http://localhost:8000/api/auth/login/token/", 
            formData,
          )
          console.log(data)
          dispatch(loginSuccess(data));
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