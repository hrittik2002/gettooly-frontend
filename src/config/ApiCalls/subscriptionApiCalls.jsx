import { loginFailure , loginStart , loginSuccess } from "../../redux/userSlice";
import axios from "axios";
import { authenticate, getCookie, getUserId, setCookie } from "../Cookie";

// Delete stripe customer id by userid
export const deleteStripeCustomerId = async (userId) =>{
    const token = getCookie("access_token"); // Retrieve the access token from the cookie or another source
    try{
      const { data } = await axios.put(
        `http://127.0.0.1:8000/api/conduct-users/${userId}/scid`, 
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(data);
      return true;
  
    }
    catch(err){
      return false;
    }
  }

// get all subscriptions 
export const getSubscriptionList = async (userId) =>{
    try{
      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/payment/subscriptions/${userId}/sl`, 
        {
            headers: {
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
            credentials : "include"
        }
      );
      console.log(data);
      return data;
  
    }
    catch(err){
      return err;
    }
  }

  // cancel subscription
  export const cancelSubscription = async (subId) => {
    try {
      const token = getCookie("access_token"); // Retrieve the access token from the cookie or another source
      
      const { data } = await axios.post(
        `http://127.0.0.1:8000/api/payment/cancel-subscription/${subId}/`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      
      console.log(data);
      return data;
    } catch (err) {
      return err;
    }
  };