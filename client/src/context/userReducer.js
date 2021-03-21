const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        loggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
