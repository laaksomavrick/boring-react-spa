import { combineReducers } from "redux";
import { userReducer, UserState } from "../user";

export interface ApplicationState {
  userState: UserState;
}

export const appReducer = combineReducers<ApplicationState>({ userState: userReducer });
