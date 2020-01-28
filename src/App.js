import React, { Component } from "react";
import Router from "./layout/Router";
import { connect } from "react-redux";

class App extends Component {
  render() {
    const { authUser, token } = this.props;
    return (
      <div className="App">
        <Router token={token}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { token, authUser } = state.authReducer;
  return {
    authUser,
    token
  };
};

export default connect(mapStateToProps)(App);
