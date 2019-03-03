import { User } from "../store/user/types";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const setAuthToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = (): string | undefined => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? token : undefined;
};

export const setUser = ({ id, email }: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify({ id, email }));
};

export const getUser = (): User | null => {
  const json = localStorage.getItem(USER_KEY);
  if (json) {
    return JSON.parse(json);
  } else {
    return null;
  }
};
