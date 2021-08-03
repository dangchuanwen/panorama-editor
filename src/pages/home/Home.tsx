import React from 'react';
import { Route, Switch, useRouteMatch, useHistory, Redirect } from 'react-router-dom';
import VR from '../../assets/VR.png';

import { Wrapper, Container, LogoBox, Logo, HeaderBox, MenuBox, ContentBox } from './components';
import Menu from './Menu.module';

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
        <ContentBox>
          <Switch>
            <Route exact path={path}>
              <Redirect to={`${path}/studio`} />
            </Route>
            <Route path={`${path}/studio`}>Studio</Route>
            <Route path={`${path}/exhibition`}>Exhibition</Route>
            <Route path={`${path}/friends`}>Friends</Route>
          </Switch>
        </ContentBox>
      </Container>
    </Wrapper>
  );
};

export default Home;
