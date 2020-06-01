import { request, success, failure } from "../../utils/redux";
import { categoryService } from "./categoryService";

export const actionTypes = {
  LOADING_CATEGORIES: "LOADING_CATEGORIES",
  GET_CATEGORIES_SUCCESS: "GET_CATEGORIES_SUCCESS",
  GET_CATEGORIES_FAILURE: "GET_CATEGORIES_FAILURE",

  ADDING_CATEGORY: "ADDING_CATEGORY",
  ADD_CATEGORY_SUCCESS: "ADD_CATEGORY_SUCCESS",
  ADD_CATEGORY_FAILURE: "ADD_CATEGORY_FAILURE",

  DELETING_CATEGORY: "DELETING_CATEGORY",
  DELETE_CATEGORY: "DELETE_CATEGORY",
  DELETE_CATEGORY_ERROR: "DELETE_CATEGORY_ERROR"
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
      console.log(result);
      dispatch(success(actionTypes.ADD_CATEGORY_SUCCESS, result.category));
    } catch (err) {
      const { error } = err.data;
      dispatch(failure(actionTypes.ADD_CATEGORY_FAILURE, error));
    }
  };
};

const deleteCategory = id => {
  return async dispatch => {
    dispatch(request(actionTypes.DELETING_CATEGORY));
    try {
      await categoryService.deleteCategory(id);
      dispatch(success(actionTypes.DELETE_CATEGORY, id));
    } catch (err) {
      const { error } = err.data;
      dispatch(failure(actionTypes.DELETE_CATEGORY_ERROR, error));
    }
  };
};

export const categoryActions = {
  getCategories,
  addCategory,
  deleteCategory
};
