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

export type NoteActions = GetNotesSuccessAction | GetNotesErrorAction;

export enum NoteActionKeys {
  GET_NOTES_SUCCESS = "getNotesSuccess",
  GET_NOTES_ERROR = "getNotesError",
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
