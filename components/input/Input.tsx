import React from "react";
import { Email } from "./Email";
import { Password } from "./Password";
import { Text } from "./Text";
import { TextArea } from "./TextArea";
import { BaseInputProps } from "./input.interface";

type InputSubComponents = {
  Email: React.FC<BaseInputProps>;
  Password: React.FC<BaseInputProps>;
  Text: React.FC<BaseInputProps>;
  TextArea: React.FC<BaseInputProps>;
};

export const Input: InputSubComponents = {
  Email,
  Password,
  Text,
  TextArea,
};
