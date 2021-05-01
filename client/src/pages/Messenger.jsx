import {
  Container,
  CssBaseline,
  Grid,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@material-ui/core";
import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AuthStateContext } from "../context/Auth/authStateContext";
import UserList from "../components/Messenger/UserList.component";
import ChatBox from "../components/Messenger/ChatBox.component";
import SearchBar from "../components/Messenger/SearchBar.component";
import BadgeAvatars from "../components/Messenger/BadgeAvatar.component";
import MessengerMenu from "../components/Messenger/MessengerMenu.component";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#fff",
  },
  currentUserCard: {
    border: "none",
    boxShadow: "none",
    display: "flex",
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
    <Grid container component="main" spacing={1} className={classes.root}>
      <CssBaseline />

      <Grid item md={4}>
        <Container>
          <ListItem className={classes.currentUserCard}>
            <ListItemAvatar>
              <BadgeAvatars name={"thomas"} img={"/images/thomas.png"} />
            </ListItemAvatar>
            <Typography>thomas {/* current user username */}</Typography>
            <MessengerMenu />
          </ListItem>

          <div style={{ "margin-top": 12, "margin-bottom": 12 }}>
            <Typography variant="h5">Chats</Typography>
          </div>
          <SearchBar />
          <UserList />
        </Container>
      </Grid>

      <Grid item md={8}>
        <Container>
          <ChatBox />
        </Container>
      </Grid>
    </Grid>
  );
};

export default Messenger;
