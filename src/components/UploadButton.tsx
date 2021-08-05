import React from 'react';
import { Button, Box } from '@material-ui/core';
import { CloudUpload as CloudUploadIcon } from '@material-ui/icons';
import { FileInput } from './styled';

interface Props {
  text: string;
  onChooseImage: (files: FileList | null) => void;
}

const UploadButton: React.FC<Props> = ({ text, onChooseImage }: Props) => {
  const handleChooseImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChooseImage(e.target.files);
  };
  return (
    <Box>
      <FileInput onInput={handleChooseImage} accept="image/*" id="contained-button-file" type="file" />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
          {text}
        </Button>
      </label>
    </Box>
  );
};

export default UploadButton;
