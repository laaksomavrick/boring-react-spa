import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { matchPath, Route, RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import AppDrawer from "../components/AppDrawer";
import AppTopBar from "../components/AppTopBar";
import NoteEditor from "../components/NoteEditor";
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

interface Props extends RouteComponentProps<{ folderId: any; noteId: any }> {
  user: User;
  folders: Folder[];
  appLoading: boolean;
  startUp: (user: User) => Promise<void>;
  getMe: () => Promise<void>;
  setAppLoading: (loading: boolean) => void;
  classes: any;
}

class HomeScreen extends Component<Props, {}> {
  public constructor(props: Props) {
    super(props);
  }

  public async componentWillMount() {
    const { startUp, getMe, setAppLoading, history } = this.props;
    await getMe();
    const { user } = this.props;
    await startUp(user);
    const { folders } = this.props;
    // todo:
    // user must always have one folder for this to work
    //   -> on user create, create folder
    //   -> server side, user cannot delete folder if it's the last one

    const { params } = matchPath(this.props.history.location.pathname, {
      path: "/folders/:folderId/notes/:noteId",
      exact: true,
      strict: false,
    });

    if ((params.folderId == null || params.noteId == null) && folders) {
      const { id, notes } = folders[0];
      const note = notes[0];
      history.replace(`/folders/${id}/notes/${note.id}`);
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
        <Route path="/folders/:folderId/notes/:noteId" component={NoteEditor} />
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
