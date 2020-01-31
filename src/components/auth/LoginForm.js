import React from "react";
import { useSelector } from "react-redux";
import { useInput } from "../../utils";
import Spinner from "../common/Spinner";
import { isAuthenticated } from "../../lib/auth";
import { Redirect } from "react-router-dom";

export default function LoginForm({ toggleView, viewLogin, login }) {
  const { loginErr, loggingIn, signingUp } = useSelector(
    state => state.authReducer
  );
  const [username, userInput] = useInput({
    className: "input",
    placeholder: "Enter username"
  });
  const [password, passwordInput] = useInput({
    className: "input",
    placeholder: "Enter password",
    type: "password"
  });
  const buttonDisabled =
    username.length < 6 || password.length < 6 || loggingIn;
  if (isAuthenticated()) {
    return <Redirect to="/" />;
  }
  return (
    <div className={"login " + (viewLogin ? "" : "slide-up")}>
      <div className="center">
        {!loginErr || !viewLogin ? (
          ""
        ) : (
          <div className="error-message">{loginErr}</div>
        )}
        <h2
          className="form-title"
          id="login"
          onClick={toggleView}
          style={{ pointerEvents: viewLogin || signingUp ? "none" : "all" }}
        >
          <span>or</span>Log in
        </h2>
        <div className="form-holder">
          {userInput}
          {passwordInput}
        </div>
        <button
          className={"submit-btn " + (buttonDisabled ? "disabled" : "")}
          onClick={() => login(username, password)}
          disabled={buttonDisabled}
        >
          {!loggingIn ? "Log in" : <Spinner />}
        </button>
      </div>
    </div>
  );
}
