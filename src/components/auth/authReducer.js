import { actionTypes } from "./authActions";

const initialState = {
  loggingIn: false,
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
        loginErr: "",
        signupErr: ""
      });
    case actionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loggingIn: false,
        authUser: action.payload.user,
        loginErr: ""
      });
    case actionTypes.LOGIN_FAILURE:
      return Object.assign({}, state, {
        loggingIn: false,
        loginErr: action.payload,
        authUser: null
      });
    case actionTypes.LOG_OUT:
      return Object.assign({}, state, {
        loggingIn: false,
        signingUp: false,
        authUser: null
      });
    case actionTypes.SIGNING_UP:
      return Object.assign({}, state, {
        signingUp: true,
        signupErr: "",
        loginErr: ""
      });
    case actionTypes.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        signingUp: false,
        signupErr: "",
        authUser: action.payload.user
      });
    case actionTypes.SIGNUP_FAILURE:
      return Object.assign({}, state, {
        signingUp: false,
        signupErr: action.payload,
        authUser: null
      });
    case actionTypes.CLEAR_LOGIN_ERROR:
      return Object.assign({}, state, {
        loggingIn: false,
        signingUp: false,
        loginErr: "",
        signupErr: ""
      });
    default:
      return state;
  }
};
