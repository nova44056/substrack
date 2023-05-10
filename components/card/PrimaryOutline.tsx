import classNames from "classnames";
import styles from "./Card.module.css";
import { BaseCardProps } from "./card.interface";

export const PrimaryOutline = ({ children, ...props }: BaseCardProps) => {
  return (
    <div
      {...props}
      className={classNames(
        styles.card,
        props.className,
        styles.primaryOutline
      )}
      role="contentinfo"
    >
      {children}
    </div>
  );
};
