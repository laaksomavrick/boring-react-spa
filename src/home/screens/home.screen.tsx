import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import { startUp, ThunkHandler } from "../../app";
import { ApplicationState } from "../../app/app.reducer";
import { Folder } from "../../folders";
import { getMe, User } from "../../user/redux/user.actions";
import { HomeContainer } from "../components/home.container";
import { ConnectedNavigation } from "../components/navigation.component";

interface Props extends RouteComponentProps<{}> {
  user: User;
  folders: Folder[];
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
    const { folders = [] } = this.props;
    const nav = <ConnectedNavigation folders={folders} />;
    return <HomeContainer nav={nav} />;
  }
}

const mapStateToProps = (state: ApplicationState): any => {
  return {
    user: state.userState.user,
    folders: state.foldersState.folders,
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
