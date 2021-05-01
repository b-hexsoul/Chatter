import Messenger from "../pages/Messenger";
import SignUpSignIn from "../pages/SignUpSignIn.jsx";

const routes = [
  {
    path: "/welcome",
    component: SignUpSignIn,
  },
  {
    path: "/messenger",
    component: Messenger,
  },
];

export default routes;
