import { AuthContext } from "../context/auth-context";
import React from "react";
import { IAuthContext } from "../interface";
import { useRouter } from "next/router";

export function isPublicRoute(Component: React.FC) {
  return function IsPublicRoute(props: any) {
    const { currentUser } = React.useContext(AuthContext) as IAuthContext;
    const router = useRouter();
    if (currentUser) {
      router.replace("/dashboard");
      return <></>;
    }

    return <Component {...props} />;
  };
}
