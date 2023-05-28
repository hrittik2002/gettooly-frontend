import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import axios from "axios";
import { authenticate, getCookie, getUserId, setCookie } from "../Cookie";

// get user ip address
export const getIPAddress = async () => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/get-client-ip/`, {
      headers: {
        Authorization: `Bearer ${getCookie("access_token")}`,
      },
      credentials: "include",
    });
    return res.data.ip;
  } catch (err) {
    console.log(err);
  }
};
export const submitForm = async (ip, formResponse, formId , email) => {
  try {
    const res = await axios.post(
      `http://127.0.0.1:8000/api/response/store_responses/`,
      {
        responder_email:email,
        form_id: formId,
        responder_ip: ip,
        responses: formResponse,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
        credentials: "include",
      }
    );
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const viewResponseAPICall = async(formCode , responseCode) =>{
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/form/${formCode}/response/${responseCode}/`,
      {
        headers: {
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
        credentials: "include",
      }
    );
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
}

// send details to conduct user
export const sendDetails = async(id , result_code , responder_email , name , score , 
  total_score , percentage , show_score , result_to , responder
  ) =>{
  try {
    const res = await axios.post(
      `http://127.0.0.1:8000/api/results/`,
      {
        id: id,
	      result_code: result_code,
	      responder_email: responder_email,
	      name: name,
	      score: score,
	      total_score: total_score,
	      percentage: percentage,
	      show_score: show_score,
	      result_to: result_to,
	      responder: responder
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
        credentials: "include",
      }
    );
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
}