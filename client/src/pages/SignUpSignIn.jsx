import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import ButtonHeader from "../components/SignUpSignIn/ButtonHeader";
import Login from "../components/SignUpSignIn/Login";
import SignUp from "../components/SignUpSignIn/SignUp";
import SideHeroImage from "../components/SignUpSignIn/SideHeroImage";
import { AuthStateContext } from "../context/Auth/authStateContext";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    "& .MuiInput-underline:before": {
      borderBottom: "1.2px solid rgba(0, 0, 0, 0.2)",
    },
  },
  authForms: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "column",
    bgcolor: "background.paper",
    minHeight: "100vh",
    paddingTop: 23,
  },
}));

const SignUpSignIn = () => {
  const classes = useStyles();
  const [hasAccount, setHasAccount] = useState(true);
  const { user } = useContext(AuthStateContext);
  const history = useHistory();

  const changeAccountStatus = () => {
    setHasAccount(!hasAccount);
  };

  useEffect(() => {
    if (user) history.push("/dashboard");
  }, [user, history]);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <SideHeroImage />
      <Grid item xs={12} sm={8} md={7} elevation={6} component={Paper} square>
        <Box className={classes.authForms}>
          <ButtonHeader
            changeAccountStatus={changeAccountStatus}
            hasAccount={hasAccount}
          />
          {hasAccount ? <Login /> : <SignUp />}
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUpSignIn;
