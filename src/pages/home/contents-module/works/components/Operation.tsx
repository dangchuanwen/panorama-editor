import React from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { OperationWrapper } from '../styled';
interface Props {
  onConfirm: () => void;
}
const Operation: React.FC<Props> = ({ onConfirm }: Props) => {
  const [showDialog, setShowDialog] = React.useState<boolean>(false);
  const handleClickCreate = () => {
    setShowDialog(true);
  };
  const handleClickConfirm = () => {
    onConfirm();
    setShowDialog(false);
  };
  const handleClickCancel = () => {
    setShowDialog(false);
  };
  return (
    <OperationWrapper>
      <Button variant="contained" color="primary" size="large" onClick={handleClickCreate}>
        创建全景漫游
      </Button>
      <Dialog open={showDialog}>
        <DialogTitle>创建作品</DialogTitle>
        <DialogContent>
          <DialogContentText>请为该作品起个名字</DialogContentText>
          <TextField type="text" />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClickCancel}>
            取消
          </Button>
          <Button color="primary" onClick={handleClickConfirm}>
            创建
          </Button>
        </DialogActions>
      </Dialog>
    </OperationWrapper>
  );
};

export default Operation;
