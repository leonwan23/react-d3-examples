import { apiRequest } from "../../utils/apiHelper";
import { httpConstants } from "../../constants/httpConstants";

export const authService = {
  login,
  signup
};

function login(username, password) {
  const reqOptions = {
    url: "v1/users/login",
    method: httpConstants.POST,
    body: { username, password }
  };

  return apiRequest(reqOptions);
}

function signup(username, password) {
  const reqOptions = {
    url: "v1/users",
    method: httpConstants.POST,
    body: { username, password }
  };

  return apiRequest(reqOptions);
}
