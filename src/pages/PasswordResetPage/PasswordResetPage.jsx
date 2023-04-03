import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { checkPasswordResetToken } from '../../config/apiCalls';
import { Box, Text } from '@chakra-ui/react';
import ResetPassword from '../../components/ResetPassword/ResetPassword';

const PasswordResetPage = () => {
    const [tokenVerified , setTokenVerified] = useState(false);
    const { uibd , token } = useParams();
    console.log(uibd , token);
    useEffect(()=>{
        const check = async () =>{
            const response = await checkPasswordResetToken(uibd,token);
            if(response.data) setTokenVerified(true);
            return response;
        }
        check();
    } , [token,uibd])
  return (
    <>
        { tokenVerified ?
        (
            <>
               <ResetPassword uibd={uibd} token={token}/>
            </>

  )
        :
        (
            <>
                <Box>
                    <Text>Something Wrong :(</Text>
                </Box>

            </>
  )}

    
    </>
  )
}

export default PasswordResetPage