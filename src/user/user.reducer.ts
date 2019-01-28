import { UserActionKeys, UserActions } from "./user.actions";

export interface UserState {
  user: any;
  error: any;
}

export const userReducer = (
  state: UserState = {
    user: null,
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
    default:
      return state;
  }
};
