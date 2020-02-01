import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import Layout from "../../../layout/Layout";
import PacmanLoader from "../../common/PacmanLoader";

import { expenseActions } from "./expenseActions";

import "./expense.scss";

class ExpensePage extends Component {
  componentDidMount() {
    const { getExpensesByDate, authUser, location } = this.props;
    const date = location.date
      ? moment(location.date).format("YYYY/MM/DD")
      : moment();
    if (date && authUser) {
      getExpensesByDate(authUser.id, date);
    }
  }
  render() {
    const { loadingExpensesByDate, expensesByDate } = this.props;
    return (
      <Layout page="expense">
        <div className="expense-page">
          {loadingExpensesByDate ? (
            <div className="loader-overlay">
              <PacmanLoader />
            </div>
          ) : expensesByDate.length > 0 ? (
            expensesByDate.map(expDate => (
              <div key={expDate.id}>
                <div>{expDate.name}</div>
              </div>
            ))
          ) : (
            <div>No expenses</div>
          )}
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { authUser } = state.authReducer;
  const {
    loadingExpensesByDate,
    expensesByDate,
    expensesByDateErr
  } = state.expenseReducer;
  return {
    authUser,
    loadingExpensesByDate,
    expensesByDate,
    expensesByDateErr
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getExpensesByDate: (userId, date) => {
      return dispatch(expenseActions.getExpensesByDate(userId, date));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensePage);
