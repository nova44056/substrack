import { AuthContext } from "../context/auth-context";
import React from "react";
import { IAuthContext } from "../interface";
import { useRouter } from "next/router";

export function isPrivateRoute(Component: React.FC) {
  return function IsPrivateRoute(props: any) {
    const { currentUser } = React.useContext(AuthContext) as IAuthContext;
    const router = useRouter();
    if (!currentUser) {
      router.replace("/");
      return <></>;
    }

    return <Component {...props} />;
  };
}
