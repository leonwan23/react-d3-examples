import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Login from "../components/auth/Login";
import ExpenseDashboard from "../components/expenses/dashboard/ExpenseDashboard";
import ExpensePage from "../components/expenses/expense/ExpensePage";
import UserPage from '../components/users/UserPage'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={ExpenseDashboard} />
        <Route exact path="/expense" component={ExpensePage} />
        <Route exact path="/users" component={UserPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
