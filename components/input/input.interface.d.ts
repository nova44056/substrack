export type BaseInputProps = {
  autoComplete: string;
  id: string;
  label: string;
  required: boolean;
  value: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
