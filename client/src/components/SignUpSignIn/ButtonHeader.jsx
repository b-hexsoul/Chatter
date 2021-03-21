import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  accBtn: {
    width: 170,
    height: 54,
    borderRadius: 5,
    filter: "drop-shadow(0px 2px 6px rgba(74,106,149,0.2))",
    backgroundColor: "#ffffff",
    color: "#3a8dff",
    boxShadow: "none",
    marginRight: 35,
  },
  noAccBtn: {
    fontSize: 14,
    color: "#b0b0b0",
    fontWeight: 400,
    textAlign: "center",
    marginRight: 21,
    whiteSpace: "nowrap",
  },
  buttonBox: {
    textDecoration: "none",
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
  },
}));

const ButtonHeader = ({ hasAccount, changeAccountStatus }) => {
  const classes = useStyles();

  return (
    <Box p={1} alignSelf="flex-end" alignItems="center">
      <Box className={classes.buttonBox}>
        <Typography className={classes.noAccBtn}>
          {hasAccount ? "Don't have an account?" : "Already have an account?"}
        </Typography>
        <Button
          color="background"
          className={classes.accBtn}
          variant="contained"
          onClick={() => {
            changeAccountStatus();
          }}
        >
          {hasAccount ? "Create Account" : "Login"}
        </Button>
      </Box>
    </Box>
  );
};

export default ButtonHeader;
