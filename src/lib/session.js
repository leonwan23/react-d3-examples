import Cookies from "js-cookie";

const EXPIRE_TIME = 1 / 72; // 1 = 1 day = 1/72 = 20 minutes

export const setCookie = (key, value) => {
  Cookies.set(key, value, {
    expires: EXPIRE_TIME,
    path: "/"
  });
};

export const getCookie = key => {
  return Cookies.get(key);
};

export const removeCookie = key => {
  Cookies.remove(key, {
    expires: EXPIRE_TIME
  });
};
