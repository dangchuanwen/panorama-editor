import React from "react";
import { RouteProps, Route, Redirect } from "react-router";
import auth from "./auth";

const PublicRoute: React.FC<RouteProps> = ({...rest}) => {
  if (auth.isAuthenticated()) {
    return <Redirect to="/"/> 
  } else {
    return <Route {...rest}></Route>
  }
}

export default PublicRoute;