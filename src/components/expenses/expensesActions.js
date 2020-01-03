import fakeData from "../../fakeData.json";
import  {request, success, failure} from '../../utils/redux'

export const actionTypes = {
  LOADING_EXPENSES: "LOADING_EXPENSES",
  GET_EXPENSES_SUCCESS: "GET_EXPENSES_SUCCESS",
  GET_EXPENSES_FAILURE: "GET_EXPENSES_FAILURE",

  ADDING_EXPENSE: "ADDING_EXPENSE",
  ADD_EXPENSE_SUCCESS: "ADD_EXPENSE_SUCCESS",
  ADD_EXPENSE_FAILURE: "ADD_EXPENSE_FAILURE"
};

const getExpenses = year => {
  return async dispatch => {
    dispatch(request(actionTypes.LOADING_EXPENSES));
    try {
      const res = await new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve(fakeData.filter(d => new Date(d.date).getFullYear() === year));
        }, 1000);
      });
      return dispatch(success(actionTypes.GET_EXPENSES_SUCCESS, res));
    } catch (err) {
      console.log(err);
      dispatch(failure(actionTypes.GET_EXPENSES_FAILURE, err));
    }
  };
};

const addExpense = expense => {
  return async dispatch => {
    dispatch(request(actionTypes.ADDING_EXPENSE));
    try {
      //   const res = await new Promise(function(resolve, reject) {
      //     setTimeout(function() {
      //       resolve(expense);
      //     }, 1000);
      //   });
      return dispatch(success(actionTypes.ADD_EXPENSE_SUCCESS, expense));
    } catch (err) {
      console.log(err);
      dispatch(failure(actionTypes.ADD_EXPENSE_FAILURE, err));
    }
  };
};

export const expensesActions = {
  getExpenses,
  addExpense
};
