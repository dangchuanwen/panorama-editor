import React from 'react';
import { Wrapper } from './styled';
import Operation from './components/Operation';
import Works from './components/Works';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
const Studio: React.FC = () => {
  const [openMsg, setOpenMsg] = React.useState(false);

  const handleConfirmCreate = () => {
    console.log('create');
    setOpenMsg(true);
  };
  return (
    <Wrapper>
      <Snackbar anchorOrigin={{ horizontal: 'center', vertical: 'top' }} open={openMsg} autoHideDuration={5000}>
        <Alert security="success">创建成功！</Alert>
      </Snackbar>
      <Operation onConfirm={handleConfirmCreate} />
      <Works />
    </Wrapper>
  );
};

export default Studio;
