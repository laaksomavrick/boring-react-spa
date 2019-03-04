import { Button, Divider, Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import { ApplicationState } from "../store";
import { setSelectedFolder } from "../store/folders/actions";
import { Folder } from "../store/folders/types";
import { Note } from "../store/notes/types";

const drawerWidth = 240;

const styled = withStyles(theme => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: { ...theme.mixins.toolbar, display: "flex" },
  button: { flex: "1" },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
}));

interface Props extends RouteComponentProps<{}> {
  classes?: any;
  notes?: Note[];
  selectedFolder?: Folder;
  folders?: Folder[];
  setSelectedFolder: (folder: Folder) => void;
}

class AppDrawer extends Component<Props, {}> {
  public constructor(props: Props) {
    super(props);
  }

  public componentWillMount() {
    const {
      match: { params },
      folders,
      setSelectedFolder,
      history,
    } = this.props;
    const folderId = (params as any).folderId;
    // tslint:disable-next-line
    const folder = folders.find((f: Folder) => f.id == folderId);
    console.log("here");
    console.log(folderId);
    console.log(folder);
    if (folder) {
      setSelectedFolder(folder);
    } else if (folders) {
      history.push(`/folders/${folders[0].id}`);
    } else {
      history.push("/");
    }
  }

  public render() {
    const { classes, notes, selectedFolder } = this.props;
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
          <Button className={classes.button} color="primary" size="large">
            {selectedFolder && selectedFolder.name}
          </Button>
        </div>
        <Divider />
        <List>
          {notes.map(({ id, name }: Note) => (
            <ListItem button key={id}>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }
}

const mapStateToProps = (state: ApplicationState): any => {
  const folders = state.folders.data;
  const selectedFolder = state.folders.selected;
  const notes = selectedFolder ? selectedFolder.notes : [];
  return {
    notes,
    selectedFolder,
    folders,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): object => {
  return {
    setSelectedFolder: (folder: Folder) => dispatch(setSelectedFolder(folder)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(styled(AppDrawer)),
);
