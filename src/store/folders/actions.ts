import { Dispatch } from "react";
import { ApiError, get } from "../../utils/http";
import {
  Folder,
  FolderActionKeys,
  GetFolderErrorAction,
  GetFolderSuccessAction,
} from "./types";

export const getFolders = (userId: number) => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      const {
        data: {
          resource: { folders = [] },
        },
      } = await get(`users/${userId}/folders`);
      dispatch(getFoldersSuccess(folders));
    } catch (e) {
      const {
        response: {
          data: { error },
        },
      } = e;
      dispatch(getFoldersError(error));
    }
  };
};

const getFoldersSuccess = (folders: Folder[]): GetFolderSuccessAction => {
  return {
    type: FolderActionKeys.GET_FOLDERS_SUCCESS,
    payload: { folders },
  };
};

const getFoldersError = (error: ApiError): GetFolderErrorAction => {
  return {
    type: FolderActionKeys.GET_FOLDERS_ERROR,
    payload: { error },
  };
};
