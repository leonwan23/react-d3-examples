import React from "react";
import Spinner from "../common/Spinner";

export default function LoginForm({
  toggleView,
  viewLogin,
  login,
  handleChange,
  username,
  password,
  loggingIn,
  signingUp,
  loginErr
}) {
  const buttonDisabled =
    username.length < 1 ||
    username.length < 6 ||
    password.length < 1 ||
    password.length < 6 ||
    loggingIn;
  return (
    <div className={"login " + (viewLogin ? "" : "slide-up")}>
      <div className="center">
        {!loginErr || !viewLogin ? "" : <div className="error-message">{loginErr}</div>}
        <h2
          className="form-title"
          id="login"
          onClick={toggleView}
          style={{ pointerEvents: viewLogin || signingUp ? "none" : "all" }}
        >
          <span>or</span>Log in
        </h2>
        <div className="form-holder">
          <input
            type="text"
            className="input"
            placeholder="Username"
            value={username}
            name="loginUsername"
            onChange={handleChange}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            name="loginPassword"
            onChange={handleChange}
          />
        </div>
        <button
          className={"submit-btn " + (buttonDisabled ? "disabled" : "")}
          onClick={login}
          disabled={buttonDisabled}
        >
          {!loggingIn ? "Log in" : <Spinner />}
        </button>
      </div>
    </div>
  );
}
