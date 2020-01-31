import { request, success, failure } from "../../utils/redux";
import { authService } from "./authService";
import { setCookie } from "../../lib/session";
import { signout } from "../../lib/auth";
import { authConstants } from "../../constants/authConstants";

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

const login = (username, password) => {
  return dispatch => {
    dispatch(request(actionTypes.LOGGING_IN));
    return authService.login(username, password).then(
      result => {
        setCookie(authConstants.USER_ACCESS_TOKEN_KEY, result.token);
        dispatch(success(actionTypes.LOGIN_SUCCESS, result));
      },
      err => {
        const { error } = err.data;
        dispatch(failure(actionTypes.LOGIN_FAILURE, error));
      }
    );
  };
};

const signup = (username, password, reenterPassword) => {
  return dispatch => {
    dispatch(request(actionTypes.SIGNING_UP));
    //check passwords match
    if (password !== reenterPassword) {
      return dispatch(
        failure(actionTypes.SIGNUP_FAILURE, "Passwords don't match")
      );
    } else {
      return authService.signup(username, password).then(
        result => {
          setCookie(authConstants.USER_ACCESS_TOKEN_KEY, result.token);
          dispatch(success(actionTypes.SIGNUP_SUCCESS, result));
        },
        err => {
          const { error } = err.data;
          dispatch(failure(actionTypes.SIGNUP_FAILURE, error));
        }
      );
    }
  };
};

const logout = () => {
  return dispatch => {
    signout();
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
