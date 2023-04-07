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

// export const emailVerification = async () => {
//   console.log("apicalls")
//   const formdata = new FormData();
//   const { data } = await axios.post(
//     `http://localhost:8000/api/auth/ConductUser/email/verify/link/`, 
//     formdata,
//     {
//         headers: {
//             Authorization: `Bearer ${getCookie("access_token")}`,
//         },
//         credentials : "include",
//     }
//     )
//   console.log(data);
// }
export const emailVerification = async () => {
  const response = await fetch('http://localhost:8000/api/auth/ConductUser/email/verify/link/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getCookie("access_token")}`,
    },
    body: JSON.stringify({}),
  });
  
  const data = await response.json();
  console.log(data);
}

export const emailVerificationContinution = async (token) =>{
  try{
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/auth/user/email-veryfy/?token=${token}`, 
      {
          headers: {
              Authorization: `Bearer ${getCookie("access_token")}`,
          },
          credentials : "include"
      }
    );
    console.log(data);
    return true;

  }
  catch(err){
    return false;
  }
}
/**
 * Forgot Password 
 */
// Function to request a password reset link
export const requestPasswordReset = async(email)=>{
  try{
    const res = await axios.post("http://localhost:8000/api/auth/user/email/request-reset/" , {
      email : email
    })
    //console.log(res);
    return res.data;
  }
  catch(err){
    console.log(err);
  }
}
export const checkPasswordResetToken = async (uidb64, token) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/auth/user/email/password-reset/${uidb64}/${token}/`
    );
    //console.log(response)
    return response;
  } catch (error) {
    console.error(error);
    return { error: "Failed to check password reset token" };
  }
};

export const setNewPassword = async (newPassword, token, uidb64) => {
  try {
    console.log(newPassword , token , uidb64);
    const response = await axios.patch(
      `http://localhost:8000/api/auth/user/email/password-reset-complete/`,
      {
        password: newPassword,
        uidb64: uidb64,
        token: token,
      }
    );
    console.log(response.data);
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async (formData , id) => {
  try{
    const {data} = await axios.put(`http://127.0.0.1:8000/api/auth/ConductUser/change-password/${id}/`,
    formData,
      {
          headers: {
              Authorization: `Bearer ${getCookie("access_token")}`,
          },
          credentials : "include"
      },
  )
  console.log(data);
  return true;
}
  catch(err){
    return false;
  }
}
// Payment Gateway 
export const paymentAPICall = async (amount , plan , duration , payment_method_id , payment_method_type) => {
  try{
    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("plan", plan);
    formData.append("duration", duration);
    formData.append("payment_method_id", payment_method_id);
    formData.append("payment_method_type", payment_method_type);
    const res = await axios.post(`http://127.0.0.1:8000/api/payment/payment-intent/`,
      formData,
      {
          headers: {
              Authorization: `Bearer ${getCookie("access_token")}`,
          },
          credentials : "include"
      },
  )
  console.log(res);
  return res.data;
}
  catch(err){
    console.log(err);
  }
}