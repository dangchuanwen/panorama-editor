import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProtectedRoute from "./auth/protected.route";
import PublicRoute from "./auth/public.route";

import Home from "./pages/Home/index";
import SignIn from "./pages/SignIn/index";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/backstage" exact>
            <Redirect to="/backstage/home" />
          </Route>
          <PublicRoute path="/backstage/signin" component={SignIn} />
          <ProtectedRoute path="/backstage/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
