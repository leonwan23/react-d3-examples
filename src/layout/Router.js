import React from "react";
import { Switch, Route } from "react-router";
import Login from "../components/auth/Login";
import ExpensePage from "../components/expenses/ExpensePage";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={ExpensePage} />
    </Switch>
  );
};

export default Router;
