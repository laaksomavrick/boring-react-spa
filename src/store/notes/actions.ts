import { Dispatch } from "redux";
import { ApiError, get, post, patch } from "../../utils/http";
import {
  GetNotesErrorAction,
  GetNotesSuccessAction,
  Note,
  NoteActionKeys,
  UpdateNoteErrorAction,
  UpdateNoteSuccessAction,
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

// todo
export const updateNote = (userId: number, note: Note) => {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      const { folderId, id } = note;
      dispatch(updateNoteSuccess(note));
      patch(`users/${userId}/folders/${folderId}/notes/${id}`, {
        note: { name: note.name, content: note.content },
      });
    } catch (e) {
      const {
        response: {
          data: { error },
        },
      } = e;
      dispatch(updateNoteError(error));
    }
  };
};

const updateNoteSuccess = (note: Note): UpdateNoteSuccessAction => {
  return {
    type: NoteActionKeys.UPDATE_NOTE_SUCCESS,
    payload: { note },
  };
};

const updateNoteError = (error: ApiError): UpdateNoteErrorAction => {
  return {
    type: NoteActionKeys.UPDATE_NOTE_ERROR,
    payload: { error },
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
