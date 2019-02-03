import { combineReducers } from "redux";
import { foldersReducer, FoldersState } from "../folders/redux/folders.reducer";
import { userReducer, UserState } from "../user";

export interface ApplicationState {
  userState: UserState;
  foldersState: FoldersState;
}

export const appReducer = combineReducers<ApplicationState>({
  userState: userReducer,
  foldersState: foldersReducer,
});
