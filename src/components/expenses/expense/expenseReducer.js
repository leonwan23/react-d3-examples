import { actionTypes } from "./expenseActions";

const initialState = {
  loadingExpensesByDate: true,
  expensesByDate: [],
  expensesByDateErr: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_EXPENSES_BY_DATE:
      return Object.assign({}, state, {
        loadingExpensesByDate: true,
        expensesByDate: []
      });
    case actionTypes.GET_EXPENSES_BY_DATE_SUCCESS:
      return Object.assign({}, state, {
        loadingExpensesByDate: false,
        expensesByDate: action.payload.expenses,
        expensesByDateErr: ""
      });
    case actionTypes.GET_EXPENSES_BY_DATE_FAILURE:
      return Object.assign({}, state, {
        loadingExpensesByDate: false,
        expensesByDate: [],
        expensesByDateErr: action.payload
      });
    default:
      return state;
  }
};
