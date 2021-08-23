import React from 'react';
import UploadButton from 'components/UploadButton';
import ImageList from './components/ImageList';
import * as qiniu from 'qiniu-js';
import { QiniuCompeleteRes } from 'interface';
import { Wrapper } from './styled';
import { Button, CircularProgress, Backdrop } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import classes from './classes.module.css';
import { StudioContext } from 'pages/studio/state/context';
import { IPanoramaImage } from 'pages/studio/state/state';
import { getQiniuToken } from 'requests/requests';

const ImagesBar: React.FC = () => {
  const { panoramaImages, removeImage, switchImage, addImage } = React.useContext(StudioContext);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [token, setToken] = React.useState<string>('');
  const uploadFile = async (file: File) => {
    return new Promise<QiniuCompeleteRes>((resolve, reject) => {
      const observer = {
        error(err: unknown) {
          reject(err);
        },
        complete(res: QiniuCompeleteRes) {
          resolve(res);
        },
      };
      const observable = qiniu.upload(file, undefined, token);
      observable.subscribe(observer);
    });
  };

  const handleClickDelete = (activatedImage: IPanoramaImage | undefined) => {
    if (activatedImage) {
      removeImage(activatedImage.id);
    }
  };

  const handleClickImage: (image: IPanoramaImage) => void = (image: IPanoramaImage) => {
    switchImage(image.id);
  };

  const handleChooseFile = async (files: FileList | null) => {
    if (files && files[0]) {
      try {
        setLoading(true);
        const res: QiniuCompeleteRes = await uploadFile(files[0]);
        const url = process.env.REACT_APP_IMAGE_PREFIX + '/' + res.hash;
        addImage(url);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  React.useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await getQiniuToken();
        setToken(res.data);
      } catch (err) {}
    };
    fetchToken();
  }, []);
  return (
    <>
      <Wrapper>
        <UploadButton text="导入图片" onChooseImage={handleChooseFile} />
        <ImageList onClickImage={handleClickImage} images={panoramaImages} />
        <Button
          onClick={() => handleClickDelete(panoramaImages.find((item) => item.activated))}
          variant="contained"
          fullWidth
          color="secondary"
          startIcon={<DeleteIcon />}
        >
          删除
        </Button>
      </Wrapper>
      <Backdrop open={loading} className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ImagesBar;
