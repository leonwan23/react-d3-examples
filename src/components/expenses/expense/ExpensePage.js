import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import Layout from "../../../layout/Layout";
import PacmanLoader from "../../common/PacmanLoader";
import ExpenseList from "./ExpenseList";
import DatePicker from "react-datepicker";
import RadialChart from "../../../visualizations/RadialChart";

import { expenseActions } from "./expenseActions";

import { calendarIcon } from "../../../static/icons";
import "./expense.scss";
import "react-datepicker/dist/react-datepicker.css";

const width = 750;
const height = 500;

class ExpensePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date()
    };
  }

  componentDidMount() {
    const { getExpensesByDate, authUser, location } = this.props;
    let date = location.date
      ? new Date(moment(location.date).format("YYYY-MM-DD"))
      : moment().toDate();
    if (date && authUser) {
      getExpensesByDate(authUser.id, date);
      this.setState({
        currentDate: date
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
        getExpensesByDate(authUser.id, moment(date).format("YYYY/MM/DD"));
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
