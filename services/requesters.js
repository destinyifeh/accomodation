import { live, local_url, production_url } from "../utils/constants";
import { currentAgent, token, session } from "../utils/constants";
export const base_url =
  process.env.NODE_ENV === live ? production_url : local_url;

export const isProduction = process.env.NODE_ENV === "production";
export const isDevelopment = process.env.NODE_ENV === "development";

export const DB_connection =
  process.env.NODE_ENV === live
    ? process.env.mongo_url
    : process.env.local_store;

export const setPath = (key, value) => {
  return localStorage.setItem(key, value);
};

export const getPath = (key) => {
  return localStorage.getItem(key);
};

export const saveUser = (key, value) => {
  const theValue = JSON.stringify(value);
  return localStorage.setItem(key, theValue);
};
export const currentUser = (key) => {
  const getThisAgent = localStorage.getItem(key);
  return JSON.parse(getThisAgent);
};
export const logoutCurrentAgent = () => {
  return localStorage.removeItem(currentAgent);
};

export const saveToken = (key, value) => {
  const theToken = JSON.stringify(value);
  return localStorage.setItem(key, theToken);
};

export const getToken = (key) => {
  const getThisToken = localStorage.getItem(key);
  return JSON.parse(getThisToken);
};
export const removeToken = () => {
  return localStorage.removeItem(token);
};

export const setSession = (key, value) => {
  return localStorage.setItem(key, value);
};

export const getSession = (session) => {
  return JSON.parse(localStorage.getItem(session));
};

export const sessionExpires = () => {
  return localStorage.removeItem(session);
};

export function getAGentDetails() {
  const isIOS =
    navigator.userAgent.includes("iphone") ||
    navigator.userAgent.includes("ipad");

  const isMac = navigator.userAgent.includes("mac");

  return {
    isMac,
    isIOS,
    isDesktop: window.innerWidth > 768,
    isMobile: window.innerWidth <= 768,
    isSmallMobile: window.innerWidth <= 360,
  };
}

export function geo() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser does not support geolocation api");
  }
}

function onSuccess(data) {
  console.log(data);
}

function onError(err) {
  console.log(err);
}

export const resetPasswordPage = "/user/password-reset";
