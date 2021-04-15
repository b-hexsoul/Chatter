import {
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
    maxWidth: "36ch",
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
        <ListItem key={idx}>
          <ListItemAvatar>
            <BadgeAvatar name={user.name} img={user.img} />
          </ListItemAvatar>
          <ListItemText primary={user.name} />
        </ListItem>
      ))}
    </List>
  );
}
