import React, { StatelessComponent } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { Home } from "../home";
import { ConnectedPrivateRoute } from "../route";
import { ConnectedLogin, ConnectedRegister } from "../user";

// Navbar, Search
// Folders, Notes, Note

const AppContainer = styled.div`
  height: 100vh;
`;

export const App: StatelessComponent<{}> = (): any => {
  return (
    <AppContainer>
      <Router>
        <Switch>
          <Route path="/register" component={ConnectedRegister} />
          <Route path="/login" component={ConnectedLogin} />
          <ConnectedPrivateRoute component={Home} />
        </Switch>
      </Router>
    </AppContainer>
  );
};
