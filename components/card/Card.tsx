import { Primary } from "./Primary";
import { Secondary } from "./Secondary";
import { SecondaryOutline } from "./SecondaryOutline";
import { PrimaryOutline } from "./PrimaryOutline";
import { BaseCardProps } from "./card.interface";

type CardSubComponents = {
  Primary: React.FC<BaseCardProps>;
  Secondary: React.FC<BaseCardProps>;
  SecondaryOutline: React.FC<BaseCardProps>;
  PrimaryOutline: React.FC<BaseCardProps>;
};

export const Card: CardSubComponents = {
  Primary,
  Secondary,
  SecondaryOutline,
  PrimaryOutline,
};
