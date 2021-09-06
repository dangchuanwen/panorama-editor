import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import VR from 'assets/VR.png';

import { Wrapper, Container, LogoBox, Logo, HeaderBox, MenuBox, ContentBox } from 'layouts';
import Menu from 'pages/home/menu-module/index';
import { renderRoutes } from 'routes/index';
import { Box, Button } from '@material-ui/core';
import { useAuth } from 'auth/auth';
import useUser from 'hooks/useUser';

const Home: React.FC = () => {
  const { authContext } = useAuth();
  const { logout } = React.useContext(authContext);
  const user = useUser();
  const history = useHistory();
  const handleClickMenuItem = (path: string) => {
    history.push(path);
  };
  const handleClickLogOut: () => void = () => {
    logout();
    window.location.reload();
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
          <Box>
            <span style={{ fontWeight: 'bolder', fontSize: '1vw', marginRight: '1vw' }}>{user?.userName}</span>
            <Button onClick={handleClickLogOut}>退出</Button>
          </Box>
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
