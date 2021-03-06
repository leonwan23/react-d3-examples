import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./components/auth/authReducer";
import expenseDashboardReducer from "./components/expenses/dashboard/expenseDashboardReducer";
import expenseReducer from "./components/expenses/expense/expenseReducer";
import userReducer from "./components/users/userReducer";
import categoryReducer from "./components/category/categoryReducer";

const persistConfig = {
  key: "root",
  storage
};

const rootReducer = combineReducers({
  authReducer,
  expenseDashboardReducer,
  expenseReducer,
  userReducer,
  categoryReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(initialState = {}) {
  const store = createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(thunk))
  );
  const persistor = persistStore(store);
  return {
    store,
    persistor
  };
}
