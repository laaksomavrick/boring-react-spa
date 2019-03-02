import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
// import { ConnectedHome } from "../../home";
// import { ConnectedLogin, ConnectedRegister } from "../../user";
// import { ConnectedPrivateRoute } from "./privateRoute.component";

const Routes: React.SFC = () => (
  <Router>
    <Switch>
      <Route path="/register" component={RegisterScreen} />
      <Route path="/login" component={LoginScreen} />
      {/* <ConnectedPrivateRoute component={ConnectedHome} /> */}
    </Switch>
  </Router>
);

export default Routes;
