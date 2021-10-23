import { FC, useContext } from "react";
import { RouteProps, useLocation } from "react-router";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./index";

const ProtectedRoute: FC<RouteProps> = ({ ...rest }) => {
  const { pathname } = useLocation();
  const { authenticated } = useContext(AuthContext);
  if (authenticated) {
    return <Route {...rest}></Route>;
  } else {
    return <Redirect from={pathname} to="/backstage/signin" />;
  }
};

export default ProtectedRoute;
