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
        // console.log(res);
        return res;
      }
      catch(err){
        console.log(err);
      }
}

// Get Form Data
export const getFormData = async(code) =>{
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/form/${code}`, 
          {
              headers: {
                  Authorization: `Bearer ${getCookie("access_token")}`,
              },
              credentials : "include"
          },
        )
        // console.log(res);
        return res;
      }
      catch(err){
        console.log(err);
      }
}

// add question 
export const addQuestionAPICall = async (code) => {
  try {
    const res = await axios.post(
      `http://127.0.0.1:8000/api/form/${code}/create_question`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
        withCredentials: true,
      }
    );
    // console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

// update form Title 
export const updateFormTitleAPICall = async(newTitle , code)=>{
  try{
    const formData = new FormData();
    formData.append("title", newTitle);
    const res = await axios.put(`http://127.0.0.1:8000/api/form/update/title/${code}/`, 
    formData,
      {
          headers: {
              Authorization: `Bearer ${getCookie("access_token")}`,
          },
          withCredentials: true,
      },
    )
    // console.log(res);
    return res;
  }
  catch(err){
    console.log(err);
  }
}

// update form Description
export const updateFormDescriptionAPICall = async(newDesc , code)=> {
  try{
    const formData = new FormData();
    formData.append("description", newDesc);
    const res = await axios.put(`http://127.0.0.1:8000/api/form/update/description/${code}/`, 
    formData,
      {
          headers: {
              Authorization: `Bearer ${getCookie("access_token")}`,
          },
          withCredentials: true,
      },
    )
    // console.log(res);
    return res;
  }
  catch(err){
    console.log(err);
  }
}
// update option
export const updateOptionAPICall = async(newOption , optionId ,  code)=> {
  try{
    const res = await axios.patch(`http://127.0.0.1:8000/api/form/${code}/choices/${optionId}/`, 
    {
      choice : newOption
    },
      {
          headers: {
              Authorization: `Bearer ${getCookie("access_token")}`,
          },
          withCredentials: true,
      },
    )
    // console.log(res);
    return res;
  }
  catch(err){
    console.log(err);
  }
}

// add option
export const addOptionApiCall = async(code , questionId) => {
  try{

    const res = await axios.post(`http://127.0.0.1:8000/api/form/${code}/add-choice/`, 
    {
      question : questionId
    },
      {
          headers: {
              Authorization: `Bearer ${getCookie("access_token")}`,
          },
          withCredentials: true,
      },
    )
    // console.log(res);
    return res;
  }
  catch(err){
    console.log(err)
  }
}