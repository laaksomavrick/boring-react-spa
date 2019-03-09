import { Note, NoteActionKeys, NoteActions, NotesState } from "./types";

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
    case NoteActionKeys.UPDATE_NOTE_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case NoteActionKeys.UPDATE_NOTE_SUCCESS:
      const updated = action.payload.note;
      return {
        ...state,
        data: state.data.map((note: Note) => (note.id == updated.id ? updated : note)),
      };
    default:
      return state;
  }
};
