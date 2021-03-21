import Dashboard from "../pages/Dashboard";
import SignUpSignIn from "../pages/SignUpSignIn.jsx";

const routes = [
  {
    path: "/welcome",
    component: SignUpSignIn,
  },
  {
    path: "/dashboard",
    component: Dashboard,
  },
];

export default routes;
