import React from "react";
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

function useRegister() {
  const history = useHistory();

  const register = async (username, email, password) => {
    let data = {
      username,
      email,
      password,
    };

    const res = await fetch(`/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    console.log(res);
    localStorage.setItem("user", res.user);
    localStorage.setItem("token", res.token);
    history.push("/dashboard");
  };
  return register;
}

export default function Register() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const register = useRegister();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const history = useHistory();

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) history.push("/dashboard");
  }, []);

  return (
    <>
      <Box width="100%" maxWidth={450} p={3} alignSelf="center">
        <Grid container>
          <Grid item xs>
            <Typography className={classes.welcome} component="h1" variant="h5">
              Create an account
            </Typography>
          </Grid>
        </Grid>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string()
              .required("Username is required")
              .max(40, "Username is too long"),
            email: Yup.string()
              .required("Email is required")
              .email("Email is not valid"),
            password: Yup.string()
              .required("Password is required")
              .max(100, "Password is too long")
              .min(6, "Password too short"),
          })}
          onSubmit={(
            { username, email, password },
            { setStatus, setSubmitting }
          ) => {
            setStatus();
            register(username, email, password).then(
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
                id="username"
                label={
                  <Typography className={classes.label}>Username</Typography>
                }
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ classes: { input: classes.inputs } }}
                name="username"
                autoComplete="username"
                autoFocus
                helperText={touched.username ? errors.username : ""}
                error={touched.username && Boolean(errors.username)}
                value={values.username}
                onChange={handleChange}
              />
              <TextField
                id="email"
                label={
                  <Typography className={classes.label}>
                    E-mail address
                  </Typography>
                }
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ classes: { input: classes.inputs } }}
                name="email"
                autoComplete="email"
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
                  Create
                </Button>
              </Box>
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
        message="Email already exists"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
}
