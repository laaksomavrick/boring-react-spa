export interface UiState {
  appLoading: boolean;
  selectedFolderModalOpen: boolean;
}

export enum UiActionKeys {
  SET_APP_LOADING = "setAppLoading",
  SET_SELECTED_FOLDER_MODAL_OPEN = "selectedFolderModalOpen",
}

export type UiActions = SetAppLoadingAction | SetSelectedFolderModalOpenAction;

export interface SetAppLoadingAction {
  readonly type: UiActionKeys.SET_APP_LOADING;
  readonly payload: {
    readonly loading: boolean;
  };
}

export interface SetSelectedFolderModalOpenAction {
  readonly type: UiActionKeys.SET_SELECTED_FOLDER_MODAL_OPEN;
  readonly payload: {
    readonly open: boolean;
  };
}
