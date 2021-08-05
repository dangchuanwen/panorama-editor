import { Route, Redirect } from 'react-router-dom';
import { IHOCRoute } from 'interface';
import auth from './auth/auth';

const ProtectedRoute: IHOCRoute = ({ ...rest }) => {
  if (auth.isAuthenticated()) {
    return <Route {...rest}></Route>;
  } else {
    return <Redirect to="/signin" />;
  }
};

export default ProtectedRoute;
