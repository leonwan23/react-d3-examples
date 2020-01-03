import {
  actionTypes
} from "./authActions";

const initialState = {
  loggingIn: false,
  loggedIn: false,
  loginErr: "",
  authUser: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGGING_IN:
      return Object.assign({}, state, {
        loggingIn: true
      });
    case actionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loggingIn: false,
        loggedIn: true,
        loginErr: ""
      });
    case actionTypes.LOGIN_FAILURE:
      return Object.assign({}, state, {
        loggingIn: false,
        loggedIn: false,
        loginErr: action.payload
      });
    case actionTypes.LOG_OUT:
      return Object.assign({}, state, {
        loggingIn: false,
        loggedIn: false,
        authUser: null
      });
    default:
      return state;
  }
};