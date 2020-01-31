import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import "./expenses.scss";

import Layout from "../../layout/Layout";
import Category from "../../visualizations/Category";
import Day from "../../visualizations/Day";
import Expenses from "../../visualizations/Expenses";

import PacmanLoader from "../common/PacmanLoader";
import MonthLabel from "./MonthLabel";
import ExpenseForm from "./ExpenseForm";

import { expensesActions } from "./expensesActions";

const width = 750;
const height = 900;

class ExpensePage extends React.Component {
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
      expenseBeingAdded: { name: "" },
      selectedDate: new Date(),
      addExpenseDate: new Date(),
      amount: "",
      selectedDateToView: null,
      token: null
    };
  }

  componentDidMount() {
    const { selectedDate } = this.state;
    const { authUser, getExpenses } = this.props;
    if (authUser) {
      getExpenses(authUser.id, selectedDate.getFullYear());
    }
  }

  startExpense = event => {
    const { value } = event.target;
    const expense = { name: value };
    this.setState({
      expenseBeingAdded: expense
    });
  };

  handleAmountChange = event => {
    const { name, value } = event.target;
    if (!isNaN(value)) {
      this.setState({
        [name]: value
      });
    }
  };

  addExpense = () => {
    const { authUser } = this.props;
    const { amount, expenseBeingAdded, addExpenseDate } = this.state;
    // take the value of the input and create new expense
    var expense = Object.assign(expenseBeingAdded, {
      fx: null,
      fy: null,
      amount: parseFloat(amount),
      date: addExpenseDate,
      userId: authUser.id
    });
    this.props.addExpense(expense);
    this.setState({
      expenseBeingAdded: { name: "" },
      amount: ""
    });
  };

  deleteExpense = category => {};

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

  handleDateChange = date => {
    this.setState({
      addExpenseDate: date
    });
  };

  selectDateToView = date => {
    this.setState({
      selectedDateToView: date
    });
  };

  render() {
    const {
      categories,
      selectedDate,
      expenseBeingAdded,
      amount,
      addExpenseDate,
      selectedDateToView
    } = this.state;

    const { expenses, loadingExpenses, addingExpense } = this.props;

    const currentMonthExpenses = expenses.filter(
      d => new Date(d.date).getMonth() === selectedDate.getMonth()
    );
    return (
      <Layout page="home">
        <div className="expenses-page">
          {!loadingExpenses ? (
            ""
          ) : (
            <div className="loader-overlay">
              <PacmanLoader />
            </div>
          )}
          {selectedDateToView ? (
            <div onClick={() => this.selectDateToView(null)}>back</div>
          ) : (
            <>
              <ExpenseForm
                addExpense={this.addExpense}
                startExpense={this.startExpense}
                expenseBeingAdded={expenseBeingAdded}
                handleAmountChange={this.handleAmountChange}
                startDate={addExpenseDate}
                handleDateChange={this.handleDateChange}
                amount={amount}
                addingExpense={addingExpense}
              />
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
                  expenseBeingAdded={expenseBeingAdded}
                />
              </svg>
            </>
          )}
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
    expensesErr,
    addingExpense
  } = state.expensesReducer;
  return {
    loadingExpenses,
    expenses,
    expensesErr,
    addingExpense,
    authUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getExpenses: (userId, year) => {
      return dispatch(expensesActions.getExpenses(userId, year));
    },
    addExpense: expense => {
      return dispatch(expensesActions.addExpense(expense));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensePage);
