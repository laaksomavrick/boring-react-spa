import { Dispatch } from "redux";
import { post } from "../../http";
import { UserInput } from "../user.types";

export enum UserActionKeys {
  CREATE_USER_SUCCESS = "createUserSuccess",
  CREATE_USER_ERROR = "createUserError",
  CREATE_AUTH_SUCCESS = "createAuthSuccess",
  CREATE_AUTH_ERROR = "createAuthError",
}

// todo: generic / universal error handling via status code?
// can put in redux folder with DispatchFunction, or http util to parse out

export interface CreateUserSuccessAction {
  readonly type: UserActionKeys.CREATE_USER_SUCCESS;
  readonly payload: {
    readonly user: any;
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

export type UserActions =
  | CreateUserSuccessAction
  | CreateUserErrorAction
  | CreateAuthSuccessAction
  | CreateAuthErrorAction;

type DispatchFunction = (dispatch: Dispatch<any>) => Promise<void>;

export const createUser = (newUser: UserInput): DispatchFunction => {
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

export const authorizeUser = (user: UserInput): DispatchFunction => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      const {
        data: {
          resource: { token = null },
        },
      } = await post("auth", { auth: user });
      dispatch(createAuthSuccess(token));
      // todo store in localStorage
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

const createUserSuccess = (user: any): CreateUserSuccessAction => {
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
