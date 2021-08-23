import { Route, Redirect } from 'react-router-dom';
import { IHOCRoute } from 'interface';
import { useAuth } from 'auth/auth';
import { useContext } from 'react';

const ProtectedRoute: IHOCRoute = ({ ...rest }) => {
  const { authContext } = useAuth();
  const { authenticated } = useContext(authContext);
  if (authenticated) {
    return <Route {...rest}></Route>;
  } else {
    return <Redirect to="/signin" />;
  }
};

export default ProtectedRoute;
