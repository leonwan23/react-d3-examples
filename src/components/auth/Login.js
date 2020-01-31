import React, { Component } from "react";
import { connect } from "react-redux";
import { authActions } from "./authActions";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

import "./auth.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewLogin: true
    };
  }

  componentDidMount() {
    this.props.clearErrorMessage();
  }

  login = (username, password) => {
    this.props.login(username, password);
  };

  signup = (username, password, reenterPassword) => {
    this.props.signup(username, password, reenterPassword);
  };

  toggleView = () => {
    this.setState({
      viewLogin: !this.state.viewLogin
    });
  };
  render() {
    const { viewLogin } = this.state;

    return (
      <div className="login-page">
        <div className="form-structor">
          <SignupForm
            toggleView={this.toggleView}
            viewLogin={viewLogin}
            signup={this.signup}
          />
          <LoginForm
            viewLogin={viewLogin}
            toggleView={this.toggleView}
            login={this.login}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      return dispatch(authActions.login(username, password));
    },
    signup: (username, password, reenterPassword) => {
      return dispatch(authActions.signup(username, password, reenterPassword));
    },
    clearErrorMessage: () => {
      return dispatch(authActions.clearErrorMessage());
    }
  };
};

export default connect(null, mapDispatchToProps)(Login);
