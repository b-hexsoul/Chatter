import {
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import BadgeAvatar from "./BadgeAvatar.component";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function UserList() {
  const classes = useStyles();

  // temporary for testing
  let users = [
    { name: "santiago", img: "/images/santiago.png" },
    { name: "chiumbo", img: "/images/chiumbo.png" },
    { name: "hualing", img: "/images/hualing.png" },
    { name: "ashanti", img: "/images/ashanti.png" },
    { name: "julia", img: "/images/julia.png" },
    { name: "cheng", img: "/images/cheng.png" },
  ];

  return (
    <List className={classes.root}>
      {users.map((user, idx) => (
        <ListItem button disableRipple="true" key={idx}>
          <ListItemAvatar>
            <BadgeAvatar name={user.name} img={user.img} />
          </ListItemAvatar>
          <div style={{ "margin-left": 10 }}>
            <ListItemText primary={user.name} />
            <ListItemText secondary={"last message"} />
          </div>
          <div style={{ "margin-left": "auto" }}>
            <Chip
              label={1}
              color="primary"
              style={{
                backgroundColor: "#3f92ff",
                color: "#fff",
                height: 25,
                width: "100%",
              }}
            />
          </div>
        </ListItem>
      ))}
    </List>
  );
}
