import { combineReducers } from "redux";
import { userReducer, UserState } from "../user/user.reducer";

// todo type <T>

export interface ApplicationState {
  userState: UserState;
}

export const appReducer = combineReducers<ApplicationState>({ userState: userReducer });
