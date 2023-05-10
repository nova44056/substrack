import classNames from "classnames";
import styles from "./Button.module.css";
import { BaseButtonProps } from "./button.interface";

export const PrimaryOutline: React.FC<BaseButtonProps> = (
  props: BaseButtonProps
) => {
  return (
    <button
      {...props}
      className={classNames(
        styles.button,
        styles.primary,
        props.className,
        styles.primaryOutline
      )}
    >
      {props.children}
    </button>
  );
};
