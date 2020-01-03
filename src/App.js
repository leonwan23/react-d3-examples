import React, { Component } from "react";
import Router from "./layout/Router";
import {connect} from 'react-redux';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router loggedIn={this.props.loggedIn}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { loggedIn } = state.authReducer;
  return {
    loggedIn
  };
};


export default connect(mapStateToProps)(App);
