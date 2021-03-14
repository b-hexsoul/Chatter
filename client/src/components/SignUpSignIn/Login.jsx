import { useContext, useState, useEffect } from "react";
import UserContext from "../../context/userContext";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Formik } from "formik";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  welcome: {
    fontSize: 26,
    paddingBottom: 20,
    color: "#000000",
    fontWeight: 500,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  label: { fontSize: 19, color: "rgb(0,0,0,0.4)", paddingLeft: "5px" },
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: 3,
    marginTop: 49,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#3a8dff",
  },
  inputs: {
    marginTop: ".8rem",
    height: "2rem",
    padding: "5px",
  },
}));

// Login middleware placeholder
function useLogin() {
  const history = useHistory();

  const login = async (email, password) => {
    let data = {
      email,
      password,
    };

    const res = await fetch(`/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    localStorage.setItem("user", res.user);
    localStorage.setItem("token", res.token);
    history.push("/dashboard");
  };
  return login;
}

export default function Login({ setUserContext }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const user = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) history.push("/dashboard");
  }, []);

  const login = useLogin();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <>
      <Box width="100%" maxWidth={450} p={3} alignSelf="center">
        <Grid container>
          <Grid item xs>
            <p className={classes.welcome} component="h1" variant="h5">
              Welcome back!
            </p>
          </Grid>
        </Grid>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .required("Email is required")
              .email("Email is not valid"),
            password: Yup.string()
              .required("Password is required")
              .max(100, "Password is too long")
              .min(6, "Password too short"),
          })}
          onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
            setStatus();
            login(email, password).then(
              () => {
                // useHistory push to chat
                console.log(email, password);
                return;
              },
              (error) => {
                setSubmitting(false);
                setStatus(error);
              }
            );
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <TextField
                id="email"
                label={<p className={classes.label}>E-mail address</p>}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ classes: { input: classes.inputs } }}
                name="email"
                autoComplete="email"
                autoFocus
                helperText={touched.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
                value={values.email}
                onChange={handleChange}
              />
              <TextField
                id="password"
                label={
                  <Typography className={classes.label}>Password</Typography>
                }
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  classes: { input: classes.inputs },
                  endAdornment: (
                    <Typography className={classes.forgot}>Forgot?</Typography>
                  ),
                }}
                type="password"
                autoComplete="current-password"
                helperText={touched.password ? errors.password : ""}
                error={touched.password && Boolean(errors.password)}
                value={values.password}
                onChange={handleChange}
              />

              <Box textAlign="center">
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Login
                </Button>
              </Box>

              <div style={{ height: 95 }} />
            </form>
          )}
        </Formik>
      </Box>
      <Box p={1} alignSelf="center" />

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Login failed"
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  );
}
