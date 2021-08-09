import React from 'react';
import VR from 'assets/VR.png';
import { Box } from '@material-ui/core';
import { Wrapper, Container, LogoBox, Logo, HeaderBox, MenuBox, ContentBox } from 'layouts';
import UploadButton from 'components/UploadButton';
import Tools from './modules/tool-bar';
import Properties from './modules/property-bar';
import Canvas from './modules/canvas';
import classes from './index.module.css';

const Studio: React.FC = () => {
  const handleChooseFile = (files: FileList | null) => {
    console.log(files);
  };

  return (
    <Wrapper>
      <Container maxWidth={false} className={classes.container}>
        <LogoBox>
          <Logo src={VR} />
        </LogoBox>
        <HeaderBox>
          <h2>制作你的全景漫游</h2>
        </HeaderBox>
        <MenuBox>
          <UploadButton text="导入图片" onChooseImage={handleChooseFile} />
        </MenuBox>
        <ContentBox className={classes.contentLayout}>
          <Box gridArea="tools" padding="5px 20px" border="1px solid #d1caca" borderRadius="10px">
            <Tools />
          </Box>
          <Box gridArea="canvas">
            <Canvas />
          </Box>
          <Box gridArea="properties">
            <Properties />
          </Box>
        </ContentBox>
      </Container>
    </Wrapper>
  );
};

export default Studio;
