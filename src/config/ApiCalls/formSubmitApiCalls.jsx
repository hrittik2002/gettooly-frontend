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
export const submitForm = async (ip, formResponse, formId) => {
  try {
    const res = await axios.post(
      `http://127.0.0.1:8000/api/response/store_responses/`,
      {
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
