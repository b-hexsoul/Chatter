import { AppBar, Container, CssBaseline, Grid, Menu } from "@material-ui/core";
import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AuthStateContext } from "../context/Auth/authStateContext";
import UserList from "../components/Messenger/UserList.component";
import ChatBox from "../components/Messenger/ChatBox.component";
import SearchBar from "../components/Messenger/SearchBar.component";
import BadgeAvatars from "../components/Messenger/BadgeAvatar.component";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    "& .MuiInput-underline:before": {
      borderBottom: "1.2px solid rgba(0, 0, 0, 0.2)",
    },
  },
  currentUserCard: {
    border: "none",
    boxShadow: "none",
  },
}));

const Messenger = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useContext(AuthStateContext);

  useEffect(() => {
    if (!user) history.push("/welcome");
  }, [user, history]);

  return (
    <Grid container component="main" spacing={2} className={classes.root}>
      <CssBaseline />

      <Grid item md={4}>
        <Container>
          <AppBar position="relative" className={classes.currentUserCard}>
            <BadgeAvatars name={"thomas"} img={"/images/thomas.png"} />
            {"thomas"} {/* username */}
          </AppBar>

          <Menu>{/* put logout here */}</Menu>
          <SearchBar />
          <UserList />
        </Container>
      </Grid>

      <Grid item md={8}>
        <ChatBox />
      </Grid>
    </Grid>
  );
};

export default Messenger;
