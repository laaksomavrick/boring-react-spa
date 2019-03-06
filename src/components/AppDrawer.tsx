import { Button, Divider, Drawer, List } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import { ApplicationState } from "../store";
import { Folder } from "../store/folders/types";
import { Note } from "../store/notes/types";
import { setSelectedFolderModalOpen } from "../store/ui/actions";
import ListItemLink from "./ListItemLink";

export const drawerWidth = 240;

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
}));

interface Props extends RouteComponentProps<{}> {
  classes?: any;
  notes?: Note[];
  selectedFolder?: Folder;
  folders?: Folder[];
  setSelectedFolderModalOpen: (open: boolean) => void;
}

class AppDrawer extends Component<Props, {}> {
  public constructor(props: Props) {
    super(props);
  }

  public render() {
    const { classes, notes, selectedFolder, setSelectedFolderModalOpen } = this.props;
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
          <Button
            className={classes.button}
            color="primary"
            size="large"
            onClick={() => setSelectedFolderModalOpen(true)}
          >
            {selectedFolder && selectedFolder.name}
          </Button>
        </div>
        <Divider />
        <List>
          {notes.map(({ id, name, folderId }: Note) => (
            <ListItemLink key={id} to={`/folders/${folderId}/notes/${id}`} text={name} />
          ))}
        </List>
      </Drawer>
    );
  }
}

const mapStateToProps = (state: ApplicationState, { match: { params } }): any => {
  const folders = state.folders.data;
  const selectedFolder = folders.find(f => f.id == params.folderId);
  const notes = selectedFolder ? selectedFolder.notes : [];
  return {
    notes,
    selectedFolder,
    folders,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): object => {
  return {
    setSelectedFolderModalOpen: (open: boolean) =>
      dispatch(setSelectedFolderModalOpen(open)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(styled(AppDrawer)),
);
