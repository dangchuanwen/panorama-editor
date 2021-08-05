import React from 'react';
import VR from 'assets/VR.png';
import { Wrapper, Container, LogoBox, Logo, HeaderBox, MenuBox, ContentBox } from 'layouts';
import UploadButton from 'components/UploadButton';
const containerStyle = { gridTemplateColumns: '8vw calc(100% - 8vw)', gridTemplateRows: '5vw calc(100% - 5vw)' };
const Studio: React.FC = () => {
  const handleChooseFile = (files: FileList | null) => {
    console.log(files);
  };
  return (
    <Wrapper>
      <Container maxWidth={false} style={containerStyle}>
        <LogoBox>
          <Logo src={VR} />
        </LogoBox>
        <HeaderBox>
          <h2>制作你的全景漫游</h2>
        </HeaderBox>
        <MenuBox>
          <UploadButton text="导入图片" onChooseImage={handleChooseFile} />
        </MenuBox>
        <ContentBox>Content</ContentBox>
      </Container>
    </Wrapper>
  );
};

export default Studio;
