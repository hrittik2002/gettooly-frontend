import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

// Set in Cookie
export const setCookie = (key , value) =>{
    if(window !== "undefined"){
        Cookies.set(key, value , {expires : 1}); // expires in one day
    }
}

// get the access token from Cookie
export const getCookie = (key) =>{
    if(window !== "undefined"){
        return Cookies.get(key);
    }
}
// to get the user id by fetching the access token
export const getUserId = () => {
    
    const access = getCookie("access_token");
    //console.log(access)
    if(access){
        const decoded = jwtDecode(access);
        //console.log(decoded)
        return decoded.user_id;
    }
}

export const authenticate = (response) => {
    setCookie("access_token" , response.access);
    setCookie("refresh_token" , response.refresh);
    const decoded = jwtDecode(response.access);
    //console.log(decoded);
}

