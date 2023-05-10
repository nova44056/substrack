export interface IAddReviewContext {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  dialog: React.RefObject<HTMLDialogElement>;
  subscriptionServiceId: string;
}
