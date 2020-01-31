import { apiRequest } from "../../utils/apiHelper";
import { httpConstants } from "../../constants/httpConstants";

export const expensesService = {
  getExpenses,
  addExpense
};

function getExpenses(userId, year) {
  const reqOptions = {
    url: `v1/expenses/user/${userId}/year/${year}`,
    method: httpConstants.GET
  };

  return apiRequest(reqOptions);
}

function addExpense({ name, amount, userId, date }) {
  const reqOptions = {
    url: `v1/expenses`,
    method: httpConstants.POST,
    body: { name, amount, userId, date }
  };

  return apiRequest(reqOptions);
}
