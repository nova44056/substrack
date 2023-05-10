import classNames from "classnames";
import styles from "./Card.module.css";
import { BaseCardProps } from "./card.interface";

export const SecondaryOutline = ({ children, ...props }: BaseCardProps) => {
  return (
    <div
      {...props}
      className={classNames(
        styles.card,
        props.className,
        styles.secondaryOutline
      )}
      role="contentinfo"
    >
      {children}
    </div>
  );
};
