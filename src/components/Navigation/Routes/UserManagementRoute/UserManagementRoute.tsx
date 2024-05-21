import { Badge, Box, Button, Card, Center, HStack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, VStack, useDisclosure, useToast } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { FaCheck, FaCheckCircle, FaUserPlus } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useMutation, useQuery } from 'react-query';
import { SupportUser } from '../../../../models/dbo/SupportUser';
import { getAllSupportUsers, postApproveUser, putUpdateRole } from '../../../../services/user.service';
import UserManagementChangeRoleModal from '../../../UserManagement/UserManagementChangeRoleModal/UserManagementChangeRoleModal';


interface UserManagementRouteProps { }

const UserManagementRoute: FC<UserManagementRouteProps> = () => {

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userToUpdate, setUserToUpdate] = useState<string>("");

  const { data: getAllSupportAppUserData, isLoading: getAllSupportAppUsersIsLoading, refetch: getAllRefetch } = useQuery('getAllSupportUsers', async (): Promise<SupportUser[]> => {
    return await getAllSupportUsers()
  })

  // const { refetch: postApproveRefetch } = useQuery('postApproveUser', async (): Promise<void> => {

  //   return await postApproveUser(email);
  // }, {
  //   enabled: false,
  //   retry: false,
  //   onSuccess: onPostSuccess
  // })

  const mutate = useMutation({
    mutationFn: async (email: string) => {
      return await postApproveUser(email)
    },
    onSuccess: async (_data, email) => {
      toast({
        title: email + " has been approved",
        status: "success",
        duration: 6000,
        isClosable: true
      })
      await getAllRefetch()
    },
    onMutate: (email: string) => {
      console.log("Approving " + email);
    }
  })

  const mutateUpdateRole = useMutation({
    mutationFn: async (params: {
      email: string,
      roleAsString: string
    }) => {
      return await putUpdateRole({
        email: params.email,
        roleAsString: params.roleAsString
      })
    },
    onSuccess: async (_data, variables) => {
      toast({
        title: variables.email + " role changed to " + getAuthRoleString(parseInt(variables.roleAsString)),
        status: "success",
        duration: 6000,
        isClosable: true
      })
      await getAllRefetch()
    }
  })

  const getAuthRoleString = (value: number) => {
    switch (value) {
      case 0:
        return "CLDMGT Team member (Admin)"
      case 1:
        return "3rd Line Support"
      case 2:
        return "Support"
      case 3:
        return "Awaiting Role"
      case 4:
        return "Unassigned"
    }
  }

  const openUpdateRoleModal = (email: string) => {
    setUserToUpdate(email);
    onOpen()
  }


  return <>
    {getAllSupportAppUsersIsLoading ?
      <Box>Loading...</Box> :
      <VStack padding="8" w="full" display="flex" justifyContent="center" flexDirection="column">
        <HStack>
          <Badge colorScheme="red">Awaiting role</Badge>
          <Badge colorScheme="red">Unassigned</Badge>
          <Text fontSize="12px" fontWeight="500">Users with a role of "Awaiting role" or "Unassigned" will be unable to access the app, please set their role.</Text>
        </HStack>
        <Card w="75%" mt="4">
          <TableContainer overflowY={'auto'}>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th><Center>Name</Center></Th>
                  <Th><Center>Email</Center></Th>
                  <Th><Center>Role</Center></Th>
                  <Th><Center>Approved</Center></Th>
                  <Th><Center>Actions</Center></Th>
                </Tr>
              </Thead>
              <Tbody>
                {getAllSupportAppUserData?.map(user => {
                  return <Tr>
                    <Td><Center>{user.firstName + " " + user.lastName}</Center></Td>
                    <Td><Center>{user.email}</Center></Td>
                    <Td><Center>{getAuthRoleString(user.authorisationRole)}</Center></Td>
                    <Td><Center w="full">{user.isApproved ? <FaCheckCircle color="#3ace3a" size="25" /> : <MdCancel color="#FF6961" size="30" />}</Center></Td>
                    <Td><HStack w="full" justifyContent="center">
                      <Tooltip label="Approve"><Button onClick={() => mutate.mutate(user.email)}><FaCheck /></Button></Tooltip>
                      <Tooltip label="Change role"><Button onClick={() => openUpdateRoleModal(user.email)}><FaUserPlus /></Button></Tooltip>
                    </HStack></Td>
                  </Tr>
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Card>
        <UserManagementChangeRoleModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} userToUpdate={userToUpdate} updateRole={mutateUpdateRole.mutate} />
      </VStack>
    }
  </>
};

export default UserManagementRoute;
