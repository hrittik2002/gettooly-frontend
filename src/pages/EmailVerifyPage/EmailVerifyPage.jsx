import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { emailVerificationContinution } from "../../config/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/userSlice";
import { AutomaticLogin } from "../../config/automaticLogin";
import { Box, Spinner, useToast } from "@chakra-ui/react";

const EmailVerifyPage = () => {
  const [token, setToken] = useState("");
  const toast = useToast();
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const tokenParam = findGetParameter("token");
    setToken(tokenParam);
  }, []);

  useEffect(() => {
    if (token) {
      console.log("holaaaaaaaaaaa");
      const check = async () => {
        const isVerified = await emailVerificationContinution(token);
        console.log(isVerified);
        if (isVerified === true) {
          localStorage.clear();
          console.log(userData);
          setVerified(true);
        }
      };
      check();
    }
  }, [token]);
  const loginUserUsingCookie = async () => {
    const data = await AutomaticLogin();
    dispatch(setUserData(data));
    console.log(data);
    navigate(`/ConductUser/${data.id}/about`);
    toast({
      title: "Email Verified.",
      description: "Your Email is now verified.",
      status: "success",
      duration: 6000,
      isClosable: true,
    });
  };
  useMemo(() => {
    if (!userData) {
      loginUserUsingCookie();
    }
  });
  function findGetParameter(parameterName) {
    const queryString = window.location.search.substr(1);
    const params = new URLSearchParams(queryString);
    return params.get(parameterName);
  }

  return (
    <div>
      {token ? (
        <Box
          width="100%"
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      ) : (
        <h1>Wrong token</h1>
      )}
    </div>
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
