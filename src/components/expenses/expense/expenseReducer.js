import { actionTypes } from "./expenseActions";

const initialState = {
  loadingExpensesByDate: true,
  expensesByDate: [],
  expensesByDateErr: "",
  deletingExpense: false,
  deleteExpenseErr: "",
  addingExpenseByDate: false,
  addingExpenseByDateErr: ""
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

    case actionTypes.DELETING_EXPENSE:
      return Object.assign({}, state, {
        deletingExpense: action.param
      });
    case actionTypes.DELETE_EXPENSE_SUCCESS:
      return Object.assign({}, state, {
        deletingExpense: false,
        expensesByDate: state.expensesByDate.filter(
          expDate => expDate.id !== action.payload
        ),
        deleteExpenseErr: ""
      });
    case actionTypes.DELETE_EXPENSE_FAILURE:
      return Object.assign({}, state, {
        deletingExpense: false,
        deleteExpenseErr: action.payload
      });

    case actionTypes.ADDING_EXPENSE_BY_DATE:
      return Object.assign({}, state, {
        addingExpenseByDate: true
      });
    case actionTypes.ADD_EXPENSE_BY_DATE_SUCCESS:
      return Object.assign({}, state, {
        addingExpenseByDate: false,
        expensesByDate: [action.payload, ...state.expensesByDate],
        addingExpenseByDateErr: ""
      });
    case actionTypes.ADD_EXPENSE_BY_DATE_FAILURE:
      return Object.assign({}, state, {
        addingExpenseByDate: false,
        addingExpenseByDateErr: action.payload
      });
    default:
      return state;
  }
};
