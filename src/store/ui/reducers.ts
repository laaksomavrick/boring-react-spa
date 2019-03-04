import { Reducer } from "redux";
import { UiActionKeys, UiActions, UiState } from "./types";

export const uiReducer: Reducer<UiState, UiActions> = (
  state: UiState = {
    appLoading: true,
  },
  action: UiActions,
): UiState => {
  switch (action.type) {
    case UiActionKeys.SET_APP_LOADING:
      return {
        ...state,
        appLoading: action.payload.loading,
      };
    default:
      return state;
  }
};
