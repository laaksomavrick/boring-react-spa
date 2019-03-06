import { connectRouter } from "connected-react-router";
import { History } from "history";
import { Action, AnyAction, combineReducers, Dispatch } from "redux";
import { ApiError } from "../utils/http";
import { foldersReducer } from "./folders/reducers";
import { FoldersState } from "./folders/types";
import { notesReducer } from "./notes/reducers";
import { NotesState } from "./notes/types";
import { uiReducer } from "./ui/reducers";
import { UiState } from "./ui/types";
import { userReducer } from "./user/reducers";
import { UserState } from "./user/types";

export interface ErrorAction {
  readonly payload: {
    readonly error: ApiError;
  };
}

export interface ApplicationState {
  user: UserState;
  folders: FoldersState;
  ui: UiState;
  notes: NotesState;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    folders: foldersReducer,
    ui: uiReducer,
    notes: notesReducer,
  });
