import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import "./App.css";
import "./components/expenses/expenses.scss";

import Category from "./visualizations/Category";
import Day from "./visualizations/Day";
import Expenses from "./visualizations/Expenses";

import HandLoader from "./components/common/HandLoader";
import MonthLabel from "./components/expenses/MonthLabel";
import ExpenseForm from "./components/expenses/ExpenseForm";

import { expensesActions } from "./components/expenses/expensesActions";

const width = 750;
const height = 1000;

const style = {
  width
};

class App extends React.Component {
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
      selectedDate: new Date(), //current day,
      startDate: new Date(),
      amount: ""
    };
  }

  componentDidMount() {
    const { selectedDate } = this.state;
    this.props.getExpenses(selectedDate.getFullYear());
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
    const { amount, expenseBeingAdded, startDate, expenses } = this.state;
    // take the value of the input and create new expense
    var expense = Object.assign(expenseBeingAdded, {
      fx: null,
      fy: null,
      amount: parseFloat(amount),
      date: moment(startDate).format("MM/DD/YYYY")
    });
    this.props.addExpense(expense);
    this.setState({
      // expenses: [...expenses, expense],
      expenseBeingAdded: { name: "" },
      amount: ""
    });
  };

  deleteExpense = category => {};

  selectMonth = (prev = true) => {
    const { selectedDate } = this.state;
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
          this.props.getExpenses(newDate.getFullYear());
        }
      }
    );
  };

  handleDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    const {
      categories,
      selectedDate,
      expenseBeingAdded,
      amount,
      startDate
    } = this.state;
    const { expenses, loadingExpenses, addingExpense } = this.props;

    const currentMonthExpenses = expenses.filter(
      d => new Date(d.date).getMonth() === selectedDate.getMonth()
    );

    return (
      <div className="App" style={style}>
        {!loadingExpenses ? (
          ""
        ) : (
          <div className="loader-overlay">
            <HandLoader />
          </div>
        )}
        <ExpenseForm
          addExpense={this.addExpense}
          startExpense={this.startExpense}
          expenseBeingAdded={expenseBeingAdded}
          handleAmountChange={this.handleAmountChange}
          startDate={startDate}
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
          />
          <Expenses
            width={width}
            data={currentMonthExpenses}
            selectedDate={selectedDate}
            expenseBeingAdded={expenseBeingAdded}
          />
        </svg>
      </div>
    );
  }
}

const mapStateToProps = state => {
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
    addingExpense
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getExpenses: year => {
      return dispatch(expensesActions.getExpenses(year));
    },
    addExpense: expense => {
      return dispatch(expensesActions.addExpense(expense));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
