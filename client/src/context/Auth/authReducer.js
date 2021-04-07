import { SET_USER, LOGOUT } from "../types";

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        isLoading: false,
        user: null,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
