import { NoteActionKeys, NoteActions, NotesState } from "./types";

export const notesReducer = (
  state: NotesState = {
    data: [],
    error: undefined,
  },
  action: NoteActions,
): NotesState => {
  switch (action.type) {
    case NoteActionKeys.GET_NOTES_SUCCESS:
      return {
        ...state,
        data: action.payload.notes,
      };
    case NoteActionKeys.GET_NOTES_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
