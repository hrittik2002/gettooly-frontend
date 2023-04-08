import { loginFailure , loginStart , loginSuccess } from "../../redux/userSlice";
import axios from "axios";
import { authenticate, getCookie, getUserId, setCookie } from "../Cookie";
// create a new Form
export const createForm = async() =>{
    try{
        const formData = new FormData();
        formData.append("title", "Untitled Form");
        const res = await axios.post(`http://127.0.0.1:8000/api/form/create`, 
        formData,
          {
              headers: {
                  Authorization: `Bearer ${getCookie("access_token")}`,
              },
              credentials : "include"
          },
        )
        console.log(res);
        return res;
      }
      catch(err){
        console.log(err);
      }
}

// Get Form Data
export const getFormData = async() =>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/form/create`, 
          {
              headers: {
                  Authorization: `Bearer ${getCookie("access_token")}`,
              },
              credentials : "include"
          },
        )
        console.log(res);
        return res;
      }
      catch(err){
        console.log(err);
      }
}