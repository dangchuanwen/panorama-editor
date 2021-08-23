import { Route, Redirect } from 'react-router';
import { IHOCRoute } from 'interface';
import { useAuth } from 'auth/auth';
import { useContext } from 'react';

const PublicRoute: IHOCRoute = ({ ...rest }) => {
  const { authContext } = useAuth();
  const { authenticated } = useContext(authContext);
  if (authenticated) {
    return <Redirect to="/" />;
  } else {
    return <Route {...rest}></Route>;
  }
};

export default PublicRoute;
