import React, { SFC } from "react";
import { Route } from "react-router";
import styled from "styled-components";
import { ConnectedNote } from "./ConnectedNote.component";

export const NoteRoute: SFC<{}> = () => {
  return <Route path="/folders/:folderId/notes/:noteId" component={ConnectedNote} />;
};

export const StyledNoteRoute = styled(NoteRoute)`
  height: 100vh;
`;
