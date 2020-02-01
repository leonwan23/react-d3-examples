import { actionTypes } from "./expenseDashboardActions";

const initialState = {
  loadingExpenses: true,
  expenses: [],
  expensesErr: "",

  addingExpense: false,
  addExpenseErr: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_EXPENSES:
      return Object.assign({}, state, {
        loadingExpenses: true
      });
    case actionTypes.GET_EXPENSES_SUCCESS:
      return Object.assign({}, state, {
        loadingExpenses: false,
        expenses: action.payload.expenses,
        expensesErr: ""
      });
    case actionTypes.GET_EXPENSES_FAILURE:
      return Object.assign({}, state, {
        loadingExpenses: false,
        expenses: [],
        expensesErr: action.payload
      });
    case actionTypes.ADDING_EXPENSE:
      return Object.assign({}, state, {
        addingExpense: true
      });
    case actionTypes.ADD_EXPENSE_SUCCESS:
      return Object.assign({}, state, {
        addingExpense: false,
        expenses: [...state.expenses, action.payload],
        addExpenseErr: ""
      });
    case actionTypes.ADD_EXPENSE_FAILURE:
      return Object.assign({}, state, {
        addingExpense: false,
        addExpenseErr: action.payload
      });
    default:
      return state;
  }
};
