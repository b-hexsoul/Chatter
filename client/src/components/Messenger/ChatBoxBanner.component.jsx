import {
  IconButton,
  ListItem,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import React from "react";

const ChatBoxBanner = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ListItem>
      <Typography variant="h5">
        santiago {/* username of clicked card */}
      </Typography>
      <div style={{ "margin-left": "auto" }}>
        <IconButton
          disableRipple="true"
          aria-label="more"
          aria-controls="menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreHoriz />
        </IconButton>
        <Menu
          id="messenger-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem disableRipple="true">Something</MenuItem>
        </Menu>
      </div>
    </ListItem>
  );
};

export default ChatBoxBanner;
