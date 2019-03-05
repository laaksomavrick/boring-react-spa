import {
  SetAppLoadingAction,
  SetSelectedFolderModalOpenAction,
  UiActionKeys,
} from "./types";

export const setAppLoading = (loading: boolean): SetAppLoadingAction => {
  return {
    type: UiActionKeys.SET_APP_LOADING,
    payload: { loading },
  };
};

export const setSelectedFolderModalOpen = (
  open: boolean,
): SetSelectedFolderModalOpenAction => {
  return {
    type: UiActionKeys.SET_SELECTED_FOLDER_MODAL_OPEN,
    payload: { open },
  };
};
