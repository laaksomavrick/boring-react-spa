export interface UiState {
  appLoading: boolean;
}

export enum UiActionKeys {
  SET_APP_LOADING = "setAppLoading",
}

export type UiActions = SetAppLoadingAction;

export interface SetAppLoadingAction {
  readonly type: UiActionKeys.SET_APP_LOADING;
  readonly payload: {
    readonly loading: boolean;
  };
}
