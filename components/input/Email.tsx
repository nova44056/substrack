import classNames from "classnames";
import { BaseInputProps } from "./input.interface";
import styles from "./Input.module.css";

export const Email: React.FC<BaseInputProps> = (props: BaseInputProps) => {
  return (
    <>
      <label htmlFor={props.name}>
        <span>{props.label}</span>
        {props.required && <span style={{ color: "red" }}>*</span>}
      </label>
      <br />
      <input
        {...props}
        className={classNames(styles.input, props.className)}
        required={props.required}
        type="email"
        autoComplete={props.autoComplete}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
      />
    </>
  );
};
