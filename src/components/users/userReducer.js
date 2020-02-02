import { actionTypes } from "./userActions";

const initialState = {
  loadingUsers: true,
  userList: [],
  getUsersErr: "",
  deletingUser: false,
  deleteUserErr: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_USERS:
      return Object.assign({}, state, {
        loadingUsers: true,
        userList: []
      });
    case actionTypes.GET_USERS_SUCCESS:
      return Object.assign({}, state, {
        loadingUsers: false,
        userList: action.payload.users,
        getUsersErr: ""
      });
    case actionTypes.GET_USERS_FAILURE:
      return Object.assign({}, state, {
        loadingUsers: false,
        userList: [],
        getUsersErr: action.payload
      });

    case actionTypes.DELETING_USER:
      return Object.assign({}, state, {
        deletingUser: true
      });
    case actionTypes.DELETE_USER_SUCCES:
      return Object.assign({}, state, {
        deletingUser: false,
        userList: state.userList.filter(
          expDate => expDate.id !== action.payload
        ),
        getUsersErr: ""
      });
    case actionTypes.DELETE_USER_FAILURE:
      return Object.assign({}, state, {
        deletingUser: false,
        deleteUserErr: action.payload
      });
    default:
      return state;
  }
};
