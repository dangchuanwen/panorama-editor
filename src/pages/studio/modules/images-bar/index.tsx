import React from 'react';
import UploadButton from 'components/UploadButton';
import ImageList, { IImage } from './components/ImageList';
import * as qiniu from 'qiniu-js';
import { QiniuCompeleteRes } from 'interface';
import { generateUniqueId } from 'utils';
import { Wrapper } from './styled';
import { Button, CircularProgress, Backdrop } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import classes from './classes.module.css';
const ImagesBar: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [images, setImages] = React.useState<IImage[]>([]);
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

  const handleClickDelete: () => void = () => {
    const newImages = images.filter((item) => !item.activated);
    setImages(newImages);
  };

  const handleClickImage: (name: string) => void = (name: string) => {
    const newImages = images.map((item) => {
      item.activated = item.name === name;
      return item;
    });
    setImages(newImages);
  };

  const handleChooseFile = async (files: FileList | null) => {
    if (files && files[0]) {
      try {
        setLoading(true);
        const res: QiniuCompeleteRes = await uploadFile(files[0]);
        setImages(
          images.concat({
            name: generateUniqueId(),
            url: process.env.REACT_APP_IMAGE_PREFIX + '/' + res.hash,
            isEntry: images.length === 0,
            activated: images.length === 0,
          }),
        );
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  React.useEffect(() => {
    const fetchToken = async () => {
      const res = await fetch('/token');
      const data = await res.json();
      setToken(data.token);
    };
    fetchToken();
  }, []);
  return (
    <>
      <Wrapper>
        <UploadButton text="导入图片" onChooseImage={handleChooseFile} />
        <ImageList onClickImage={handleClickImage} images={images} />
        <Button onClick={handleClickDelete} variant="contained" fullWidth color="secondary" startIcon={<DeleteIcon />}>
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
