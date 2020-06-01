import { request, success, failure } from "../../../utils/redux";
import { expenseService } from "./expenseService";
import { expenseDashboardService } from "../dashboard/expenseDashboardService";

export const actionTypes = {
  LOADING_EXPENSES_BY_DATE: "LOADING_EXPENSES_BY_DATE",
  GET_EXPENSES_BY_DATE_SUCCESS: "GET_EXPENSES_BY_DATE_SUCCESS",
  GET_EXPENSES_BY_DATE_FAILURE: "GET_EXPENSES_BY_DATE_FAILURE",

  DELETING_EXPENSE: "DELETING_EXPENSE",
  DELETE_EXPENSE_SUCCESS: "DELETE_EXPENSE_SUCCESS",
  DELETE_EXPENSE_FAILURE: "DELETE_EXPENSE_FAILURE",

  ADDING_EXPENSE_BY_DATE: "ADDING_EXPENSE_BY_DATE",
  ADD_EXPENSE_BY_DATE_SUCCESS: "ADD_EXPENSE_BY_DATE_SUCCESS",
  ADD_EXPENSE_BY_DATE_FAILURE: "ADD_EXPENSE_BY_DATE_FAILURE"
};

const getExpensesByDate = (userId, date) => {
  return async dispatch => {
    dispatch(request(actionTypes.LOADING_EXPENSES_BY_DATE));
    try {
      const result = await expenseService.getExpensesByDate(userId, date);
      dispatch(success(actionTypes.GET_EXPENSES_BY_DATE_SUCCESS, result));
    } catch (err) {
      const { error } = err.data;
      dispatch(failure(actionTypes.GET_EXPENSES_BY_DATE_FAILURE, error));
    }
  };
};

const deleteExpense = id => {
  return async dispatch => {
    dispatch(request(actionTypes.DELETING_EXPENSE, id));
    return expenseService.deleteExpense(id).then(
      result => {
        dispatch(success(actionTypes.DELETE_EXPENSE_SUCCESS, id));
      },
      err => {
        const { error } = err.data;
        dispatch(failure(actionTypes.DELETE_EXPENSE_FAILURE, error));
      }
    );
  };
};

const addExpense = expense => {
  const { name, amount, userId, date } = expense;
  return dispatch => {
    dispatch(request(actionTypes.ADDING_EXPENSE_BY_DATE));
    return expenseDashboardService
      .addExpense({ name, amount, userId, date })
      .then(
        result => {
          dispatch(success(actionTypes.ADD_EXPENSE_BY_DATE_SUCCESS, result.expense));
        },
        err => {
          const { error } = err.data;
          dispatch(failure(actionTypes.ADD_EXPENSE_BY_DATE_FAILURE, error));
        }
      );
  };
};

export const expenseActions = {
  getExpensesByDate,
  deleteExpense,
  addExpense
};
