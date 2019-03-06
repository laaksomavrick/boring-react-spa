import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import { ApplicationState } from "../store";
import { Note } from "../store/notes/types";
import { drawerWidth } from "./AppDrawer";

const styled = withStyles(theme => ({
  toolbar: { ...theme.mixins.toolbar, display: "flex" },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    marginLeft: drawerWidth,
  },
}));

interface Props extends RouteComponentProps<{ noteId: string }> {
  classes?: any;
  note?: Note;
}

class NoteEditor extends Component<Props, {}> {
  public constructor(props: Props) {
    super(props);
  }

  public render() {
    const { classes, note } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>{note && note.content}</Typography>
      </main>
    );
  }
}

const mapStateToProps = (
  state: ApplicationState,
  {
    match: {
      params: { noteId },
    },
  },
): any => {
  const note = state.notes.data.find(note => note.id == noteId);
  return {
    note,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): object => {
  return {};
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(styled(NoteEditor)),
);
