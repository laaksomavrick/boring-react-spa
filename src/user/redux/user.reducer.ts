import { UserActionKeys, UserActions } from "./user.actions";

export interface UserState {
  user: any;
  auth: string | null;
  error: any;
}

export const userReducer = (
  state: UserState = {
    user: null,
    auth: null, // todo derive from localStorage
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
    default:
      return state;
  }
};
