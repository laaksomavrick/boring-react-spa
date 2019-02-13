import React, { Component } from "react";
import { Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { connect } from "react-redux";
import { Route, RouteComponentProps, withRouter } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";
import { ApplicationState } from "../../app/app.reducer";
import { Folder } from "../../folders/redux/folders.actions";
import { Note } from "../../notes";
import { RouteParams } from "../../route";

interface StateFromProps {
  folders: Folder[];
  notes: Note[];
}

interface Props extends RouteComponentProps<RouteParams>, StateFromProps {}

const NavigationContainer = styled.div`
  height: 100vh;
  display: flex;
`;

const StyledNavigationCol = styled.div`
  height: 100%;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  width: 50%;
`;

class Navigation extends Component<Props, {}> {
  public constructor(props: Props) {
    super(props);
    this.renderNoteList = this.renderNoteList.bind(this);
  }

  public render() {
    const { folders = [] } = this.props;
    return (
      <NavigationContainer>
        <StyledNavigationCol>
          <ListGroup>
            {folders.map((folder: Folder) => (
              <LinkContainer to={`/folders/${folder.id}/notes`} key={folder.id}>
                <ListGroupItem>{folder.name}</ListGroupItem>
              </LinkContainer>
            ))}
          </ListGroup>
        </StyledNavigationCol>
        <StyledNavigationCol>
          <Route path="/folders/:folderId/notes" component={this.renderNoteList} />
        </StyledNavigationCol>
      </NavigationContainer>
    );
  }

  private renderNoteList(props: RouteComponentProps<RouteParams>) {
    // todo this is gross
    const { notes } = this.props;
    const {
      match: { params = {} },
    } = props;
    const selectedFolderId = params.folderId ? params.folderId : null;
    if (!selectedFolderId) {
      return null;
    }
    const folderNotes =
      notes.filter((note: Note) => note.folderId === parseInt(selectedFolderId, 10)) ||
      [];
    return (
      <>
        <ListGroup>
          {folderNotes.map(({ name, id }: Note) => (
            <LinkContainer to={`/folders/${selectedFolderId}/notes/${id}`} key={id}>
              <ListGroupItem>{name}</ListGroupItem>
            </LinkContainer>
          ))}
        </ListGroup>
      </>
    );
  }
}

const mapStateToProps = (state: ApplicationState): StateFromProps => {
  return {
    folders: state.foldersState.folders,
    notes: state.notesState.notes,
  };
};

export const ConnectedNavigation = withRouter(
  connect(
    mapStateToProps,
    null,
  )(Navigation),
);
