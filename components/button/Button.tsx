import React from "react";
import { BaseButtonProps } from "./button.interface";
import { Primary } from "./Primary";
import { Secondary } from "./Secondary";
import { SecondaryOutline } from "./SecondaryOutline";

type ButtonSubComponents = {
  Primary: React.FC<BaseButtonProps>;
  Secondary: React.FC<BaseButtonProps>;
  SecondaryOutline: React.FC<BaseButtonProps>;
};

export const Button: ButtonSubComponents = {
  Primary,
  Secondary,
  SecondaryOutline,
};
