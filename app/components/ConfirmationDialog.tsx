import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface IConfirmationDialogParams {
  open: boolean;
  onClose: Function;
  onConfirm: Function;
  title: string;
  message: string;
}

function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
}: IConfirmationDialogParams) {
  const _onClose = (_e: {}, _r: string) => onClose();
  const _onCancel = (_e: React.MouseEvent<HTMLButtonElement>) => onClose();
  const _onConfirm = (_e: React.MouseEvent<HTMLButtonElement>) => onConfirm();
  return (
    <Dialog
      open={open}
      onClose={_onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={_onCancel}>Cancel</Button>
        <Button onClick={_onConfirm} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
