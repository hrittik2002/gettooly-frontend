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