import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";

import expensesReducer from "./components/expenses/expensesReducer";

const rootReducer = combineReducers({
  expensesReducer
});

export default function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
