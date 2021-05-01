import { TextField } from "@material-ui/core";
import React from "react";

const ChatInput = () => {
  return (
    <form noValidate autoComplete="off">
      <TextField
        InputProps={{ disableUnderline: true }}
        id="chat-input"
        fullWidth
        label="Type something..."
        variant="filled"
      />
    </form>
  );
};

export default ChatInput;
