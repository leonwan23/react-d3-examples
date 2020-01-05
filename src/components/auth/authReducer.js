import { actionTypes } from "./authActions";

const initialState = {
  loggingIn: false,
  loggedIn: false,
  loginErr: "",
  authUser: null,
  signingUp: false,
  signupErr: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGGING_IN:
      return Object.assign({}, state, {
        loggingIn: true,
        loginErr: ""
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
    case actionTypes.SIGNING_UP:
      return Object.assign({}, state, {
        signingUp: true,
        signupErr: ""
      });
    case actionTypes.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        signingUp: false,
        loggedIn: true,
        signupErr: ""
      });
    case actionTypes.SIGNUP_FAILURE:
      return Object.assign({}, state, {
        signingUp: false,
        loggedIn: false,
        signupErr: action.payload
      })
    default:
      return state;
  }
};
