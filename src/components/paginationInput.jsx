import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: 0,
    marginLeft: "auto",
    marginRight: theme.spacing.unit * 3,
    width: theme.spacing.unit * 14,
    fontSize: theme.typography.pxToRem(12)
  },
  input: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(13),
    paddingLeft: theme.spacing.unit * 4.5
  }
});

class CustomPaginationInput extends Component {
  render() {
    const { onChange, value, label, classes } = this.props;
    const stringValue = value.toString();
    return (
      <div className={classes.container}>
        <TextField
          id="outlined-number"
          label={label}
          value={stringValue}
          onChange={onChange}
          type="number"
          className={classes.textField}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          InputProps={{
            className: classes.input,
            inputProps: { min: 0 }
          }}
        />
      </div>
    );
  }
}

CustomPaginationInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomPaginationInput);
