import { Box, Input } from '@material-ui/core';
import { ChangeEvent, FC } from 'react';

interface Props {
  triggerElement: JSX.Element | JSX.Element[];
  handleChooseFile: (file: File | null) => void;
}
const UploadFile: FC<Props> = ({ triggerElement, handleChooseFile }: Props) => {
  return (
    <Box>
      <label htmlFor="form-trigger-element">{triggerElement}</label>
      <Input
        type="file"
        id="form-trigger-element"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleChooseFile(e.target.files && e.target.files[0]);
        }}
        style={{ display: 'none' }}
      />
    </Box>
  );
};

export default UploadFile;
