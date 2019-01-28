import { Dispatch } from "redux";
import { post } from "../../http";

export enum UserActionKeys {
  CREATE_USER_SUCCESS = "createUserSuccess",
  CREATE_USER_ERROR = "createUserError",
}

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

export type UserActions = CreateUserSuccessAction | CreateUserErrorAction;

type DispatchFunction = (dispatch: Dispatch<any>) => Promise<void>;

export const createUser = (newUser: object): DispatchFunction => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      const {
        data: {
          resource: { user },
        },
      } = await post("users", { user: newUser });
      dispatch(createUserSuccess(user));
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
