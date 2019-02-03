import { getAuthToken, getUser } from "../user.utils";
import { User, UserActionKeys, UserActions } from "./user.actions";

export interface UserState {
  user: User | null;
  auth: string | null;
  error: any;
}

export const userReducer = (
  state: UserState = {
    user: null,
    auth: getAuthToken(),
    error: null,
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
