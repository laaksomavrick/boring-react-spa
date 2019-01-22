import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "../home";
import { Login, Register } from "../user";

// Navbar, Search
// Folders, Notes, Note

export class App extends Component {

  // todo better way for 100vh; component; styled components?

  render() {
    return (
      <div style={{height: "100vh"}}>
      <Router>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route component={Home} />
        </Switch>
      </Router>
      </div>
    );
  }
}
