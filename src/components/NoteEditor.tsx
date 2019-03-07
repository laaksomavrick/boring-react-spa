import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
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
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  codeMirror: {
    height: "auto",
    background: "transparent",
    fontSize: "16px",
  },
  filler: {
    flexGrow: 1,
    cursor: "text",
  },
}));

interface State {
  codeMirror?: any;
}

interface Props extends RouteComponentProps<{ noteId: string }> {
  classes?: any;
  note?: Note;
}

class NoteEditor extends Component<Props, State> {
  public state = { codeMirror: null };

  public constructor(props: Props) {
    super(props);
  }

  public render() {
    const {
      classes,
      note: { content },
    } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* <Typography paragraph>{note && note.content}</Typography> */}
        <CodeMirror
          className={classes.codeMirror}
          ref="codeMirror"
          value={content}
          editorDidMount={e => (this.state.codeMirror = e)}
          options={{
            mode: "markdown",
            lineWrapping: true,
            lineNumbers: true,
          }}
        />
        <div className={classes.filler} onClick={this.focusCodeMirror} />
      </main>
    );
  }

  private focusCodeMirror = e => {
    this.state.codeMirror.focus();
  };
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
