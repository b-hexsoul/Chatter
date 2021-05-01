import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  search: {
    display: "flex",
    backgroundColor: "#e9eef9",
    alignItems: "center",
    marginLeft: 0,
    width: "100%",
    height: 50,
    borderRadius: 5,
  },
  searchIcon: {
    position: "relative",
    padding: 10,
    color: "#bfc9db",
  },
}));

export default function SearchBar() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    </div>
  );
}
