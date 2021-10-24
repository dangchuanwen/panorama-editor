import { FC } from "react";
import { Switch, Route, Redirect, useRouteMatch, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import Settings from "./components/Settings";
import Grouping from "./components/Grouping";
import CultureThemes from "./components/CultureThemes";
import TasksProcess from "./components/TasksProcess";
const { Header, Sider, Content } = Layout;
interface IMenu {
  value: string;
  path: string;
}
const Home: FC = () => {
  const { path } = useRouteMatch();

  const menus: IMenu[] = [
    { value: "系统设置", path: "/settings" },
    { value: "任务管理", path: "/tasks-process" },
    { value: "文化主题设置", path: "/culture-themes" },
    { value: "分组设置", path: "/grouping" },
  ];
  const renderMenus = () => {
    return (
      <Menu defaultSelectedKeys={[menus[0].value]}>
        {menus.map((menu) => {
          return (
            <Menu.Item key={menu.value}>
              <Link to={`${path}${menu.path}`}>{menu.value}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  };
  return (
    <Layout>
      <Header></Header>
      <Layout>
        <Sider>{renderMenus()}</Sider>
        <Content>
          <Switch>
            <Route path={`${path}/settings`}>
              <Settings />
            </Route>
            <Route path={`${path}/tasks-process`}>
              <TasksProcess />
            </Route>
            <Route path={`${path}/grouping`}>
              <Grouping />
            </Route>
            <Route path={`${path}/culture-themes`}>
              <CultureThemes />
            </Route>
            <Route path={path} exact>
              <Redirect to={`${path}/settings`} />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
