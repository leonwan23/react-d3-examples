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
    const { page, authUser } = this.props;
    const username = authUser ? authUser.username : "User"
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
            <span className="navbar-label">Welcome {username}</span>
            <span className="separator"></span>
            <a onClick={this.logout}> Logout </a>
          </div>
        </nav>
    );
  }
}

const mapStateToProps = state => {
  const { authUser } = state.authReducer;
  return {
    authUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      return dispatch(authActions.logout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
