import { apiRequest } from "../../../utils/apiHelper";
import { httpConstants } from "../../../constants/httpConstants";

export const expenseService = {
  getExpensesByDate,
  deleteExpense
};

function getExpensesByDate(userId, date) {
  const reqOptions = {
    url: `v1/expenses/date`,
    method: httpConstants.POST,
    body: { userId, date }
  };
  return apiRequest(reqOptions);
}

function deleteExpense(id) {
  const reqOptions = {
    url: `v1/expense/${id}`,
    method: httpConstants.DELETE
  };
  return apiRequest(reqOptions);
}
