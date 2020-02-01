import React from "react";
import { Switch, Route } from "react-router";
import Login from "../components/auth/Login";
import ExpenseDashboard from "../components/expenses/dashboard/ExpenseDashboard";
import ExpensePage from "../components/expenses/expense/ExpensePage"

const Router = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={ExpenseDashboard} />
      <Route exact path="/expense" component={ExpensePage} />
    </Switch>
  );
};

export default Router;
