import { apiRequest } from "../../utils/apiHelper";
import { httpConstants } from "../../constants/httpConstants";

export const categoryService = {
  getCategories,
  addCategory
};

function getCategories(userId) {
  const reqOptions = {
    url: `v1/categories/user/${userId}`,
    method: httpConstants.GET
  };

  return apiRequest(reqOptions);
}

function addCategory({ name, userId }) {
  //generate random color
  const color =
    "#" +
    Math.random()
      .toString(16)
      .slice(-6);
  const reqOptions = {
    url: `v1/categories`,
    method: httpConstants.POST,
    body: { name, userId, color }
  };

  return apiRequest(reqOptions);
}
