import { Dispatch } from "redux";

export type ThunkHandler = (dispatch: Dispatch<any>) => Promise<void>;
