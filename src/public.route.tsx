import { Route, Redirect } from 'react-router';
import { IHOCRoute } from 'interface';
import auth from './auth/auth';

const PublicRoute: IHOCRoute = ({ ...rest }) => {
  if (auth.isAuthenticated()) {
    return <Redirect to="/" />;
  } else {
    return <Route {...rest}></Route>;
  }
};

export default PublicRoute;
