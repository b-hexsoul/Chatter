import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthDispatchContext } from "../context/Auth/authDispatchContext";
import { AuthStateContext } from "../context/Auth/authStateContext";

export default function Dashboard() {
  const history = useHistory();
  const { user } = useContext(AuthStateContext);
  const logout = useContext(AuthDispatchContext);

  useEffect(() => {
    if (!user) history.push("/welcome");
  }, [user, history]);

  return (
    <>
      {/* For testing purposes right now, ignore styling */}
      <p>Dashboard</p>
      <p>User: {JSON.stringify(user)}</p>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
}
