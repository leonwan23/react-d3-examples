import { apiRequest } from "../../utils/apiHelper";
import { httpConstants } from "../../constants/httpConstants";

export const userService = {
  getUsers,
  deleteUser
};

function getUsers() {
  const reqOptions = {
    url: `v1/users`,
    method: httpConstants.GET
  };
  return apiRequest(reqOptions);
}

function deleteUser(id) {
  const reqOptions = {
    url: `v1/user/${id}`,
    method: httpConstants.DELETE
  };
  return apiRequest(reqOptions);
}
