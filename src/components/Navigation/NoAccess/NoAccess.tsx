import { FC } from 'react';
import { Center, Text, VStack } from '@chakra-ui/react';

interface NoAccessProps { }

const NoAccess: FC<NoAccessProps> = () => {

  return <Center w="full" h="full">
    <VStack w="84">
      <Text>You do not have access to this functionality.</Text>
    </VStack>
  </Center>
};

export default NoAccess;
