import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Routes: React.SFC = () => (
  <Router>
    <Switch>
      <Route path="/register" component={RegisterScreen} />
      <Route path="/login" component={LoginScreen} />
      <PrivateRoute component={HomeScreen} />
    </Switch>
  </Router>
);

export default Routes;
