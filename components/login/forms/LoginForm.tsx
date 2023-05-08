import Link from "next/link";
import { Input } from "../../input";
import { Button } from "../../button";
import { Spacer } from "../../spacer";
import { FcGoogle } from "react-icons/fc";

export const LoginForm = () => {
  return (
    <form>
      <Input.Email
        label="Email"
        value=""
        name="email"
        id="email"
        autoComplete="email"
        required={true}
      />
      <Input.Password
        value=""
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
      <Button.SecondaryOutline>
        <FcGoogle size={16} />
        <span>Continue with Google</span>
      </Button.SecondaryOutline>
    </form>
  );
};
