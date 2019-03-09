import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import { ApplicationState } from "../store";
import { updateNote } from "../store/notes/actions";
import { Note } from "../store/notes/types";
import { drawerWidth } from "./AppDrawer";
import debounce from "lodash/debounce";

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
  focused: boolean;
}

interface Props extends RouteComponentProps<{ noteId: string }> {
  classes?: any;
  note?: Note;
  userId?: number;
  updateNote?: (userId: number, note: Note) => void;
}

class NoteEditor extends Component<Props, State> {
  public state = { codeMirror: null, focused: false };

  public constructor(props: Props) {
    super(props);
    this.onChange = debounce(this.onChange, 500);
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
          onFocus={this.onFocus}
          onChange={this.onChange}
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

  private onFocus = (editor, data) => {
    this.setState({ focused: true });
  };

  private onChange = (editor, data, value) => {
    const { focused } = this.state;
    if (!focused) {
      return;
    }
    console.log(focused);
    const { note, userId, updateNote } = this.props;
    note.content = value;
    updateNote(userId, note);
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
  const userId = state.user.data.id;
  return {
    note,
    userId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): object => {
  return {
    updateNote: (userId: number, note: Note) => dispatch(updateNote(userId, note)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(styled(NoteEditor)),
);
