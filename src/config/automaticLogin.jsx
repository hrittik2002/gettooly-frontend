import { setUserData } from "../redux/userSlice";
import { getCookie, getUserId } from "./Cookie";
import { getAccessToken, getCoductUserData, verifyToken } from "./apiCalls";

export const AutomaticLogin = async () => {
    const access = getCookie("access_token");
    const refresh = getCookie("refresh_token");
    // if(!refresh){
    //     return null;
    // }
    console.log(access , refresh);
    const verifyAccess = await verifyToken(access);
    const verifyRefresh = await verifyToken(refresh);
    console.log(verifyAccess , verifyRefresh)
    if (verifyAccess) {
      const userId = getUserId();
      const data = await getCoductUserData(userId);
      return data;
    } // correct
    else
    if(verifyRefresh){
      console.log(verifyRefresh)
        const access = getAccessToken();
        console.log("heeeeeeeeeeeeeeeeeeeeeeeyyy" ,  access )
        const userId = getUserId();
        const data = await getCoductUserData(userId);
        return data;
    }
    else return null;
  };
