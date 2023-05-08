import { RegisterContext } from "../../../context";
import { CREATE_ACCOUNT_STEP } from "../../../enum";
import { IRegisterContext } from "../../../interface";
import React from "react";
import { Button } from "../../button";
import { YOUR_DETAILS } from "./YOUR_DETAILS";
import { CHOOSE_A_PASSWORD } from "./CHOOSE_A_PASSWORD";

export const RegisterForm = () => {
  const { currentStep } = React.useContext(RegisterContext) as IRegisterContext;

  switch (currentStep) {
    case CREATE_ACCOUNT_STEP.YOUR_DETAILS:
      return <YOUR_DETAILS />;
    case CREATE_ACCOUNT_STEP.CHOOSE_A_PASSWORD:
      return <CHOOSE_A_PASSWORD />;
    default:
      return <></>;
  }
};
