import {
  request,
  success,
  failure
} from "../../utils/redux";
import fetch from 'isomorphic-unfetch'

export const actionTypes = {
  LOGGING_IN: "LOGGING_IN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",

  LOG_OUT: "LOG_OUT",

  SIGNING_UP: "SIGNING_UP",
  SIGNUP_SUCCESS: "SIGNIN_SUCCESS",
  SIGNUP_FAILURE: "SIGNIN_FAILURE",

  CLEAR_LOGIN_ERROR: "CLEAR_LOGIN_ERROR"
};

const {
  REACT_APP_API_URL
} = process.env;

const login = (username, password) => {
  return async dispatch => {
    dispatch(request(actionTypes.LOGGING_IN));
    const body = {
      username,
      password
    }
    try {
      const res = await fetch(REACT_APP_API_URL + "v1/users/login", {
        method: 'post',
        body: JSON.stringify(body),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        })
      });
      const r = await res.json()
      return dispatch(success(actionTypes.LOGIN_SUCCESS, r));
    } catch (err) {
      console.log(err.message);
      dispatch(failure(actionTypes.LOGIN_FAILURE, err.message));
    }
  };
};

const signup = () => {
  return async dispatch => {
    dispatch(request(actionTypes.SIGNING_UP));
    try {
      const res = await new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve(true);
        }, 1000);
      });
      return dispatch(success(actionTypes.SIGNUP_SUCCESS, res));
    } catch (err) {
      console.log(err);
      dispatch(failure(actionTypes.SIGNUP_FAILURE, err));
    }
  };
};

const logout = () => {
  return dispatch => {
    return dispatch(success(actionTypes.LOG_OUT));
  };
};

const clearErrorMessage = () => {
  return dispatch => {
    dispatch(success(actionTypes.CLEAR_LOGIN_ERROR));
  };
};

export const authActions = {
  login,
  logout,
  signup,
  clearErrorMessage
};