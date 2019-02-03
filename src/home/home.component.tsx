import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import { startUp, ThunkHandler } from "../app";
import { ApplicationState } from "../app/app.reducer";
import { getMe, User } from "../user/redux/user.actions";

interface Props extends RouteComponentProps<{}> {
  user: User;
  startUp: (user: User) => Promise<ThunkHandler>;
  getMe: () => Promise<ThunkHandler>;
}

class Home extends Component<Props, {}> {
  public state = {};

  public constructor(props: Props) {
    super(props);
  }

  public async componentWillMount() {
    const { startUp, getMe } = this.props;
    await getMe();
    const { user } = this.props;
    await startUp(user);
  }

  public render() {
    const name = this.props.user ? this.props.user.email : null;
    return <h1>Hello, {name}!</h1>;
  }
}

const mapStateToProps = (state: ApplicationState): any => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): object => {
  return {
    startUp: async (user: User): Promise<ThunkHandler> => dispatch(startUp(user)),
    getMe: async (): Promise<ThunkHandler> => dispatch(getMe()),
  };
};

export const ConnectedHome = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Home),
);
