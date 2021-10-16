import React from 'react';
import { useLocation } from 'react-router';
import { MenuItem, MenuIcon } from 'pages/home/menu-module/styled';

interface MenuItem {
  iconClass: string;
  pathname: string;
}

interface Props {
  /** callback function when user click a menu */
  onClickMenuItem: (index: string) => void;
}
const menuConfig: MenuItem[] = [
  {
    pathname: '/dashboard/works',
    iconClass: 'icon-kaifataojian',
  },
  {
    pathname: '/dashboard/exhibition',
    iconClass: 'icon-VR',
  },
  {
    pathname: '/dashboard/friends',
    iconClass: 'icon-haoyou1',
  },
  {
    pathname: '/dashboard/settings',
    iconClass: 'icon-shezhi',
  },
];
const Menu: React.FC<Props> = ({ onClickMenuItem }: Props) => {
  const { pathname } = useLocation();
  const handleClickMenuItem = (path: string) => {
    onClickMenuItem(path);
  };
  const renderMenu: () => React.ReactNode[] = () => {
    return menuConfig.map((item) => {
      const activated = item.pathname === pathname;
      return (
        <MenuItem
          key={item.iconClass}
          style={{ backgroundColor: activated ? '#F1619B' : 'transparent' }}
          onClick={() => handleClickMenuItem(item.pathname)}
        >
          <MenuIcon className={`iconfont ${item.iconClass}`} style={{ color: activated ? 'white' : 'gray' }}></MenuIcon>
        </MenuItem>
      );
    });
  };
  return <>{renderMenu()}</>;
};

export default Menu;
