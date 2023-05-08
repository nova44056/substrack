import React from "react";
import { RegisterContext } from "../../../context";
import { IRegisterContext } from "../../../interface";
import { CREATE_ACCOUNT_STEP } from "../../../enum";
import { Button } from "../../button";
import { Input } from "../../input";
import { Spacer } from "../../spacer";

export const YOUR_DETAILS = () => {
  const { setCurrentStep, payload, setPayload } = React.useContext(
    RegisterContext
  ) as IRegisterContext;

  const form = React.useRef<HTMLFormElement>(null);
  return (
    <form
      ref={form}
      onSubmit={() => {
        if (form.current?.reportValidity())
          setCurrentStep(CREATE_ACCOUNT_STEP.CHOOSE_A_PASSWORD);
      }}
    >
      <Input.Text
        label="First name"
        value={payload.firstName}
        onInput={(event) => {
          event.currentTarget.setCustomValidity("");
        }}
        onChange={(event) => {
          setPayload({
            ...payload,
            firstName: event.target.value,
          });
        }}
        name="given-name"
        id="given-name"
        autoComplete="given-name"
        required={true}
      />
      <Spacer size={16} direction="vertical" />
      <Input.Text
        label="Last name"
        value={payload.lastName}
        onChange={(e) => {
          setPayload({
            ...payload,
            lastName: e.target.value,
          });
        }}
        name="family-name"
        id="family-name"
        autoComplete="family-name"
        required={true}
      />
      <Spacer size={16} direction="vertical" />
      <Input.Email
        label="Email"
        value={payload.email}
        onChange={(e) => {
          setPayload({
            ...payload,
            email: e.target.value,
          });
        }}
        name="email"
        id="email"
        autoComplete="email"
        required={true}
      />
      <Spacer size={16} direction="vertical" />
      <Button.Primary>Next step</Button.Primary>
    </form>
  );
};
