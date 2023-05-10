import classNames from "classnames";
import styles from "./Card.module.css";
import { BaseCardProps } from "./card.interface";

export const Primary = ({ children, ...props }: BaseCardProps) => {
  return (
    <div
      {...props}
      className={classNames(styles.card, props.className, styles.primary)}
      role={props.role || "contentinfo"}
    >
      {children}
    </div>
  );
};
