import { getCookie } from "./session";
import { authConstants } from "../constants/authConstants";

export const getJwt = () => {
  return getCookie(authConstants.USER_ACCESS_TOKEN_KEY);
};

export const isAuthenticated = () => !!getJwt();