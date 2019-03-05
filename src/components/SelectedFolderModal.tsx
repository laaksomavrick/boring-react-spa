import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import FolderIcon from "@material-ui/icons/Folder";
import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import { ApplicationState } from "../store";
import { Folder } from "../store/folders/types";
import { setSelectedFolderModalOpen } from "../store/ui/actions";

const styled = withStyles(theme => ({}));

interface Props extends RouteComponentProps<{}> {
  classes?: any;
  // notes?: Note[];
  // seilectedFolder?: Folder;
  open?: boolean;
  folders?: Folder[];
  setSelectedFolderModalOpen?: (open: boolean) => void;
}

class SelectedFolderModal extends Component<Props, {}> {
  public constructor(props: Props) {
    super(props);
  }

  handleClose = () => {
    const { setSelectedFolderModalOpen } = this.props;
    setSelectedFolderModalOpen(false);
  };

  handleListItemClick = (folder: Folder) => {
    const { history } = this.props;
    const { id } = folder;
    history.push(`/folders/${id}`);
    this.handleClose();
  };

  public render() {
    const { classes, open, folders } = this.props;
    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">Select a folder</DialogTitle>
        <div>
          <List>
            {folders.map((folder: Folder) => (
              <ListItem
                button
                onClick={() => this.handleListItemClick(folder)}
                key={folder.id}
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={folder.name} />
              </ListItem>
            ))}
            {/* <ListItem button onClick={() => this.handleListItemClick("addAccount")}>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="add folder" />
            </ListItem> */}
          </List>
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = (state: ApplicationState): any => {
  const folders = state.folders.data;
  const open = state.ui.selectedFolderModalOpen;
  return {
    folders,
    open,
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
  )(styled(SelectedFolderModal)),
);
