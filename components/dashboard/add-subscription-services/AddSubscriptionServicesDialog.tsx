import React from "react";
import { AddSubscriptionServicesContext } from "../../../context";
import { IAddSubscriptionServicesContext } from "../../../interface";
import { AddSubscriptionServicesForm } from "./AddSubscriptionServicesForm";
import styles from "./AddSubscriptionServices.module.css";
export const AddSubscriptionServicesDialog = () => {
  const { dialog } = React.useContext(
    AddSubscriptionServicesContext
  ) as IAddSubscriptionServicesContext;
  return (
    <dialog ref={dialog} className={styles.dialog}>
      <AddSubscriptionServicesForm />
    </dialog>
  );
};
