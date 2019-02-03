import { Dispatch } from "redux";
import { getFolders } from "../folders";
import { User } from "../user/redux/user.actions";

export type ThunkHandler = (dispatch: Dispatch<any>) => Promise<void>;

export const startUp = ({ id }: User): ThunkHandler => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
    await Promise.all([dispatch(getFolders(id))]);
  };
};
