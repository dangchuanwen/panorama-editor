import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import auth from './auth';

const ProtectedRoute: React.FC<RouteProps> = ({ ...rest }) => {
  if (auth.isAuthenticated()) {
    return <Route {...rest}></Route>;
  } else {
    return <Redirect to="/signin" />;
  }
};

export default ProtectedRoute;
