import { Dispatch } from "redux";
import { ThunkHandler } from "../../app";
import { get, post } from "../../http";
import { UserInput } from "../user.types";
import { setAuthToken } from "../user.utils";

export interface User {
  id: number;
  email: string;
}

export enum UserActionKeys {
  CREATE_USER_SUCCESS = "createUserSuccess",
  CREATE_USER_ERROR = "createUserError",
  CREATE_AUTH_SUCCESS = "createAuthSuccess",
  CREATE_AUTH_ERROR = "createAuthError",
  GET_USER_SUCCESS = "getUserSuccess",
  GET_USER_ERROR = "getUserError",
}

// todo: generic / universal error handling via status code?
// can put in redux folder with ThunkHandler, or http util to parse out

export interface CreateUserSuccessAction {
  readonly type: UserActionKeys.CREATE_USER_SUCCESS;
  readonly payload: {
    readonly user: User;
  };
}

export interface CreateUserErrorAction {
  readonly type: UserActionKeys.CREATE_USER_ERROR;
  readonly payload: {
    readonly error: any;
  };
}

export interface CreateAuthSuccessAction {
  readonly type: UserActionKeys.CREATE_AUTH_SUCCESS;
  readonly payload: {
    readonly auth: string;
  };
}

export interface CreateAuthErrorAction {
  readonly type: UserActionKeys.CREATE_AUTH_ERROR;
  readonly payload: {
    readonly error: any;
  };
}

export interface GetUserSuccessAction {
  readonly type: UserActionKeys.GET_USER_SUCCESS;
  readonly payload: {
    readonly user: User;
  };
}

export interface GetUserErrorAction {
  readonly type: UserActionKeys.GET_USER_ERROR;
  readonly payload: {
    readonly error: any;
  };
}

export type UserActions =
  | CreateUserSuccessAction
  | CreateUserErrorAction
  | CreateAuthSuccessAction
  | CreateAuthErrorAction
  | GetUserSuccessAction
  | GetUserErrorAction;

export const createUser = (newUser: UserInput): ThunkHandler => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      const {
        data: {
          resource: { user },
        },
      } = await post("users", { user: newUser });
      dispatch(createUserSuccess(user));
      const { email, password } = newUser;
      await dispatch(authorizeUser({ email, password }));
    } catch (e) {
      const {
        response: {
          data: { error },
        },
      } = e;
      dispatch(createUserError(error));
    }
  };
};

export const authorizeUser = (user: UserInput): ThunkHandler => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      const {
        data: {
          resource: { token = null },
        },
      } = await post("auth", { auth: user });
      setAuthToken(token);
      dispatch(createAuthSuccess(token));
    } catch (e) {
      const {
        response: {
          data: { error },
        },
      } = e;
      dispatch(createAuthError(error));
    }
  };
};

export const getMe = (): ThunkHandler => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      const {
        data: {
          resource: { user = null },
        },
      } = await get("users/me");
      dispatch(getUserSuccess(user));
    } catch (e) {
      const {
        response: {
          data: { error },
        },
      } = e;
      dispatch(getUserError(error));
    }
  };
};

const createUserSuccess = (user: User): CreateUserSuccessAction => {
  return {
    type: UserActionKeys.CREATE_USER_SUCCESS,
    payload: { user },
  };
};

const createUserError = (error: any): CreateUserErrorAction => {
  return {
    type: UserActionKeys.CREATE_USER_ERROR,
    payload: { error },
  };
};

const createAuthSuccess = (auth: string): CreateAuthSuccessAction => {
  return {
    type: UserActionKeys.CREATE_AUTH_SUCCESS,
    payload: { auth },
  };
};

const createAuthError = (error: any): CreateAuthErrorAction => {
  return {
    type: UserActionKeys.CREATE_AUTH_ERROR,
    payload: { error },
  };
};

const getUserSuccess = (user: User): GetUserSuccessAction => {
  return {
    type: UserActionKeys.GET_USER_SUCCESS,
    payload: { user },
  };
};

const getUserError = (error: any): GetUserErrorAction => {
  return {
    type: UserActionKeys.GET_USER_ERROR,
    payload: { error },
  };
};
