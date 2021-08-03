import { BrowserRouter as Router, Switch } from 'react-router-dom';
import SignUp from './pages/signup/SignUp';
import SignIn from './pages/signin/SignIn';
import Home from './pages/home/Home';
import ProtectedRoute from './protected.route';
import PublicRoute from './public.route';

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <Switch>
          <ProtectedRoute exact path="/">
            <Home />
          </ProtectedRoute>
          <PublicRoute path="/signin">
            <SignIn />
          </PublicRoute>
          <PublicRoute path="/signup">
            <SignUp />
          </PublicRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
