import { loginFailure , loginStart , loginSuccess } from "../../redux/userSlice";
import axios from "axios";
import { authenticate, getCookie, getUserId, setCookie } from "../Cookie";

// register user
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

// get conduct user data
export const getUserData = async(id) => {
    try{
      //console.log("hi from api call")
      const { data } = await axios.get(
        `http://localhost:8000/api/User/user/${id}`, 
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

  // get response 
  export const getResponse = async(formCode) =>{
    try{
      const res = await axios.get(
        `http://127.0.0.1:8000/api/responses/${formCode}/`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("access_token")}`,
        },
        credentials : "include"
        }
      )
    console.log(res);
    return res;
    }
    catch(err){
      return err;
    }
  }