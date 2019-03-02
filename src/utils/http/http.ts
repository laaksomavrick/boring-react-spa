import { AxiosPromise } from "axios";
import axios from "./axios";

export const url = (route: string): string => {
  const host = process.env.REACT_APP_API_HOST || "http://localhost:3000";
  return `${host}/${route}`;
};

export const get = (route: string): AxiosPromise<any> => {
  return axios.get(url(route));
};

export const post = (route: string, payload: object): AxiosPromise<any> => {
  return axios.post(url(route), payload);
};

export const patch = (route: string, payload: object): AxiosPromise<any> => {
  return axios.patch(url(route), payload);
};

export const destroy = (route: string, id: string): AxiosPromise<any> => {
  return axios.delete(`${url(route)}/${id}`);
};
