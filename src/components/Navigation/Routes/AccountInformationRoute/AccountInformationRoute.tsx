import { FC, useEffect, useState } from 'react';
import { Box, Card, Center, Flex, Text } from '@chakra-ui/react';
import { FaUser } from "react-icons/fa"

interface AccountInformationRouteProps { }

const AccountInformationRoute: FC<AccountInformationRouteProps> = () => {
  const [accessTokenDetails, setAccessTokenDetails] = useState<null | string>(null);
  const [apiData, setApiData] = useState<null | any>(null);

  useEffect(() => {
    checkAccessTokenInLocalStorage();
  }, [])

  useEffect(() => {
    console.log(accessTokenDetails)
    if (!accessTokenDetails) {
      return;
    }

    const tokenDetailsObj = JSON.parse(accessTokenDetails);
    const url = process.env.REACT_APP_API_URL_HTTPS + "/user?subject_id=" + tokenDetailsObj.sub;
    fetch(url).then(res => {
      res.json().then(data => {
        setApiData(data);
      });
    });
  }, [accessTokenDetails])

  const checkAccessTokenInLocalStorage = (): void => {
    const tokenDetails = localStorage.getItem('accessTokenDetails');
    setAccessTokenDetails(tokenDetails);
  }

  return <Center w="full" h="full">
    {apiData ?
      <Card w="80" h="64" p="4">
        <Flex flexDirection="column">
          <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
            <Text fontSize="20px" fontWeight="500" color="gray.700">Account information</Text>
            <Box fontSize="20px" color="gray.700"><FaUser></FaUser></Box>
          </Flex>
          <Box mt="4">
            <Text fontSize="11px" color="gray.400" fontWeight="500">Email</Text>
            <Text fontSize="14px" fontWeight="500">{apiData?.email}</Text>
          </Box>
          <Box mt="1">
            <Text fontSize="11px" color="gray.400" fontWeight="500">Role</Text>
            <Text fontSize="14px" fontWeight="500">{apiData?.role}</Text>
          </Box>
          <Box mt="1">
            <Text fontSize="11px" color="gray.400" fontWeight="500">Subject ID</Text>
            <Text fontSize="14px" fontWeight="500">{apiData?.subjectId}</Text>
          </Box>
        </Flex>
      </Card>
      : <></>}
  </Center>
};

export default AccountInformationRoute;
