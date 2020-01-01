import React from "react";
import "./App.css";
import fakeData from "./fakeData.json";
import moment from "moment";

import Category from "./visualizations/Category";
import Day from "./visualizations/Day";
import Expenses from "./visualizations/Expenses";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const width = 750;
const height = 1000;

const ENTER_CODE = 13;

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
      expenses: fakeData,
      amount: ""
    };
  }

  componentDidMount() {}

  startExpense = event => {
    const { value } = event.target;
    const expense = { name: value };
    this.setState({
      expenseBeingAdded: expense
    });
  };

  handleAmountChange = event => {
    const { name, value } = event.target;
    if(!isNaN(value)){
      this.setState({
        [name]: value
      })
    }
  };

  addExpense = () => {
    const { amount, expenseBeingAdded, startDate, expenses } = this.state;
    // take the value of the input and create new expense
    var expense = Object.assign(expenseBeingAdded, {
      fx: null,
      fy: null,
      amount,
      date: moment(startDate).format("MM/DD/YYYY")
    });

    this.setState({
      expenses: [...expenses, expense],
      expenseBeingAdded: { name: "" },
      amount: ""
    });
  };

  deleteExpense = category => {};

  selectMonth = (prev = true) => {
    const { selectedDate } = this.state;
    const monthDiff = prev ? -1 : 1;
    this.setState({
      selectedDate: moment(selectedDate)
        .add(monthDiff, "months")
        .toDate()
    });
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
      expenses,
      expenseBeingAdded,
      amount
    } = this.state;

    const currentMonthExpenses = expenses.filter(
      d => new Date(d.date).getMonth() === selectedDate.getMonth()
    );

    return (
      <div className="App" style={style}>
        <form className="expense-form" onSubmit={this.addExpense}>
          <input
            id="category-input"
            // className="category-input"
            placeholder="Name"
            onChange={this.startExpense}
            name="expenseBeingAdded"
            value={expenseBeingAdded.name}
          ></input>
          <input
            placeholder="Amount"
            name="amount"
            type="text"
            onChange={this.handleAmountChange}
            value={amount}
          />
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleDateChange}
          />
          <button
            onClick={this.addExpense}
            disabled={!expenseBeingAdded.name || !amount}
          >
            Add
          </button>
        </form>
        <h3 className="month-label">
          <span style={{ cursor: "pointer" }} onClick={this.selectMonth}>
            ←{" "}
          </span>
          {moment(selectedDate).format("MMM YYYY")}
          <span
            style={{ cursor: "pointer" }}
            onClick={() => this.selectMonth(false)}
          >
            {" "}
            →
          </span>
        </h3>
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

export default App;
