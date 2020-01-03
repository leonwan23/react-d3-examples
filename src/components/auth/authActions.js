import { request, success, failure } from "../../utils/redux";

export const actionTypes = {
  LOGGING_IN: "LOGGING_IN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",

  LOG_OUT: "LOG_OUT"
};

const login = () => {
  return async dispatch => {
    dispatch(request(actionTypes.LOGGING_IN));
    try {
      const res = await new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(true);
        }, 1000);
      });
      return dispatch(success(actionTypes.LOGIN_SUCCESS, res));
    } catch (err) {
      console.log(err);
      dispatch(failure(actionTypes.LOGIN_FAILURE, err));
    }
  };
};

const logout = () => {
  return dispatch => {
    return dispatch(success(actionTypes.LOG_OUT));
  };
};

export const authActions = {
  login,
  logout
};
