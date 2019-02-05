import React, { Component } from "react";
import { Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { connect } from "react-redux";
import { Route, RouteComponentProps, withRouter } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";
import { Folder } from "../../folders/redux/folders.actions";

interface Props extends RouteComponentProps<{}> {
  folders: Folder[];
}

const StyledNavigationCol = styled(Col)`
  height: 100%;
  padding-right: 0px;
`;

class Navigation extends Component<Props, {}> {
  public constructor(props: Props) {
    super(props);
  }

  public render() {
    const { folders = [] } = this.props;
    return (
      <>
        <StyledNavigationCol xs={6}>{this.renderFolderList(folders)}</StyledNavigationCol>
        <StyledNavigationCol xs={6}>
          <Route exact path="/folders/:folderId/notes" component={this.renderNoteList} />
        </StyledNavigationCol>
      </>
    );
  }

  private renderFolderList(folders: Folder[] = []) {
    return (
      <>
        <ListGroup>
          {folders.map(({ name, id }: Folder) => (
            <LinkContainer to={`/folders/${id}/notes`} key={id}>
              <ListGroupItem>{name}</ListGroupItem>
            </LinkContainer>
          ))}
        </ListGroup>
      </>
    );
  }

  private renderNoteList(props: RouteComponentProps) {
    const { folderId = null } = props.match.params as any;
    return <div>{folderId}</div>;
  }
}

export const ConnectedNavigation = withRouter(
  connect(
    null,
    null,
  )(Navigation),
);
