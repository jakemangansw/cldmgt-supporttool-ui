import { FC, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Navigation/Navbar/Navbar';
import Sidenav from '../Navigation/Sidenav/Sidenav';

interface SupportAppProps { }

const SupportApp: FC<SupportAppProps> = () => {

  const navigate = useNavigate();

    const signOut = (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenDetails');
  }

  useEffect(() => {
    navigate("poker")
  }, [])

  return <>
    <Box h="60px">
        <Navbar signOutFn={signOut}></Navbar>
      </Box>

      <Flex flexDirection={"row"} h="calc(100vh - 60px)">
        <Sidenav></Sidenav>
        <Outlet />
      </Flex> 
  </>
};

export default SupportApp;
