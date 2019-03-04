import { FolderActionKeys, FolderActions, FoldersState } from "./types";

export const foldersReducer = (
  state: FoldersState = {
    data: [],
    selected: undefined,
    error: undefined,
  },
  action: FolderActions,
): FoldersState => {
  switch (action.type) {
    case FolderActionKeys.GET_FOLDERS_SUCCESS:
      return {
        ...state,
        data: action.payload.folders,
      };
    case FolderActionKeys.GET_FOLDERS_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case FolderActionKeys.SET_SELECTED_FOLDER:
      return {
        ...state,
        selected: action.payload.folder,
      };
    default:
      return state;
  }
};
