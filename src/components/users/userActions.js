import { request, success, failure } from "../../utils/redux";
import { userService } from "./userService";

export const actionTypes = {
  LOADING_USERS: "LOADING_USERS",
  GET_USERS_SUCCESS: "GET_USERS_SUCCESS",
  GET_USERS_FAILURE: "GET_USERS_FAILURE",

  DELETING_USER: "DELETING_USER",
  DELETE_USER_SUCCES: "DELETE_USER_SUCCES",
  DELETE_USER_FAILURE: "DELETE_USER_FAILURE"
};

const getUsers = () => {
  return async dispatch => {
    dispatch(request(actionTypes.LOADING_USERS));
    try {
      const result = await userService.getUsers();
      dispatch(success(actionTypes.GET_USERS_SUCCESS, result));
    } catch (err) {
      const { error } = err.data;
      dispatch(failure(actionTypes.GET_USERS_FAILURE, error));
    }
  };
};

const deleteUser = id => {
  return async dispatch => {
    dispatch(request(actionTypes.DELETING_USER));
    return userService.deleteUser(id).then(
      result => {
        dispatch(success(actionTypes.DELETE_USER_SUCCES, id));
      },
      err => {
        const { error } = err.data;
        dispatch(failure(actionTypes.DELETE_USER_FAILURE, error));
      }
    );
  };
};

export const userActions = {
  getUsers,
  deleteUser
};
