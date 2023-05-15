import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkPasswordResetToken } from "../../config/apiCalls";
import { Box, Text } from "@chakra-ui/react";
import ResetPassword from "../../components/ResetPassword/ResetPassword";
import Error404Page from "../Error404Page/Error404Page";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
const PasswordResetPage = () => {
  const [tokenVerified, setTokenVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const { uibd, token } = useParams();
  console.log(uibd, token);
  useEffect(() => {
    const check = async () => {
      setLoading(true);
      try {
        const response = await checkPasswordResetToken(uibd, token);
        if (response.data) setTokenVerified(true);
        else setTokenVerified(false);
      } catch (err) {
        console.log(err);
        setTokenVerified(false);
      } finally {
        setLoading(false);
      }
    };
    check();
  }, [token, uibd]);



    if (loading) {
      return <LoadingScreen />;
    }
    if (!tokenVerified) {
      return <Error404Page />;
    }
    if (tokenVerified) {
      return <ResetPassword uibd={uibd} token={token} />;
    }
  

  return <Error404Page />;
};

export default PasswordResetPage;

/*
{tokenVerified ? (
        <>
          <ResetPassword uibd={uibd} token={token} />
        </>
      ) : (
        <>
          <Error404Page />
        </>
      )}

*/
