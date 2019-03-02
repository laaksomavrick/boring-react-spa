import React, { Component } from "react";
import { FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import { ApplicationState } from "../../app/app.reducer";
import { RouteParams } from "../../route";
import { Note } from "../redux/notes.actions";

interface MapStateToProps {
  notes?: Note[];
}

interface Props extends RouteComponentProps<RouteParams>, MapStateToProps {}

class NoteComponent extends Component<Props, {}> {
  public state = {};

  public constructor(props: Props) {
    super(props);
  }

  public render() {
    const {
      match: { params: { noteId = null } = {} },
      notes = [],
    } = this.props;
    if (!noteId) {
      return null;
    }
    const note = notes.find((note: Note) => note.id === parseInt(noteId, 10));
    if (!note) {
      return null;
    }
    return <FormControl componentClass="textarea" value={note.content} />;
  }
}

const mapStateToProps = (state: ApplicationState): any => {
  return {
    notes: state.notesState.notes,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): object => {
  return {};
};

export const ConnectedNote = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NoteComponent),
);
