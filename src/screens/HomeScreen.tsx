import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import AppDrawer from "../components/AppDrawer";
import AppTopBar from "../components/AppTopBar";
import { ApplicationState } from "../store";
import { startUp } from "../store/actions";
import { setSelectedFolder } from "../store/folders/actions";
import { Folder } from "../store/folders/types";
import { setAppLoading } from "../store/ui/actions";
import { getMe } from "../store/user/actions";
import { User } from "../store/user/types";

const styled = withStyles(theme => ({
  root: {
    height: "100%",
  },
}));

interface Props extends RouteComponentProps<{}> {
  user: User;
  folders: Folder[];
  appLoading: boolean;
  startUp: (user: User) => Promise<void>;
  getMe: () => Promise<void>;
  setSelectedFolder: (folder: Folder) => void;
  setAppLoading: (loading: boolean) => void;
  classes: any;
}

class HomeScreen extends Component<Props, {}> {
  public state = {};

  public constructor(props: Props) {
    super(props);
  }

  public async componentWillMount() {
    const { startUp, getMe, setSelectedFolder, setAppLoading, history } = this.props;
    await getMe();
    const { user } = this.props;
    await startUp(user);
    const { folders } = this.props;
    const params: any = this.props.match.params;
    // todo:
    // either separate appDrawer's route related data vs non route related data into appropriate <Route> components
    // or determine way to always set it
    setAppLoading(false);
  }

  public render() {
    const { classes, appLoading } = this.props;
    // grid
    //    nav
    //    route (notelist)
    //    route  (note)
    return appLoading ? (
      <p>Loading...</p>
    ) : (
      <div className={classes.root}>
        <AppTopBar />
        <Route path="/folders/:folderId" component={AppDrawer} />
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState): any => {
  return {
    user: state.user.data,
    folders: state.folders.data,
    appLoading: state.ui.appLoading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): object => {
  return {
    startUp: async (user: User) => dispatch(startUp(user)),
    getMe: async () => dispatch(getMe()),
    setSelectedFolder: (folder: Folder) => dispatch(setSelectedFolder(folder)),
    setAppLoading: (loading: boolean) => dispatch(setAppLoading(loading)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(styled(HomeScreen)),
);
