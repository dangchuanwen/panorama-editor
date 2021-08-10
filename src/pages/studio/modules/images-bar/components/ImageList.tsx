import React from 'react';

import { Wrapper, Image, ImageBox, SliderBox } from './styled';

import classes from './classes.module.css';
export interface IImage {
  name: string;
  url: string;
  isEntry: boolean;
  activated: boolean;
}
interface Props {
  images: IImage[];
  onClickImage: (name: string) => void;
}

const ImageList: React.FC<Props> = ({ images, onClickImage }: Props) => {
  const renderImages = () => {
    return images.map((image) => {
      return (
        <ImageBox
          onClick={() => onClickImage(image.name)}
          key={image.name}
          className={image.activated ? classes.activated : ''}
        >
          <SliderBox>
            <Image src={image.url} alt={image.name} />
          </SliderBox>
        </ImageBox>
      );
    });
  };
  return <Wrapper>{renderImages()}</Wrapper>;
};

export default ImageList;
