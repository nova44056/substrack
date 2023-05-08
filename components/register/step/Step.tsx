import styles from "./Step.module.css";
import React from "react";
import { RegisterContext } from "../../../context";
import { IRegisterContext } from "../../../interface";

type Props = {
  title: string;
  description: string;
};

export const Step = ({ title, description }: Props) => {
  const { currentStep } = React.useContext(RegisterContext) as IRegisterContext;

  return (
    <div
      className={currentStep === description ? styles.active : styles.inactive}
    >
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
