import React from "react";
import { ILoginContext } from "../interface";

export const LoginContext = React.createContext<ILoginContext | null>(null);
