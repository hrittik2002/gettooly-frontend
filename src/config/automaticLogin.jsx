import { setUserData } from "../redux/userSlice";
import { getUserData } from "./ApiCalls/userApiCalls";
import { getCookie, getUserId, getUserType } from "./Cookie";
import { getAccessToken, getCoductUserData, verifyToken } from "./apiCalls";

export const AutomaticLogin = async () => {
  const access = getCookie("access_token");
  const refresh = getCookie("refresh_token");
  // if(!refresh){
  //     return null;
  // }
  console.log(access, refresh);
  const verifyAccess = await verifyToken(access);
  const verifyRefresh = await verifyToken(refresh);
  console.log(verifyAccess, verifyRefresh);
  if (verifyAccess) {
    const userType = await getUserType();
    if (userType === 1) {
      if (verifyAccess) {
        const userId = getUserId();
        const data = await getCoductUserData(userId);
        return data;
      } // correct
      else if (verifyRefresh) {
        console.log(verifyRefresh);
        const access = getAccessToken();
        console.log("heeeeeeeeeeeeeeeeeeeeeeeyyy", access);
        const userId = getUserId();
        const data = await getCoductUserData(userId);
        return data;
      } else return null;
    } else {
      if (verifyAccess) {
        const userId = getUserId();
        const data = await getUserData(userId);
        return data;
      } // correct
      else
      if(verifyRefresh){
        console.log(verifyRefresh)
          const access = getAccessToken();
          console.log("heeeeeeeeeeeeeeeeeeeeeeeyyy" ,  access )
          const userId = getUserId();
          const data = await getUserData(userId);
          return data;
      }
      else return null;

    }
  } else {
    return null;
  }
};

// import { setUserData } from "../redux/userSlice";
// import { getUserData } from "./ApiCalls/userApiCalls";
// import { getCookie, getUserId, getUserType } from "./Cookie";
// import { getAccessToken, getCoductUserData, verifyToken } from "./apiCalls";

// export const AutomaticLogin = async () => {
//   const access = getCookie("access_token");
//   const refresh = getCookie("refresh_token");
//   // if(!refresh){
//   //     return null;
//   // }
//   //const data = await getUserData(userId);
//   console.log(access, refresh);
//   const verifyAccess = await verifyToken(access);
//   const verifyRefresh = await verifyToken(refresh);
//   console.log(verifyAccess, verifyRefresh);
//   if (verifyAccess) {
//     const userType = getUserType();
//     if (userType === 1) {
//       if (verifyAccess) {
//         const userId = getUserId();
//         const data = await getCoductUserData(userId);
//         return data;
//       }
//     } // correct
//     else if (verifyRefresh) {
//       console.log(verifyRefresh);
//       const access = getAccessToken();
//       console.log("heeeeeeeeeeeeeeeeeeeeeeeyyy", access);
//       const userId = getUserId();
//       const data = await getCoductUserData(userId);
//       return data;
//     } else return null;
//   } else {
//     if (verifyAccess) {
//       const userType = getUserType();
//         if (verifyAccess) {
//           const userId = getUserId();
//           const data = await getUserData(userId);
//           return data;
//         }
//        // correct
//       else if (verifyRefresh) {
//         console.log(verifyRefresh);
//         const access = getAccessToken();
//         console.log("heeeeeeeeeeeeeeeeeeeeeeeyyy", access);
//         const userId = getUserId();
//         const data = await getUserData(userId);
//         return data;
//       } else return null;
//     }
//   }
// };
