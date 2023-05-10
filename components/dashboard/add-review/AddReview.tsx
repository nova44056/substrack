import React from "react";
import { Button } from "../../button";
import { AddReviewContext } from "../../../context";
import { AddReviewDialog } from "./AddReviewDialog";

type Props = {
  subscriptionServiceId: string;
};

export const AddReview = (props: Props) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const dialog = React.useRef<HTMLDialogElement>(null);

  return (
    <AddReviewContext.Provider
      value={{
        openDialog,
        setOpenDialog,
        dialog,
        subscriptionServiceId: props.subscriptionServiceId,
      }}
    >
      <Button.SecondaryOutline
        type="button"
        onClick={() => {
          dialog.current?.showModal();
        }}
      >
        Add Review
      </Button.SecondaryOutline>
      <AddReviewDialog />
    </AddReviewContext.Provider>
  );
};
