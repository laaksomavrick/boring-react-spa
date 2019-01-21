import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "../home";
import { Login, Register } from "../user";

// Navbar, Search
// Folders, Notes, Note

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route component={Home} />
        </Switch>
      </Router>
    );
  }
}
