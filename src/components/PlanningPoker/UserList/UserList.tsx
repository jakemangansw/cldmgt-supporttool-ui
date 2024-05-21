import { Box, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { User } from "../../../models/User";
import UserCard from "../UserCard/UserCard";
import styles from "./UserList.module.scss"


interface UserListProps {
  users: User[]
  shouldReveal: boolean
  selfId: string;
  onOpenModalFunction: () => void;
}

const UserList: FC<UserListProps> = (props: UserListProps) => {
  // if (!!props.users.length) {
  //   const self = props.users.find(x => x?.id === props.selfId);
  //   const indexOf = props.users.indexOf(self!);
  //   props.users.splice(indexOf, 1, props.users.splice(0, 1, props.users[indexOf])[0]) //Move self element to start of array
  // }

  return <Box className={styles.UserList} id="user-list" w="full" h="full">
    <VStack alignItems="flex-start" justifyContent="flex-start" w="full" h="full">
      {props.users.length && props.users.filter(x => x.id === props.selfId).map((user) => {
        return <>
          <Box width={"300px"} h="full" maxHeight="55px">
            <UserCard key={user.id} userId={user.id} name={user.username} valueSelected={user.valueSelected} shouldReveal={props.shouldReveal} selfId={props.selfId} onOpenModalFunction={props.onOpenModalFunction}></UserCard>
          </Box>
        </>
      })}
      {props.users.length && props.users.filter(x => x.id !== props.selfId).map((user) => {
        return <>
          <Box width={"300px"} h="full" maxHeight="55px">
            <UserCard key={user.id} userId={user.id} name={user.username} valueSelected={user.valueSelected} shouldReveal={props.shouldReveal} selfId={props.selfId} onOpenModalFunction={props.onOpenModalFunction}></UserCard>
          </Box>
        </>
      })}
    </VStack>
  </Box>
};

export default UserList;
