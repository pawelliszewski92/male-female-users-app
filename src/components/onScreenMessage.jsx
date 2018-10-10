import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContent from "./onScreenMessageVariants";

const OnScreenMessage = ({ classes, open, message, variant, onClose }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      open={open}
      autoHideDuration={8000}
      onClose={onClose}
    >
      <MySnackbarContent
        variant={variant}
        message={message}
        onClose={onClose}
      />
    </Snackbar>
  );
};

export default OnScreenMessage;
