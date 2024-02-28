import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';
import { UserRoleResponse } from '../../../models/response/UserRoleResponse';
import { getUserRole } from '../../../services/user.service';
import RoleContext from '../../../Context/RoleContext';
import { Box, Center, Spinner } from '@chakra-ui/react';

interface ProtectedApprovedRoleRouteProps { }

const ProtectedApprovedRoleRoute: FC<ProtectedApprovedRoleRouteProps> = () => {
  const { data: res, isLoading } = useQuery('getRole', async (): Promise<UserRoleResponse> => {
    return await getUserRole();
  })

  const outputNode = () => {
    if (isLoading) {
      return <Center w="full" h="full"><Spinner size="xl"/></Center>
    }

    return res!?.role <= 3 && res!.isApproved ?
      <RoleContext.Provider value={res!}><Outlet /></RoleContext.Provider> :
      <Navigate to="onboarding" />
  }

  return <Box h="100vh">{outputNode()}</Box>;
};

export default ProtectedApprovedRoleRoute;
 