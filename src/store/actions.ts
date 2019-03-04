import { Dispatch } from "redux";
import { getFolders } from "./folders/actions";
import { getNotes } from "./notes/actions";
import { User } from "./user/types";

export const startUp = ({ id }: User) => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
    await Promise.all([dispatch(getFolders(id)), dispatch(getNotes(id))]);
  };
};
