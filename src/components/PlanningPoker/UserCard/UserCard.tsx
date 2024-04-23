import { FC } from 'react';
import styles from './UserCard.module.scss';
import { Text, Box, Center, HStack, Flex, Tooltip } from '@chakra-ui/react';
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
  <Center w="full" h="full" minHeight="12" borderRadius="5px" className={props.valueSelected ? styles.selectedValue : styles.notSelectedValue}>
    <HStack h="100%" w="full" pl="4" justifyContent="space-between">
      <Flex flexDirection="row">
        <Tooltip label={props.name} isDisabled={props.name.length < 30}>
          <Text fontWeight="700" fontSize="20px" maxWidth="300px" noOfLines={1}>{props.name}</Text>
        </Tooltip>

        {props.selfId === props.userId ?
          <Center ml="2" cursor="pointer" onClick={props.onOpenModalFunction}>
            <MdEdit size="20"></MdEdit>
          </Center> : <></>}
      </Flex>

      <Box h="full">{props.valueSelected === "" ?
        <Center h="full" w="10" bg="#ababab" border="3px solid #595959" borderRight={0} borderTop={0} borderBottom={0}>
          <FaQuestion color="white" />
        </Center> :
        <Center h="full" w="10" bg="#007e7a" border="3px solid rgb(0, 78, 55)" borderRight={0} borderTop={0} borderBottom={0}>
          {props.shouldReveal ? <Text color="white" fontWeight="500" fontSize="24px">{props.valueSelected}</Text> : <FaCheck color="white" />}
        </Center>}
      </Box>
    </HStack>
  </Center>
);

export default UserCard;
