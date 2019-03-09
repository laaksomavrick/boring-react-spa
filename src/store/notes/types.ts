import { ErrorAction } from "..";
import { ApiError } from "../../utils/http";

export interface Note {
  name: string;
  content: string;
  userId: number;
  folderId: number;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface NotesState {
  data: Note[];
  error?: ApiError;
}

export type NoteActions =
  | GetNotesSuccessAction
  | GetNotesErrorAction
  | UpdateNoteSuccessAction
  | UpdateNoteErrorAction;

export enum NoteActionKeys {
  GET_NOTES_SUCCESS = "getNotesSuccess",
  GET_NOTES_ERROR = "getNotesError",
  UPDATE_NOTE_SUCCESS = "updateNoteSuccess",
  UPDATE_NOTE_ERROR = "updateNoteError",
}

export interface GetNotesSuccessAction {
  readonly type: NoteActionKeys.GET_NOTES_SUCCESS;
  readonly payload: {
    readonly notes: Note[];
  };
}

export interface GetNotesErrorAction extends ErrorAction {
  readonly type: NoteActionKeys.GET_NOTES_ERROR;
}

export interface UpdateNoteSuccessAction {
  readonly type: NoteActionKeys.UPDATE_NOTE_SUCCESS;
  readonly payload: {
    readonly note: Note;
  };
}

export interface UpdateNoteErrorAction extends ErrorAction {
  readonly type: NoteActionKeys.UPDATE_NOTE_ERROR;
}
