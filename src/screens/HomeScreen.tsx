import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import AppDrawer from "../components/AppDrawer";
import AppTopBar from "../components/AppTopBar";
import SelectedFolderModal from "../components/SelectedFolderModal";
import { ApplicationState } from "../store";
import { startUp } from "../store/actions";
import { Folder } from "../store/folders/types";
import { setAppLoading } from "../store/ui/actions";
import { getMe } from "../store/user/actions";
import { User } from "../store/user/types";

const styled = withStyles(theme => ({
  root: {
    height: "100%",
  },
}));

interface Props extends RouteComponentProps<{ folderId: string }> {
  user: User;
  folders: Folder[];
  appLoading: boolean;
  startUp: (user: User) => Promise<void>;
  getMe: () => Promise<void>;
  setAppLoading: (loading: boolean) => void;
  classes: any;
}

class HomeScreen extends Component<Props, {}> {
  public state = {};

  public constructor(props: Props) {
    super(props);
  }

  public async componentWillMount() {
    const {
      startUp,
      getMe,
      setAppLoading,
      match: { params },
      history,
    } = this.props;
    await getMe();
    const { user } = this.props;
    await startUp(user);
    const { folders } = this.props;
    // todo:
    // user must always have one folder for this to work
    //   -> on user create, create folder
    //   -> server side, user cannot delete folder if it's the last one

    if (params.folderId == null && folders) {
      history.replace(`/folders/${folders[0].id}`);
    }

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
        <SelectedFolderModal />
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
    setAppLoading: (loading: boolean) => dispatch(setAppLoading(loading)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(styled(HomeScreen)),
);
