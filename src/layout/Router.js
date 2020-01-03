import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../components/auth/Login";
import ExpensePage from "../components/expenses/ExpensePage";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return rest.loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      );
    }}
  />
);

const Router = props => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/" component={ExpensePage} loggedIn={props.loggedIn} />
    </Switch>
  );
};
export default Router;
