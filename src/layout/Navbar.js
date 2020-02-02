import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { authActions } from "../components/auth/authActions";
import { authConstants } from "../constants/authConstants";
import { isAuthenticated } from "../lib/auth";

import "./layout.scss";

export default function Navbar({ page }) {
  const { authUser } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const username = authUser ? authUser.username : "User";
  if (!isAuthenticated()) {
    return <Redirect to="/login" />;
  }
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className={page === "home" ? "active" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to={{ pathname: "/expense" }}
            className={page === "expense" ? "active" : ""}
          >
            Expense
          </Link>
        </li>
        {authUser && authUser.role === authConstants.ROLES.SUPERUSER ? (
          <li>
            <Link
              to={{ pathname: "/users" }}
              className={page === "users" ? "active" : ""}
            >
              Users
            </Link>
          </li>
        ) : null}
      </ul>

      <div>
        <span className="navbar-label">Welcome {username}</span>
        <span className="separator"></span>
        <button onClick={() => dispatch(authActions.logout())}> Logout </button>
      </div>
    </nav>
  );
}
