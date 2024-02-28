import { FC, useEffect, useState } from 'react';
import { Center, VStack, Flex, Box, Text } from '@chakra-ui/react';
import CustomGoogleLogin from '../CustomGoogleLogin/CustomGoogleLogin';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
}

const Login: FC<LoginProps> = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if(token){
      navigate("/app")
    }
  }, [])
  
  const getAccessTokenFromLocalStorage = (): void => {
    const token = localStorage.getItem('accessToken');
    setAccessToken(token);
    navigate("/app")
  }
  
  return <>
  <Center h="100vh">
      <VStack>
      <Box>Welcome to the CLDMGT support tool</Box>
      {!accessToken ? <>
      <Box>
      <Flex w="full" flexDirection="column" justifyContent="center">
            <Text fontSize="14px" mb="4">You are not logged in. Please login with Google to continue.</Text>
            <CustomGoogleLogin onCloseHandler={getAccessTokenFromLocalStorage}></CustomGoogleLogin>
          </Flex>
      </Box>     
      </> : <>
      <Box>You are logged in.</Box>
      </>
      }
      </VStack>
    </Center>
  </>
};

export default Login;
