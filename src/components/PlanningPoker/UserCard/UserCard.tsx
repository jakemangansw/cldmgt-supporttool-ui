import { FC } from 'react';
import styles from './UserCard.module.scss';
import { Text, Box, Center, HStack, Flex } from '@chakra-ui/react';
import { FaCheck, FaQuestion } from "react-icons/fa";
import { MdEdit } from "react-icons/md"

interface UserCardProps {
  userId: string;
  name: string;
  valueSelected: string | null;
  shouldReveal: boolean;
  selfId: string;
  onOpenModalFunction: () => void;
}

const UserCard: FC<UserCardProps> = (props: UserCardProps) => (
  <Center w="full" h="full" minHeight="16" borderRadius="5px" className={props.valueSelected ? styles.selectedValue : styles.notSelectedValue}>
    <HStack h="100%" w="full" px="4" justifyContent="space-between">
      <Flex flexDirection="row">
        <Text fontWeight="700" fontSize="20px" maxWidth="150px" noOfLines={1}>{props.name}</Text>
        {props.selfId === props.userId ?
          <Center ml="2" cursor="pointer" onClick={props.onOpenModalFunction}>
            <MdEdit size="20"></MdEdit>
          </Center> : <></>}
      </Flex>

      <Box>{props.valueSelected === "" ?
        <Center h="12" w="12" borderRadius="100px" bg="#ababab" border="3px solid #5e5e5e">
          <FaQuestion color="white" />
        </Center> :
        <Center h="12" w="12" borderRadius="100px" bg="#00a372" border="3px solid #006647">
          {props.shouldReveal ? <Text color="white" fontWeight="500" fontSize="20px">{props.valueSelected}</Text> : <FaCheck color="white" />}
        </Center>}
      </Box>
    </HStack>
  </Center>
);

export default UserCard;
