import { request, success, failure } from "../../utils/redux";
import { expensesService } from "./expensesService";

export const actionTypes = {
  LOADING_EXPENSES: "LOADING_EXPENSES",
  GET_EXPENSES_SUCCESS: "GET_EXPENSES_SUCCESS",
  GET_EXPENSES_FAILURE: "GET_EXPENSES_FAILURE",

  ADDING_EXPENSE: "ADDING_EXPENSE",
  ADD_EXPENSE_SUCCESS: "ADD_EXPENSE_SUCCESS",
  ADD_EXPENSE_FAILURE: "ADD_EXPENSE_FAILURE"
};

const getExpenses = (userId, year) => {
  return dispatch => {
    dispatch(request(actionTypes.LOADING_EXPENSES));
    return expensesService.getExpenses(userId, year).then(
      result => {
        dispatch(success(actionTypes.GET_EXPENSES_SUCCESS, result));
      },
      err => {
        const { error } = err.data;
        dispatch(failure(actionTypes.GET_EXPENSES_FAILURE, error));
      }
    );
  };
};

const addExpense = expense => {
  const { name, amount, userId, date } = expense;
  return dispatch => {
    dispatch(request(actionTypes.ADDING_EXPENSE));
    return expensesService.addExpense({ name, amount, userId, date }).then(
      result => {
        dispatch(success(actionTypes.ADD_EXPENSE_SUCCESS, expense));
      },
      err => {
        const { error } = err.data;
        dispatch(failure(actionTypes.ADD_EXPENSE_FAILURE, error));
      }
    );
  };
};

export const expensesActions = {
  getExpenses,
  addExpense
};
