import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import { MenuItem, MenuIcon } from 'pages/home/menu-module/styled';
import { SettingsContext } from 'settings';
import { Settings, SwitchNames } from 'requests/requests';

interface MenuItem {
  iconClass: string;
  pathname: string;
  switchName?: SwitchNames;
  switch?: boolean;
}

const getMenuConfig: (settings: Settings) => MenuItem[] = (settings: Settings) => {
  const menuConfig: MenuItem[] = [
    {
      pathname: '/dashboard',
      iconClass: 'icon-shouye',
      switch: true,
    },
    {
      pathname: '/dashboard/works',
      iconClass: 'icon-kaifataojian',
      switch: settings.showStudio,
      switchName: 'showStudio',
    },
    {
      pathname: '/dashboard/exhibition',
      iconClass: 'icon-VR',
      switch: settings.showPlayground,
      switchName: 'showPlayground',
    },
    {
      pathname: '/dashboard/friends',
      iconClass: 'icon-haoyou1',
      switch: settings.showFriends,
      switchName: 'showFriends',
    },
    {
      pathname: '/dashboard/settings',
      iconClass: 'icon-shezhi',
      switch: settings.showSettings,
      switchName: 'showSettings',
    },
  ];
  return menuConfig;
};
interface Props {
  /** callback function when user click a menu */
  onClickMenuItem: (index: string) => void;
}

const Menu: React.FC<Props> = ({ onClickMenuItem }: Props) => {
  const { pathname } = useLocation();
  const settings = useContext(SettingsContext);
  const menuConfig = (settings && getMenuConfig(settings)) || [];
  const handleClickMenuItem = (path: string) => {
    onClickMenuItem(path);
  };
  const renderMenu: () => React.ReactNode[] = () => {
    return menuConfig.map((item) => {
      if (!item.switch) return;
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
