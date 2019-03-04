import { Dispatch } from "react";
import { ApiError, get } from "../../utils/http";
import {
  GetNotesErrorAction,
  GetNotesSuccessAction,
  Note,
  NoteActionKeys,
} from "./types";

export const getNotes = (userId: number) => {
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
