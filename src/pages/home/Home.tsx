import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import VR from 'assets/VR.png';

import { Wrapper, Container, LogoBox, Logo, HeaderBox, MenuBox, ContentBox } from 'layouts';
import Menu from 'pages/home/menu-module/index';
import { renderRoutes } from 'routes/index';

const Home: React.FC = () => {
  const history = useHistory();
  const handleClickMenuItem = (path: string) => {
    history.push(path);
  };
  const { path } = useRouteMatch();
  return (
    <Wrapper>
      <Container maxWidth={false}>
        <LogoBox>
          <Logo src={VR} />
        </LogoBox>
        <HeaderBox>
          <h2>欢迎来到全景漫游世界</h2>
        </HeaderBox>
        <MenuBox>
          <Menu onClickMenuItem={handleClickMenuItem} />
        </MenuBox>
        <ContentBox>{renderRoutes(path)}</ContentBox>
      </Container>
    </Wrapper>
  );
};

export default Home;
