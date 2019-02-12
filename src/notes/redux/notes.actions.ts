import { Dispatch } from "react";
import { ThunkHandler } from "../../app";
import { get, ApiError } from "../../http";

export interface Note {
  name: string;
  content: string;
  userId: number;
  folderId: number;
  id: number;
  createdAt: string;
  updatedAt: string;
}

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

export interface GetNotesErrorAction {
  readonly type: NoteActionKeys.GET_NOTES_ERROR;
  readonly payload: {
    readonly error: ApiError;
  };
}

export type NoteActions = GetNotesSuccessAction | GetNotesErrorAction;

export const getNotes = (userId: number): ThunkHandler => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      const {
        data: {
          resource: { notes = [] },
        },
      } = await get(`users/${userId}/notes`);
      dispatch(getNotesSuccess(notes));
    } catch (e) {
      const {
        response: {
          data: { error },
        },
      } = e;
      dispatch(getNotesError(error));
    }
  };
};

const getNotesSuccess = (notes: Note[]): GetNotesSuccessAction => {
  return {
    type: NoteActionKeys.GET_NOTES_SUCCESS,
    payload: { notes },
  };
};

const getNotesError = (error: ApiError): GetNotesErrorAction => {
  return {
    type: NoteActionKeys.GET_NOTES_ERROR,
    payload: { error },
  };
};
