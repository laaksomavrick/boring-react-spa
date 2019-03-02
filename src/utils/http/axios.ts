import axios, { AxiosRequestConfig } from "axios";
import { getAuthToken } from "../user";

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
