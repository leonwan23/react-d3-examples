import React, { Component } from "react";
import { connect } from "react-redux";
import { authActions } from "./authActions";
import { Redirect } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

import "./auth.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewLogin: true,
      signupUsername: "",
      signupPassword: "",
      loginUsername: "",
      loginPassword: ""
    };
  }
  login = () => {
    const { loginUsername, loginPassword } = this.state;
    this.props.login();
  };

  signup = () => {
    const { signupUsername, signupPassword } = this.state;
    this.props.signup();
  };

  toggleView = () => {
    this.setState({
      viewLogin: !this.state.viewLogin
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const {
      viewLogin,
      signupUsername,
      signupPassword,
      loginUsername,
      loginPassword
    } = this.state;
    const { loggedIn, loggingIn, loginErr, signingUp, signupErr } = this.props;
    if (loggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-page">
        <div className="form-structor">
          <SignupForm
            toggleView={this.toggleView}
            viewLogin={viewLogin}
            handleChange={this.handleChange}
            username={signupUsername}
            password={signupPassword}
            signup={this.signup}
            signingUp={signingUp}
            loggingIn={loggingIn}
          />
          <LoginForm
            viewLogin={viewLogin}
            toggleView={this.toggleView}
            login={this.login}
            handleChange={this.handleChange}
            username={loginUsername}
            password={loginPassword}
            loggingIn={loggingIn}
            signingUp={signingUp}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    loggingIn,
    loggedIn,
    loginErr,
    signingUp,
    signupErr,
    authUser
  } = state.authReducer;
  return {
    loggingIn,
    loggedIn,
    loginErr,
    signingUp,
    signupErr,
    authUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: () => {
      return dispatch(authActions.login());
    },
    signup: () => {
      return dispatch(authActions.signup());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
