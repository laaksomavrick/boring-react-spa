import { Folder, FolderActionKeys, FolderActions } from "./folders.actions";

export interface FoldersState {
  folders?: Folder[];
  error: any;
}

export const foldersReducer = (
  state: FoldersState = {
    folders: [],
    error: null,
  },
  action: FolderActions,
): FoldersState => {
  switch (action.type) {
    case FolderActionKeys.GET_FOLDERS_SUCCESS:
      return {
        ...state,
        folders: action.payload.folders,
      };
    case FolderActionKeys.GET_FOLDERS_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
