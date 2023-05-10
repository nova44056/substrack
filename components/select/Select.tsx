import styles from "./Select.module.css";

type Option = {
  label: string;
  value: any;
};

type Props = {
  label: string;
  options: Option[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = ({ label, ...props }: Props) => {
  return (
    <>
      <label htmlFor={props.id}>
        <span>{label}</span>
        <span style={{ color: "red" }}>*</span>
      </label>
      <br />
      <select className={styles.select} required {...props}>
        <option disabled selected value="">
          -- Select an option --
        </option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};
