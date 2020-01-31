import { getCookie, removeCookie } from "./session";
import { authConstants } from "../constants/authConstants";

export const getJwt = () => {
  return getCookie(authConstants.USER_ACCESS_TOKEN_KEY) || null;
};

export const isAuthenticated = () => !!getJwt();

export const signout = () => {
  removeCookie(authConstants.USER_ACCESS_TOKEN_KEY);
  return true;
};
