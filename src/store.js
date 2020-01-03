import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import expensesReducer from "./components/expenses/expensesReducer";
import authReducer from "./components/auth/authReducer";

const persistConfig = {
  key: "root",
  storage
};

const rootReducer = combineReducers({
  expensesReducer,
  authReducer
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
