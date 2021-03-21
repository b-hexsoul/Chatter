import { createContext } from "react";

const UserContext = createContext({
  loggedIn: false,
  user: null,
});

export default UserContext;
