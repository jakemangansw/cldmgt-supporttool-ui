import { FC, useState } from 'react';
import { Box, Button, Center, HStack, Select, Text, VStack, useToast } from '@chakra-ui/react';
import { getUserRole, postNewUser } from '../../../services/user.service';
import { useQuery } from 'react-query';
import { UserRoleResponse } from '../../../models/response/UserRoleResponse';
import { useNavigate } from 'react-router-dom';

interface SupportAppOnboardingProps { }

const SupportAppOnboarding: FC<SupportAppOnboardingProps> = () => {

  const toast = useToast();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleChange = (e: any) => {
    setSelectedRole(e.target.value);
  }

  const { refetch: refetchRequest } = useQuery('postNewUser', async (): Promise<boolean> => {
    return await postNewUser();
  }, { enabled: false, retry: false, onSuccess: handleSuccess, onError: handleError })

  const { refetch: refetchCheck } = useQuery('getRole', async (): Promise<UserRoleResponse> => {
    return await getUserRole();
  }, { enabled: false, retry: false, onSuccess: (data) => { getRoleIsSuccessHandler(data) } })

  const getRoleIsSuccessHandler = (data: any) => {
    console.log("onsuccess ran");
    console.log("res:", data)
    if (data?.isApproved && data.role <= 3) {
      navigate("/app");
    } else {
      toast({
        title: "No access",
        description: "You do not yet have access.",
        status: 'warning',
        duration: 6000,
        isClosable: true
      })
    }
  }

  const onClickHandlerRequestAccess = () => {
    refetchRequest();
  }

  const onClickHandlerCheckAccess = () => {
    refetchCheck();
  }

  function handleSuccess() {
    return toast({
      title: "Request sent.",
      description: "Your access request has been sent and will be approved shortly.",
      status: "success",
      duration: 6000,
      isClosable: true
    })
  }

  function handleError() {
    return toast({
      title: "You have already sent a request.",
      description: "Your access request has already been received.",
      status: "warning",
      duration: 6000,
      isClosable: true
    })
  }

  return <>
    <Center h="100vh">
      <VStack>
        <Text>You do not yet have permission to access the CLDMGT support tool.</Text>
        <Text>Please enter your role below and click the button to request access.</Text>
        <HStack mt="4">
          <Box>
            <Select placeholder="Select your role" value={selectedRole} onChange={handleChange}>
              <option value='administrator'>CLDMGT Team member</option>
              <option value='thirdline'>3rd Line Support</option>
              <option value='support'>Support</option>
            </Select>
          </Box>
          <Button bgColor="blue.400" color="white" isDisabled={selectedRole === ""} onClick={onClickHandlerRequestAccess}>Request access</Button>
        </HStack>
        <Text mt="4" fontSize="12px">Click below to check access</Text>
          <Button size="sm" bgColor="green.400" color="white" onClick={onClickHandlerCheckAccess}>Check access</Button>
      </VStack>
    </Center>
  </>
};

export default SupportAppOnboarding;
