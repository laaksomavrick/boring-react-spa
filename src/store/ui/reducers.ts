import { Reducer } from "redux";
import { UiActionKeys, UiActions, UiState } from "./types";

export const uiReducer: Reducer<UiState, UiActions> = (
  state: UiState = {
    appLoading: true,
    selectedFolderModalOpen: false,
  },
  action: UiActions,
): UiState => {
  switch (action.type) {
    case UiActionKeys.SET_APP_LOADING:
      return {
        ...state,
        appLoading: action.payload.loading,
      };
    case UiActionKeys.SET_SELECTED_FOLDER_MODAL_OPEN:
      return {
        ...state,
        selectedFolderModalOpen: action.payload.open,
      };
    default:
      return state;
  }
};
