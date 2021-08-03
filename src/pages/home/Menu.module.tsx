import React from "react";
import { MenuItem, MenuIcon } from "./components";
export interface MenuItem {
  activated: boolean;
  iconClass: string;
}

interface Props {
  menuConfig: MenuItem[];
  onClickMenuItem: (index: number) => void;
}

const Menu: React.FC<Props> = ({menuConfig, onClickMenuItem}: Props) => {
  const handleClickMenuItem = (index: number) => {
    onClickMenuItem(index);
  }
  const renderMenu: () => React.ReactNode[] = () => {
    return menuConfig.map((item, index) => {
      return <MenuItem
        key={item.iconClass}
        style={{backgroundColor: item.activated ? '#F1619B' : 'transparent'}}
        onClick={() => handleClickMenuItem(index)}>
        <MenuIcon 
         className={`iconfont ${item.iconClass}`}
         style={{color: item.activated ? 'white' : 'gray'}}></MenuIcon>
      </MenuItem>
    }); 
  }
  return <>{renderMenu()}</>
}

export default Menu;