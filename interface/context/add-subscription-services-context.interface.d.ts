export interface IAddSubscriptionServicesContext {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  dialog: React.RefObject<HTMLDialogElement>;
}
