export type BaseInputProps = {
  autoComplete: string;
  id: string;
  label: string;
  required: boolean;
  value: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type TextAreaProps = {
  label: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;
