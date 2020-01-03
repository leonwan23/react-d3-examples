import React, { Component } from "react";
import { connect } from "react-redux";
import { authActions } from "./authActions";
import { Redirect } from "react-router-dom";

class Login extends Component {
  login = () => {
    this.props.login();
  };
  render() {
    const { loggedIn } = this.props;
    if (loggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <button onClick={this.login}> login </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { loggingIn, loggedIn } = state.authReducer;
  return {
    loggingIn,
    loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: () => {
      return dispatch(authActions.login());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
