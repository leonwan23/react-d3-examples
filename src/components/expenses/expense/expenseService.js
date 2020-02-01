import { apiRequest } from "../../../utils/apiHelper";
import { httpConstants } from "../../../constants/httpConstants";

export const expenseService = {
  getExpensesByDate
};

function getExpensesByDate(userId, date) {
  const reqOptions = {
    url: `v1/expenses/date`,
    method: httpConstants.POST,
    body: { userId, date }
  };

  return apiRequest(reqOptions);
}
