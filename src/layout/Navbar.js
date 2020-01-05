import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { authActions } from "../components/auth/authActions";

import "./layout.scss";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  logout = () => {
    this.props.logout();
  };
  render() {
    const { page } = this.props;
    return (
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/" className={page === "home" ? "active" : ""}>
                Home
              </Link>
            </li>
          </ul>

          <div>
            <span className="navbar-label">Welcome User</span>
            <span className="separator"></span>
            <a onClick={this.logout}> Logout </a>
          </div>
        </nav>
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

export default connect(null, mapDispatchToProps)(Navbar);
