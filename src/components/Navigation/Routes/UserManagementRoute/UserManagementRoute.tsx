import { FC } from 'react';
import { useQuery } from 'react-query';
import { SupportUser } from '../../../../models/dbo/SupportUser';
import { getAllSupportUsers } from '../../../../services/user.service';
import { Box, Button, Card, Center, HStack, Table, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr } from '@chakra-ui/react';
import { FaCheckCircle, FaUserPlus, FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";


interface UserManagementRouteProps { }

const UserManagementRoute: FC<UserManagementRouteProps> = () => {

  const { data, isLoading } = useQuery('getAllSupportUsers', async (): Promise<SupportUser[]> => {
    return await getAllSupportUsers()
  })

  const getAuthRoleString = (value: number) => {
    switch (value) {
      case 0:
        return "Admin"
      case 1:
        return "CLDMGT Team member"
      case 2:
        return "3L support"
      case 3:
        return "Support"
      case 4:
        return "Unassigned"
    }
  }

  return <>
    {isLoading ?
      <Box>Loading...</Box> :
      <Center w="full">
        <Card>
          <TableContainer>
            <Table size="lg">
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
                {data?.map(user => {
                  return <Tr>
                    <Td><Center>{user.firstName + " " + user.lastName}</Center></Td>
                    <Td><Center>{user.email}</Center></Td>
                    <Td><Center>{getAuthRoleString(user.authorisationRole)}</Center></Td>
                    <Td><Center w="full">{user.isApproved ? <FaCheckCircle color="#3ace3a" size="25" /> : <MdCancel color="#FF6961" size="30" />}</Center></Td>
                    <Td><HStack w="full">
                      <Tooltip label="Approve"><Button><FaCheck /></Button></Tooltip>
                      <Tooltip label="Change role"><Button><FaUserPlus /></Button></Tooltip>
                    </HStack></Td>
                  </Tr>
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Card>
      </Center>
    }
  </>
};

export default UserManagementRoute;
