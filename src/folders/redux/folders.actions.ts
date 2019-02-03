import { Dispatch } from "react";
import { ThunkHandler } from "../../app";
import { get } from "../../http";

export interface Folder {
  id: number;
  userId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export enum FolderActionKeys {
  GET_FOLDERS_SUCCESS = "getFoldersSuccess",
  GET_FOLDERS_ERROR = "getFoldersError",
}

export interface GetFolderSuccessAction {
  readonly type: FolderActionKeys.GET_FOLDERS_SUCCESS;
  readonly payload: {
    readonly folders: Folder[];
  };
}

export interface GetFolderErrorAction {
  readonly type: FolderActionKeys.GET_FOLDERS_ERROR;
  readonly payload: {
    readonly error: any;
  };
}

export type FolderActions = GetFolderSuccessAction | GetFolderErrorAction;

export const getFolders = (userId: number): ThunkHandler => {
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

const getFoldersError = (error: any): GetFolderErrorAction => {
  return {
    type: FolderActionKeys.GET_FOLDERS_ERROR,
    payload: { error },
  };
};
