import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "./auth/protected.route";
import PublicRoute from "./auth/public.route";

import Home from "./pages/Home/index";
import SignIn from "./pages/SignIn/index";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home"/>
          </Route>
          
          {/* <Route path="/signin" component={SignIn}/>
            
          <Route path="/home" component={Home}/> */}
          <PublicRoute path="/signin" component={SignIn}/>
          <ProtectedRoute path="/home" component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
