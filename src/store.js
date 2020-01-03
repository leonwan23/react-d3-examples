import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";

import expensesReducer from "./components/expenses/expensesReducer";
import authReducer from "./components/auth/authReducer";

const rootReducer = combineReducers({
  expensesReducer,
  authReducer
});

export default function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
