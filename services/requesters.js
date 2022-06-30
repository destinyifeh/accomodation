import axios from "axios";
import { live, dev } from "../utils/constants";

export const base_url =
  process.env.NODE_ENV === live
    ? process.env.productionUrl
    : process.env.localUrl;

export const postRequest = () => {
  return axios.post(base_url);
};

export const setPath = (key, value) => {
  return sessionStorage.setItem(key, value);
};

export const getPath = (key) => {
  return sessionStorage.getItem(key);
};

export const saveUser = (key, value) => {
  return localStorage.setItem(JSON.stringify(key, value));
};
export const currentUser = (key) => {
  return localStorage.getItem(JSON.parse(key));
};
export const LogoutUser = (key) => {
  return localStorage.removeItem(key);
};
