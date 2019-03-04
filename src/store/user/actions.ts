import { Dispatch } from "redux";
import { ApiError, get, post } from "../../utils/http";
import { setAuthToken } from "../../utils/user";
import {
  CreateAuthErrorAction,
  CreateAuthSuccessAction,
  CreateUserErrorAction,
  CreateUserSuccessAction,
  GetUserErrorAction,
  GetUserSuccessAction,
  User,
  UserActionKeys,
  UserInput,
} from "./types";

export const createUser = (newUser: UserInput) => {
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

export const authorizeUser = (user: UserInput) => {
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

export const getMe = () => {
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

const createUserError = (error: ApiError): CreateUserErrorAction => {
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

const createAuthError = (error: ApiError): CreateAuthErrorAction => {
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

const getUserError = (error: ApiError): GetUserErrorAction => {
  return {
    type: UserActionKeys.GET_USER_ERROR,
    payload: { error },
  };
};
