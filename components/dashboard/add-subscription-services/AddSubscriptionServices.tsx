import { AddSubscriptionServicesContext } from "../../../context";
import React from "react";
import { AddSubscriptionServicesDialog } from "./AddSubscriptionServicesDialog";
import { Button } from "../../button";

export const AddSubscriptionServices = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const dialog = React.useRef<HTMLDialogElement>(null);

  return (
    <AddSubscriptionServicesContext.Provider
      value={{ openDialog, setOpenDialog, dialog }}
    >
      <Button.Primary
        style={{ width: "auto" }}
        type="button"
        onClick={() => {
          dialog.current?.showModal();
        }}
      >
        Add Subscription
      </Button.Primary>
      <AddSubscriptionServicesDialog />
    </AddSubscriptionServicesContext.Provider>
  );
};
