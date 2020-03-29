import { actionTypes } from "./categoryActions";

const initialState = {
  loadingCategories: true,
  categories: [],
  categoriesErr: "",

  addingCategory: false,
  addCategoryErr: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_CATEGORIES:
      return Object.assign({}, state, {
        loadingCategories: true
      });
    case actionTypes.GET_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        loadingCategories: false,
        categories: action.payload.categories,
        categoriesErr: ""
      });
    case actionTypes.GET_CATEGORIES_FAILURE:
      return Object.assign({}, state, {
        loadingCategories: false,
        categories: [],
        categoriesErr: action.payload
      });
    case actionTypes.ADDING_CATEGORY:
      return Object.assign({}, state, {
        addingCategory: true
      });
    case actionTypes.ADD_CATEGORY_SUCCESS:
      return Object.assign({}, state, {
        addingCategory: false,
        categories: [...state.categories, action.payload],
        addCategoryErr: ""
      });
    case actionTypes.ADD_CATEGORY_FAILURE:
      return Object.assign({}, state, {
        addingCategory: false,
        addCategoryErr: action.payload
      });
    default:
      return state;
  }
};
