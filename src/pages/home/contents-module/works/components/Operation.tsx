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
import { message } from 'antd';
interface Props {
  onConfirm: (workName: string) => void;
}
const Operation: React.FC<Props> = ({ onConfirm }: Props) => {
  const [showDialog, setShowDialog] = React.useState<boolean>(false);
  const [workName, setWorkName] = React.useState<string>('');
  const handleClickCreate = () => {
    setShowDialog(true);
  };
  React.useEffect(() => {
    setWorkName('');
  }, [showDialog]);
  const handleClickConfirm = () => {
    if (!workName.trim()) {
      message.warn('请输入一个作品名');
      return;
    }
    onConfirm(workName);
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
          <TextField
            type="text"
            value={workName}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => setWorkName(e.target.value)}
          />
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
