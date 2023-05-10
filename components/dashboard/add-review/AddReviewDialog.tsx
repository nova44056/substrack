import React from "react";
import styles from "./AddReview.module.css";
import { AddReviewContext } from "../../../context";
import { IAddReviewContext } from "../../../interface";
import { AddReviewForm } from "./AddReviewForm";
export const AddReviewDialog = () => {
  const { dialog } = React.useContext(AddReviewContext) as IAddReviewContext;
  return (
    <dialog ref={dialog} className={styles.dialog}>
      <AddReviewForm />
    </dialog>
  );
};
