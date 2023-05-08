import classNames from "classnames";
import styles from "./Input.module.css";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextArea: React.FC<TextAreaProps> = (props: TextAreaProps) => {
  return (
    <>
      <label htmlFor={props.id}>
        <span>{props.label}</span>
        {props.required && <span style={{ color: "red" }}>*</span>}
      </label>
      <br />
      <textarea
        {...props}
        rows={5}
        cols={40}
        className={classNames(props.className, styles.input)}
      />
    </>
  );
};
