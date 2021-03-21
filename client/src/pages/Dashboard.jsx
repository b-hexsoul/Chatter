import { useEffect, useContext } from "react";
import UserContext from "../context/userContext";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    if (!state.user) history.push("/signup");
  }, []);

  return (
    <>
      {/* For testing purposes right now, ignore styling */}
      <p>Dashboard</p>
      <p>User: {JSON.stringify(state.user)}</p>
      <button
        onClick={() => {
          dispatch({
            type: "LOGOUT",
          });
          history.push("/login");
        }}
      >
        Logout
      </button>
    </>
  );
}
