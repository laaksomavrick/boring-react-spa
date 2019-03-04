import { SetAppLoadingAction, UiActionKeys } from "./types";

export const setAppLoading = (loading: boolean): SetAppLoadingAction => {
  return {
    type: UiActionKeys.SET_APP_LOADING,
    payload: { loading },
  };
};
