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

const UserList: FC<UserListProps> = (props: UserListProps) => (
  <Box className={styles.UserList} id="user-list" h="full">
    <VStack padding="4" alignItems="center" justifyContent="center" h="full"> 
    {props.users.length && props.users.map((user) => {
        return <>
        <Box w="full" h="full" maxHeight="80px">
          <UserCard key={user.id} userId={user.id} name={user.username} valueSelected={user.valueSelected} shouldReveal={props.shouldReveal} selfId={props.selfId} onOpenModalFunction={props.onOpenModalFunction}></UserCard>
        </Box>
        </>
      })}
    </VStack>
  </Box>
);

export default UserList;
