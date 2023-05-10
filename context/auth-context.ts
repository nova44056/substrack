import React from "react";
import { IAuthContext } from "../interface";

export const AuthContext = React.createContext<IAuthContext | null>(null);
