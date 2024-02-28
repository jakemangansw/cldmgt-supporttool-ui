import React from "react";
import { UserDetailsDbo } from "../models/dbo/UserDetailsDbo";

const AuthContext = React.createContext<UserDetailsDbo | null>(null);

export default AuthContext