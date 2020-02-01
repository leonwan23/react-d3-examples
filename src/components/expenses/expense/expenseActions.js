import { request, success, failure } from "../../../utils/redux";
import { expenseService } from "./expenseService";

export const actionTypes = {
  LOADING_EXPENSES_BY_DATE: "LOADING_EXPENSES_BY_DATE",
  GET_EXPENSES_BY_DATE_SUCCESS: "GET_EXPENSES_BY_DATE_SUCCESS",
  GET_EXPENSES_BY_DATE_FAILURE: "GET_EXPENSES_BY_DATE_FAILURE"
};

const getExpensesByDate = (userId, date) => {
  return dispatch => {
    dispatch(request(actionTypes.LOADING_EXPENSES_BY_DATE));
    return expenseService.getExpensesByDate(userId, date).then(
      result => {
        dispatch(success(actionTypes.GET_EXPENSES_BY_DATE_SUCCESS, result));
      },
      err => {
        const { error } = err.data;
        dispatch(failure(actionTypes.GET_EXPENSES_BY_DATE_FAILURE, error));
      }
    );
  };
};

export const expenseActions = {
  getExpensesByDate
};
