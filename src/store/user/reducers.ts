import { Reducer } from "redux";
import { getAuthToken } from "../../utils/user";
import { UserActionKeys, UserActions, UserState } from "./types";

export const userReducer: Reducer<UserState, UserActions> = (
  state: UserState = {
    user: undefined,
    auth: getAuthToken(),
    error: undefined,
  },
  action: UserActions,
): UserState => {
  switch (action.type) {
    case UserActionKeys.CREATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
    case UserActionKeys.CREATE_USER_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case UserActionKeys.CREATE_AUTH_SUCCESS:
      return {
        ...state,
        auth: action.payload.auth,
      };
    case UserActionKeys.CREATE_AUTH_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case UserActionKeys.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
    case UserActionKeys.GET_USER_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
