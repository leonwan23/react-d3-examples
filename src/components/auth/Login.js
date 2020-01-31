import React, { Component } from "react";
import { connect } from "react-redux";
import { authActions } from "./authActions";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

import "./auth.scss";
import { isAuthenticated } from "../../lib/auth";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewLogin: true,
      signupUsername: "",
      signupPassword: "",
      reenterSignupPassword: "",
      loginUsername: "",
      loginPassword: ""
    };
  }

  componentDidMount() {
    this.props.clearErrorMessage();
  }

  login = () => {
    const { loginUsername, loginPassword } = this.state;
    this.props.login(loginUsername, loginPassword);
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
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
    const {
      viewLogin,
      signupUsername,
      signupPassword,
      loginUsername,
      loginPassword
    } = this.state;
    const {
      loggingIn,
      loginErr,
      signingUp,
      signupErr,
      reenterSignupPassword
    } = this.props;

    return (
      <div className="login-page">
        <div className="form-structor">
          <SignupForm
            toggleView={this.toggleView}
            viewLogin={viewLogin}
            handleChange={this.handleChange}
            username={signupUsername}
            password={signupPassword}
            reenterPassword={reenterSignupPassword}
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
            loginErr={loginErr}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    loggingIn,
    loginErr,
    signingUp,
    signupErr,
    authUser
  } = state.authReducer;
  return {
    loggingIn,
    loginErr,
    signingUp,
    signupErr,
    authUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      return dispatch(authActions.login(username, password));
    },
    signup: (username, password) => {
      return dispatch(authActions.signup(username, password));
    },
    clearErrorMessage: () => {
      return dispatch(authActions.clearErrorMessage());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
