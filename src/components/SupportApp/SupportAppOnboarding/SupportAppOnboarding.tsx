import { FC, useState } from 'react';
import { Box, Button, Center, HStack, Select, Text, VStack, useToast } from '@chakra-ui/react';
import { postNewUser } from '../../../services/user.service';
import { useQuery } from 'react-query';

interface SupportAppOnboardingProps { }

const SupportAppOnboarding: FC<SupportAppOnboardingProps> = () => {

  const toast = useToast();
  
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleChange = (e: any) => {
    setSelectedRole(e.target.value);
  }

  const { refetch } = useQuery('getRole', async (): Promise<boolean> => {
    return await postNewUser();
  }, {enabled: false, retry: false, onSuccess: handleSuccess, onError: handleError})

  const onClickHandler = () => {
    refetch();
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
          <Button bgColor="blue.400" color="white" isDisabled={selectedRole === ""} onClick={onClickHandler}>Request access</Button>
        </HStack>
      </VStack>
    </Center>
  </>
};

export default SupportAppOnboarding;
