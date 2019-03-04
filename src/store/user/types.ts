import { ErrorAction } from "..";
import { ApiError } from "../../utils/http";

export interface UserInput {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
}

export interface UserState {
  data?: User;
  auth?: string;
  error?: ApiError;
}

export enum UserActionKeys {
  CREATE_USER_SUCCESS = "createUserSuccess",
  CREATE_USER_ERROR = "createUserError",
  CREATE_AUTH_SUCCESS = "createAuthSuccess",
  CREATE_AUTH_ERROR = "createAuthError",
  GET_USER_SUCCESS = "getUserSuccess",
  GET_USER_ERROR = "getUserError",
}

export type UserActions =
  | CreateUserSuccessAction
  | CreateUserErrorAction
  | CreateAuthSuccessAction
  | CreateAuthErrorAction
  | GetUserSuccessAction
  | GetUserErrorAction;

export interface CreateUserSuccessAction {
  readonly type: UserActionKeys.CREATE_USER_SUCCESS;
  readonly payload: {
    readonly user: User;
  };
}

export interface CreateUserErrorAction extends ErrorAction {
  readonly type: UserActionKeys.CREATE_USER_ERROR;
}

export interface CreateAuthSuccessAction {
  readonly type: UserActionKeys.CREATE_AUTH_SUCCESS;
  readonly payload: {
    readonly auth: string;
  };
}

export interface CreateAuthErrorAction extends ErrorAction {
  readonly type: UserActionKeys.CREATE_AUTH_ERROR;
}

export interface GetUserSuccessAction {
  readonly type: UserActionKeys.GET_USER_SUCCESS;
  readonly payload: {
    readonly user: User;
  };
}

export interface GetUserErrorAction extends ErrorAction {
  readonly type: UserActionKeys.GET_USER_ERROR;
}
