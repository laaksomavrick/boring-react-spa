import { ApiError } from "../../http";
import { Note, NoteActionKeys, NoteActions } from "./notes.actions";

export interface NotesState {
  notes: Note[];
  error: ApiError | null;
}

export const notesReducer = (
  state: NotesState = {
    notes: [],
    error: null,
  },
  action: NoteActions,
): NotesState => {
  switch (action.type) {
    case NoteActionKeys.GET_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.payload.notes,
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
