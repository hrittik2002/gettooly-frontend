import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { emailVerificationContinution } from "../../config/apiCalls";
import { useSelector } from "react-redux";

const EmailVerifyPage = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const tokenParam = findGetParameter("token");
    setToken(tokenParam);
  }, []);

  useEffect(() => {
    if (token) {
      const check = async () => {
        const isVerified = await emailVerificationContinution(token);
        console.log(isVerified);
        if (isVerified) {
          navigate(`/ConductUser/${userData.id}/about`, {
            state: { isVerified: true },
          });
        }
      };
      check();
    }
  }, [token]);

  function findGetParameter(parameterName) {
    const queryString = window.location.search.substr(1);
    const params = new URLSearchParams(queryString);
    return params.get(parameterName);
  }

  return (
    <div>{token ? <h1>Email Verified</h1> : <h1>Wrong token</h1>}</div>
  );
};

export default EmailVerifyPage;
// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { emailVerificationContinution } from "../../config/apiCalls";
// import { useSelector } from "react-redux";
// const EmailVerifyPage = () => {
//     const [token, settoken] = useState("");
//     const navigate = useNavigate();
//     const userData = useSelector((state) => state.user.currentUser)
//     useMemo(() => {
//         settoken(findGetParameter("token"));
//         console.log(token);
//         const check = async() =>{
//             const isVerified = await emailVerificationContinution(token);
//             console.log(isVerified);
//             if (isVerified) {
//                 navigate(`/ConductUser/${userData.id}/about` , { state : { isVerified: true }});
//             }
//         }
//         check();
        
//     }, []);

//     function findGetParameter(parameterName) {
//         let result = null,
//             tmp = [];
//         window.location.search
//             .substr(1)
//             .split("&")
//             .forEach(function (item) {
//                 tmp = item.split("=");
//                 if (tmp[0] === parameterName)
//                     result = decodeURIComponent(tmp[1]);
//             });
//         return result;
//     }
//     console.log(token);
//     return <div>{token ? <h1>Email Verified</h1> : <h1>Wrong token</h1>}</div>;
// }

// export default EmailVerifyPage