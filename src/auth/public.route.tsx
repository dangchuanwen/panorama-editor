import { FC, useContext } from "react";
import { RouteProps, useLocation } from "react-router";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./index";

const PublicRoute: FC<RouteProps> = ({ ...rest }) => {
  const { pathname } = useLocation();
  const { authenticated } = useContext(AuthContext);
  if (authenticated) {
    return <Redirect from={pathname} to="/backstage/home" />;
  } else {
    return <Route {...rest}></Route>;
  }
};

export default PublicRoute;
