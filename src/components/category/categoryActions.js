import { request, success, failure } from "../../utils/redux";
import { categoryService } from "./categoryService";

export const actionTypes = {
  LOADING_CATEGORIES: "LOADING_CATEGORIES",
  GET_CATEGORIES_SUCCESS: "GET_CATEGORIES_SUCCESS",
  GET_CATEGORIES_FAILURE: "GET_CATEGORIES_FAILURE",

  ADDING_CATEGORY: "ADDING_CATEGORY",
  ADD_CATEGORY_SUCCESS: "ADD_CATEGORY_SUCCESS",
  ADD_CATEGORY_FAILURE: "ADD_CATEGORY_FAILURE"
};

const getCategories = userId => {
  return async dispatch => {
    dispatch(request(actionTypes.LOADING_CATEGORIES));
    try {
      const result = await categoryService.getCategories(userId);
      dispatch(success(actionTypes.GET_CATEGORIES_SUCCESS, result));
    } catch (err) {
      const { error } = err.data;
      dispatch(failure(actionTypes.GET_CATEGORIES_FAILURE, error));
    }
  };
};

const addCategory = category => {
  const { name, userId } = category;
  return async dispatch => {
    dispatch(request(actionTypes.ADDING_CATEGORY));
    try {
      const result = await categoryService.addCategory({ name, userId });
      console.log(result)
      dispatch(success(actionTypes.ADD_CATEGORY_SUCCESS, result.category));
    } catch (err) {
      const { error } = err.data;
      dispatch(failure(actionTypes.ADD_CATEGORY_FAILURE, error));
    }
  };
};

export const categoryActions = {
  getCategories,
  addCategory
};
