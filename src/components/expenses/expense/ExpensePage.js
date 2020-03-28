import React, { Component } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import moment from "moment";

import Layout from "../../../layout/Layout";
import PacmanLoader from "../../common/PacmanLoader";
import Spinner from "../../common/Spinner";
import ExpenseList from "./ExpenseList";
import DatePicker from "react-datepicker";
import RadialChart from "../../../visualizations/RadialChart";

import { expenseActions } from "./expenseActions";
import { useInput } from "../../../utils";
import { checkValidExpenseForm } from "../../../utils/validation";

import { calendarIcon } from "../../../static/icons";
import "./expense.scss";
import "react-datepicker/dist/react-datepicker.css";

const width = 750;
const height = 500;
const dateFormat = "MM/DD/YYYY";

function AddExpense({ date }) {
  const { addingExpenseByDate } = useSelector(state => state.expenseReducer);
  const { authUser } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [name, nameInput] = useInput({
    placeholder: "Item",
    className: "name"
  });
  const [amount, amountInput] = useInput({
    placeholder: "Amount",
    className: "amount"
  });
  const buttonDisabled =
    checkValidExpenseForm(name, amount) || addingExpenseByDate;
  const expense = { name, amount, userId: authUser.id, date };
  function addExpense() {
    dispatch(expenseActions.addExpense(expense));
  }
  return (
    <form className="add-expense-container" onSubmit={addExpense}>
      {nameInput}
      <span className="dollar-sign">$</span>
      {amountInput}
      <button
        disabled={buttonDisabled}
        className={buttonDisabled ? "disabled" : ""}
        onClick={addExpense}
      >
        {!addingExpenseByDate ? "Add" : <Spinner radius={10} />}
      </button>
    </form>
  );
}

class ExpensePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date()
    };
  }

  componentDidMount() {
    const { getExpensesByDate, authUser, location } = this.props;
    let date = location.date ? moment(location.date).local() : moment().local();
    if (date && authUser) {
      console.log(date.format(dateFormat), new Date(date.format(dateFormat)));
      getExpensesByDate(authUser.id, date.format(dateFormat));
      this.setState({
        currentDate: date.toDate()
      });
    }
  }

  handleSelectDate = date => {
    const { getExpensesByDate, authUser } = this.props;
    this.setState(
      {
        currentDate: date
      },
      () => {
        getExpensesByDate(authUser.id, moment(date).format(dateFormat));
      }
    );
  };

  render() {
    const { loadingExpensesByDate, expensesByDate } = this.props;
    const { currentDate } = this.state;
    return (
      <Layout page="expense">
        <div className="expense-page">
          {loadingExpensesByDate ? (
            <div className="loader-overlay">
              <PacmanLoader />
            </div>
          ) : null}
          <label className="date-picker">
            <i className="icon">{calendarIcon}</i>
            <DatePicker
              selected={currentDate}
              onChange={this.handleSelectDate}
              dateFormat="dd/MM/yyyy"
              todayButton="Go to Today"
            />
          </label>
          <AddExpense date={currentDate} />
          <svg
            className="expense-svg-container"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
          >
            <RadialChart data={expensesByDate} width={width} />
          </svg>
          <ExpenseList />
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
