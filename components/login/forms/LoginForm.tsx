import Link from "next/link";
import { Input } from "../../input";
import { Button } from "../../button";
import { Spacer } from "../../spacer";
import { FcGoogle } from "react-icons/fc";
import { LoginContext } from "../../../context";
import { ILoginContext } from "../../../interface";
import React from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { useRouter } from "next/router";

export const LoginForm = () => {
  const { payload, setPayload } = React.useContext(
    LoginContext
  ) as ILoginContext;

  const router = useRouter();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, payload.email, payload.password)
          .then(() => {
            router.push("/dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      }}
    >
      <Input.Email
        label="Email"
        value={payload.email}
        onChange={(event) => {
          setPayload({
            ...payload,
            email: event.target.value,
          });
        }}
        name="email"
        id="email"
        autoComplete="email"
        required={true}
      />
      <Input.Password
        value={payload.password}
        onChange={(event) => {
          setPayload({
            ...payload,
            password: event.target.value,
          });
        }}
        label="Password"
        name="current-password"
        id="current-password"
        type="current-password"
        autoComplete="current-password"
        required={true}
      />
      <Link href="/">Forgot Passsword?</Link>
      <br />
      <Spacer size={16} direction="vertical" />
      <Button.Primary>Sign in</Button.Primary>
      <Spacer size={8} direction="vertical" />
      <Button.SecondaryOutline
        onClick={() => {
          signInWithRedirect(auth, new GoogleAuthProvider()).then(() => {
            router.push("/dashboard");
          });
        }}
        type="button"
      >
        <FcGoogle size={16} />
        <span>Continue with Google</span>
      </Button.SecondaryOutline>
    </form>
  );
};
