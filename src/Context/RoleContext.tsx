import React from "react";
import { UserRoleResponse } from "../models/response/UserRoleResponse";

const RoleContext = React.createContext<UserRoleResponse | null>(null);

export default RoleContext