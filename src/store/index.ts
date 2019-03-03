import { connectRouter } from "connected-react-router";
import { History } from "history";
import { Action, AnyAction, combineReducers, Dispatch } from "redux";
import { ApiError } from "../utils/http";
import { userReducer } from "./user/reducers";
import { UserState } from "./user/types";

export interface ErrorAction {
  readonly payload: {
    readonly error: ApiError;
  };
}

// tslint:disable-next-line
export interface ApplicationState {
  user: UserState;
  // folders: FoldersState;
  // notes: NotesState;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    //   foldersState: foldersReducer,
    //   notesState: notesReducer,
  });
