import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';

interface Props {
  open: boolean;
  title: string;
  text: string;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const Confirm: React.FC<Props> = ({ open, onClose, onCancel, onConfirm, title, text }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} variant="contained" color="primary">
          确定
        </Button>
        <Button onClick={onCancel} variant="contained">
          取消
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirm;
