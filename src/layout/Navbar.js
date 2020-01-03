import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { authActions } from "../components/auth/authActions";

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
        <Link to="/"> Expense </Link>
        <button onClick={this.logout}> Logout </button>
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
