import React, { useContext } from 'react';
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
import { LanguageContext } from 'language';
interface Props {
  onConfirm: (workName: string) => void;
}
const Operation: React.FC<Props> = ({ onConfirm }: Props) => {
  const { languagePackage } = useContext(LanguageContext);
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
        {languagePackage?.CreatePanoramicTour}
      </Button>
      <Dialog open={showDialog}>
        <DialogTitle>{languagePackage?.CreateWork}</DialogTitle>
        <DialogContent>
          <DialogContentText>{languagePackage?.PleaseGiveANameForWork}</DialogContentText>
          <TextField
            type="text"
            value={workName}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => setWorkName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClickCancel}>
            {languagePackage?.Cancel}
          </Button>
          <Button color="primary" onClick={handleClickConfirm}>
            {languagePackage?.Create}
          </Button>
        </DialogActions>
      </Dialog>
    </OperationWrapper>
  );
};

export default Operation;
