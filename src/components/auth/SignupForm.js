import React from "react";
import Spinner from "../common/Spinner";
import {theme} from '../../constants/theme'

export default function SignupForm({
  toggleView,
  viewLogin,
  handleChange,
  username,
  password,
  reenterPassword,
  signup,
  signingUp,
  loggingIn
}) {
  const buttonDisabled =
    username.length < 1 ||
    username.length < 6 ||
    password.length < 1 ||
    password.length < 6 ||
    signingUp;
  return (
    <div className={"signup " + (viewLogin ? "slide-up" : "")}>
      <h2
        className="form-title"
        id="signup"
        onClick={toggleView}
        style={{pointerEvents: !viewLogin || loggingIn ? "none" : "all"}}
      >
        <span>or</span>Sign up
      </h2>
      <div className="form-holder">
        <input
          type="text"
          className="input"
          placeholder="Username"
          value={username}
          name="signupUsername"
          onChange={handleChange}
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          name="signupPassword"
          onChange={handleChange}
        />
        <input
          type="password"
          className="input"
          placeholder="Re-enter password"
          value={reenterPassword}
          name="reenterSignupPassword"
          onChange={handleChange}
        />
      </div>
      {buttonDisabled ? (
        <div className="hint">
          * Username and password must be at least 6 characters
        </div>
      ) : (
        ""
      )}
      <button
        className={"submit-btn " + (buttonDisabled ? "disabled" : "")}
        disabled={buttonDisabled}
        onClick={signup}
      >
        {!signingUp ? "Sign up" : <Spinner color={theme.PRIMARY_COLOR}/>}
      </button>
    </div>
  );
}
