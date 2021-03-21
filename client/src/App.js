import { useReducer } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme.js";
// import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import routes from "./config/routes";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import UserContext from "./context/userContext";
import userReducer from "./context/userReducer";
import "./App.css";

function App() {
  const [state, dispatch] = useReducer(userReducer, UserContext);

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <UserContext.Provider value={{ state, dispatch }}>
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
              />
            ))}
            <Route exact path="/*">
              <Redirect to="/welcome" />
            </Route>
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
