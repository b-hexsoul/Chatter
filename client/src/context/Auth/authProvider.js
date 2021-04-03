import { useEffect, useReducer } from "react";
import authReducer from "./authReducer";
import { AuthStateContext } from "./authStateContext";
import { AuthDispatchContext } from "./authDispatchContext";
import { LOGOUT, SET_USER } from "../types";

const AuthProvider = ({ children }) => {
  const initialState = {
    user: null,
    isLoading: false,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    fetch("/auth/authenticate").then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          setUser(data.user);
        }
      });
    });
  }, []);

  const setUser = (data) => {
    dispatch({ type: SET_USER, payload: data });
  };

  const logout = () => {
    fetch("/auth/logout", { method: "post" }).then((response) => {
      if (response.ok) {
        dispatch({ type: LOGOUT });
      }
    });
  };

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={(logout, setUser)}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export default AuthProvider;
