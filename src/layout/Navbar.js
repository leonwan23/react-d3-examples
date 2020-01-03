import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { authActions } from "../components/auth/authActions";

import "./layout.scss";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  logout = () => {
    this.props.logout();
  };
  render() {
    return (
      <div className="navbar">
        <Link to="/">Expense</Link>
        <div>
          <span className="navbar-label">Welcome User</span>
          <span className="separator"></span>
          <a onClick={this.logout}> Logout </a>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      return dispatch(authActions.logout());
    }
  };
};

export default connect(null, mapDispatchToProps)(Header);
