import React from 'react';

import { Wrapper, Image, ImageBox, SliderBox } from './styled';

import classes from './classes.module.css';
import { IPanoramaImage } from 'pages/studio/state/state';

interface Props {
  images: IPanoramaImage[];
  onClickImage: (image: IPanoramaImage) => void;
}

const ImageList: React.FC<Props> = ({ images, onClickImage }: Props) => {
  const renderImages = () => {
    return images.map((image) => {
      return (
        <ImageBox
          onClick={() => onClickImage(image)}
          key={image.id}
          className={image.activated ? classes.activated : ''}
        >
          <SliderBox>
            <Image src={image.url} alt={image.url} />
          </SliderBox>
        </ImageBox>
      );
    });
  };
  return <Wrapper>{renderImages()}</Wrapper>;
};

export default ImageList;
