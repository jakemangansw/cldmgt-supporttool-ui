import { FC } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Button, Center, Text, VStack } from '@chakra-ui/react';

interface ProtectedLoginRouteProps { }

const ProtectedLoginRoute: FC<ProtectedLoginRouteProps> = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');
  const details = localStorage.getItem("accessTokenDetails");

  if (details) {
    const detailsObj = JSON.parse(details);
    const exp = detailsObj.exp;
    const now = Date.now();
    if ((now / 1000) > exp) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("accessTokenDetails");
    }

    const logoutHandler = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("accessTokenDetails");
      navigate("/");
    }

    if (!detailsObj.email.includes("qoria.com")) {
      return <Center w="full" h="100vh">
        <VStack>
          <Text fontSize="32" fontWeight="600" color="gray.600" mb="2">Access not permitted</Text>
          <Text>Only qoria.com email addresses are permitted to access the CLDMGT support tool.</Text>
          <Text>Please log out and log back in with a qoria.com email address.</Text>
          <Button mt="4" bg="#00bbb4" color="white" w="32" onClick={logoutHandler}>Log out</Button>
        </VStack>
      </Center>
    }
  }

  return !!token ? <Outlet /> : <Navigate to="/login" />
};

export default ProtectedLoginRoute;
