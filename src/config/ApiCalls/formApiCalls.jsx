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
// delete option
export const deleteOptionApiCall = async (code, optionId) => {
  try {
    const res = await axios.delete(
      `http://127.0.0.1:8000/api/form/${code}/remove-choice/`,
      {
        headers: {
          Authorization: `Bearer ${getCookie('access_token')}`,
        },
        withCredentials: true,
        data: {
          id: optionId,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};
// update question 
export const updateQuestionAPICall = async (code , id , questionText , questionType , required) => {
  let type = "multiple choice";
  if(questionType === "radio"){
    type = "multiple choice"
  }
  else if(questionType === "checkbox"){
    type = "checkbox"
  }
  else if(questionType === "text"){
    type = "paragraph"
  }
  try{
    console.log(type)

    const res = await axios.patch(`http://127.0.0.1:8000/api/form/edit_question/${code}/`, 
    {
      id : id,
      question_data : {
        id : id,
        question : questionText,
        question_type : type,
        required : required
      }
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
};

// update background color
export const updateBgColorApiCall = async(code , color) => {
  try{
    const res = axios.put(`http://127.0.0.1:8000/api/form/update/background_color/${code}/`, 
    {
      background_color : color
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
// update settings 
export const updateSettingsApiCall = async(code , obj) => {
  try{
    const res = axios.put(`http://127.0.0.1:8000/api/form/update/setting/${code}/`, 
    {
      collect_email: obj.collect_email,
      authenticated_responder: obj.authenticated_responder,
      edit_after_submit: obj.edit_after_submit,
      confirmation_message : obj.confirmation_message,
      is_quiz: obj.is_quiz,
      allow_view_score: obj.allow_view_score
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
// update score
export const updateScoreAPICall = async(code , qsId , score) => {
  try{
    const res = axios.post(`http://127.0.0.1:8000/api/edit_score/${code}/`, 
    {
      question_id:qsId,
	    score:score
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
// delete question
export const deleteQuestionAPICall = async(code , qsId) => {
  try{
    //console.log(token);
    const formData = new FormData();
    const res = axios.delete(`http://localhost:8000/api/forms/${code}/questions/${qsId}/`, 
    {
      headers: {
        Authorization: `Bearer ${getCookie("access_token")}`,
    }
    
  },
    )
    // console.log(res);
    return res;
  }
  catch(err){
    console.log(err)
  }
}
// delete question
export const getAllFormsByUserId = async(userId) => {
  try{
    const res = axios.get(`http://localhost:8000/api/user/${userId}/forms/`, 
    {
      headers: {
        Authorization: `Bearer ${getCookie("access_token")}`,
    }
    
  },
    )
     console.log(res);
    return res;
  }
  catch(err){
    console.log(err)
  }
}