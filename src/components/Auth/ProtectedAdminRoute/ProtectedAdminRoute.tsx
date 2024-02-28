import { FC, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import RoleContext from '../../../Context/RoleContext';
import NoAccess from '../../Navigation/NoAccess/NoAccess';

interface ProtectedAdminRouteProps {}

const ProtectedAdminRoute: FC<ProtectedAdminRouteProps> = () => {
  const roleContext = useContext(RoleContext);

  return roleContext?.role === 1 ? <Outlet/> : <NoAccess/>

}

export default ProtectedAdminRoute;
