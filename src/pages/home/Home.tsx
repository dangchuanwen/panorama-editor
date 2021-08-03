import React from 'react';

import VR from '../../assets/VR.png';

import { 
  Wrapper, 
  Container, 
  LogoBox, 
  Logo, 
  HeaderBox, 
  MenuBox, 
  ContentBox,
  MenuItem
} from './components';
import Menu from './Menu.module';

interface MenuItem {
  activated: boolean;
  iconClass: string;
}

const Home: React.FC = () => {
  const [menuConfig, setMenuConfig] = React.useState<MenuItem[]>([
    {
      activated: true,
      iconClass: 'icon-kaifataojian'
    },
    {
      activated: false,
      iconClass: 'icon-VR'
    },
    {
      activated: false,
      iconClass: 'icon-haoyou1'
    }
  ]);
  const handleClickMenuItem = (targetIndex: number) => {
    const newMenuConfig = menuConfig.map((menu, index) => {
      menu.activated = index === targetIndex ? true : false;
      return menu;
    }); 
    setMenuConfig(newMenuConfig);
  }
  return (
    <Wrapper>
      <Container maxWidth={false}>
        <LogoBox>
          <Logo src={VR}/>
        </LogoBox>
        <HeaderBox>
          <h2>欢迎来到全景漫游世界</h2>
        </HeaderBox>
        <MenuBox>
          <Menu menuConfig={menuConfig} onClickMenuItem={handleClickMenuItem}/>
        </MenuBox>
        <ContentBox>4</ContentBox>
      </Container>
    </Wrapper>
  );
};

export default Home;
