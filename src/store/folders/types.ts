import { ErrorAction } from "..";
import { ApiError } from "../../utils/http";
import { Note } from "../notes/types";

export interface Folder {
  id: number;
  userId: number;
  name: string;
  notes: Note[];
  createdAt: string;
  updatedAt: string;
}

export interface FoldersState {
  data: Folder[];
  selected?: Folder;
  error?: ApiError;
}

export enum FolderActionKeys {
  GET_FOLDERS_SUCCESS = "getFoldersSuccess",
  GET_FOLDERS_ERROR = "getFoldersError",
  SET_SELECTED_FOLDER = "setSelectedFolder",
}

export type FolderActions = GetFolderSuccessAction | GetFolderErrorAction;

export interface GetFolderSuccessAction {
  readonly type: FolderActionKeys.GET_FOLDERS_SUCCESS;
  readonly payload: {
    readonly folders: Folder[];
  };
}

export interface GetFolderErrorAction extends ErrorAction {
  readonly type: FolderActionKeys.GET_FOLDERS_ERROR;
}
