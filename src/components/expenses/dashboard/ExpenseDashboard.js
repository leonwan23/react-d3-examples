import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import "./expenseDashboard.scss";

import Layout from "../../../layout/Layout";
import Category from "../../../visualizations/Category";
import Day from "../../../visualizations/Day";
import Expenses from "../../../visualizations/Expenses";

import PacmanLoader from "../../common/PacmanLoader";
import MonthLabel from "./MonthLabel";
import ExpenseForm from "./ExpenseForm";

import { expenseDashboardActions } from "./expenseDashboardActions";

const width = 750;
const height = 900;

class ExpenseDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          id: 1,
          name: "Parking"
        },
        {
          id: 2,
          name: "Shopping"
        }
      ],
      selectedDate: new Date(),
      showExpenseForm: false
    };
  }

  componentDidMount() {
    const { selectedDate } = this.state;
    const { authUser, getExpenses } = this.props;
    if (authUser) {
      getExpenses(authUser.id, selectedDate.getFullYear());
    }
    window.onclick = event => {
      if (event.target === document.getElementById("expense-form")) {
        this.toggleExpenseForm();
      }
    };
  }

  addExpense = (name, amount, date) => {
    const { authUser } = this.props;
    var expense = {
      name,
      amount: parseFloat(amount),
      date,
      userId: authUser.id
    };
    this.props.addExpense(expense).then(() => this.toggleExpenseForm());
  };

  selectMonth = (prev = true) => {
    const { selectedDate } = this.state;
    const { authUser, getExpenses } = this.props;
    const monthDiff = prev ? -1 : 1;
    const newDate = moment(selectedDate)
      .add(monthDiff, "months")
      .toDate();
    this.setState(
      {
        selectedDate: newDate
      },
      () => {
        if (selectedDate.getFullYear() !== newDate.getFullYear()) {
          getExpenses(authUser.id, newDate.getFullYear());
        }
      }
    );
  };

  selectDateToView = date => {
    this.props.history.push({
      pathname: "/expense",
      date: new Date(date)
    });
  };

  toggleExpenseForm = () => {
    this.setState({
      showExpenseForm: !this.state.showExpenseForm
    });
  };

  render() {
    const { categories, selectedDate, showExpenseForm } = this.state;
    const { expenses, loadingExpenses } = this.props;

    const currentMonthExpenses = expenses.filter(
      d => new Date(d.date).getMonth() === selectedDate.getMonth()
    );
    return (
      <Layout page="home">
        <div className="expense-dashboard-page">
          {!loadingExpenses ? (
            ""
          ) : (
            <div className="loader-overlay">
              <PacmanLoader />
            </div>
          )}

          {showExpenseForm ? (
            <ExpenseForm
              addExpense={this.addExpense}
              closeForm={this.toggleExpenseForm}
            />
          ) : (
            <div
              className="add-expense-button"
              onClick={this.toggleExpenseForm}
            >
              +
            </div>
          )}

          <>
            <MonthLabel
              selectedDate={moment(selectedDate).format("MMM YYYY")}
              selectMonth={this.selectMonth}
            />
            <svg
              className="svg-container"
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
            >
              {/* <Category
            data={categories}
            width={width}
            height={height}
          /> */}

              <Day
                expenses={currentMonthExpenses}
                width={width}
                selectedDate={selectedDate}
                selectDateToView={this.selectDateToView}
              />
              <Expenses
                width={width}
                data={currentMonthExpenses}
                selectedDate={selectedDate}
              />
            </svg>
          </>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { authUser } = state.authReducer;
  const {
    loadingExpenses,
    expenses,
    expensesErr
  } = state.expenseDashboardReducer;
  return {
    loadingExpenses,
    expenses,
    expensesErr,
    authUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getExpenses: (userId, year) => {
      return dispatch(expenseDashboardActions.getExpenses(userId, year));
    },
    addExpense: expense => {
      return dispatch(expenseDashboardActions.addExpense(expense));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseDashboard);
