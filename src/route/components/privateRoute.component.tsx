import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";
import { ApplicationState } from "../../app/app.reducer";

interface Props extends RouteProps {
  authorized?: boolean;
}

class PrivateRoute extends Route<Props> {
  public render() {
    const { authorized } = this.props;
    if (authorized) {
      return <Route {...this.props} />;
    } else {
      const renderComponent = (): any => <Redirect to={{ pathname: "/login" }} />;
      return <Route {...this.props} component={renderComponent} render={undefined} />;
    }
  }
}

const mapStateToProps = (state: ApplicationState): any => {
  return {
    authorized: state.userState.auth !== null,
  };
};

export const ConnectedPrivateRoute = connect(
  mapStateToProps,
  null,
)(PrivateRoute);
