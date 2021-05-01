import React, { useState } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { IconButton, Menu, MenuItem } from "@material-ui/core";

const MessengerMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ "margin-left": "auto" }}>
      <IconButton
        disableRipple="true"
        aria-label="more"
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="messenger-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disableRipple="true">Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default MessengerMenu;
