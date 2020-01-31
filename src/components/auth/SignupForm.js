import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../common/Spinner";
import { theme } from "../../constants/theme";
import { useInput } from "../../utils";
import { isAuthenticated } from "../../lib/auth";
import { Redirect } from "react-router-dom";

export default function SignupForm({ toggleView, viewLogin, signup }) {
  const { signupErr, loggingIn, signingUp } = useSelector(
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
  const [reenterPassword, reenterPasswordInput] = useInput({
    className: "input",
    placeholder: "Reenter password",
    type: "password"
  });
  const buttonDisabled =
    username.length < 6 ||
    password.length < 6 ||
    reenterPassword < 6 ||
    signingUp;
  const signUpFormClass = "signup " + (viewLogin ? "slide-up" : "");
  const submitButtonClass = "submit-btn " + (buttonDisabled ? "disabled" : "");
  if (isAuthenticated()) {
    return <Redirect to="/" />;
  }
  return (
    <div className={signUpFormClass}>
      {!signupErr || viewLogin ? (
        ""
      ) : (
        <div className="error-message">{signupErr}</div>
      )}
      <h2
        className="form-title"
        id="signup"
        onClick={toggleView}
        style={{ pointerEvents: !viewLogin || loggingIn ? "none" : "all" }}
      >
        <span>or</span>Sign up
      </h2>
      <div className="form-holder">
        {userInput}
        {passwordInput}
        {reenterPasswordInput}
      </div>
      {buttonDisabled && !signingUp ? (
        <div className="hint">
          * Username and password must be at least 6 characters
        </div>
      ) : (
        ""
      )}
      <button
        className={submitButtonClass}
        disabled={buttonDisabled}
        onClick={() => signup(username, password, reenterPassword)}
      >
        {!signingUp ? "Sign up" : <Spinner color={theme.PRIMARY_COLOR} />}
      </button>
    </div>
  );
}
