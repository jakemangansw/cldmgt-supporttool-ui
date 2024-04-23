import { Box, HStack } from "@chakra-ui/react";
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

const UserList: FC<UserListProps> = (props: UserListProps) => (
  <Box className={styles.UserList} id="user-list" w="full" h="full">
    <HStack alignItems="flex-start" justifyContent="flex-start" w="full" h="full"> 
    {props.users.length && props.users.map((user) => {
        return <>
        <Box minWidth={"200px"} h="full" maxHeight="55px">
          <UserCard key={user.id} userId={user.id} name={user.username} valueSelected={user.valueSelected} shouldReveal={props.shouldReveal} selfId={props.selfId} onOpenModalFunction={props.onOpenModalFunction}></UserCard>
        </Box>
        </>
      })}
    </HStack>
  </Box>
);

export default UserList;
