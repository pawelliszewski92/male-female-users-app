import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import DeleteIcon from "@material-ui/icons/Delete";

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  primaryBackground: {
    backgroundColor: theme.palette.primary.dark
  },
  secondaryBackground: {
    backgroundColor: theme.palette.secondary.dark
  },
  labelColor: {
    color: theme.palette.common.white
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  bold: {
    fontWeight: "bold"
  },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let EnhancedTableToolbar = props => {
  const { numSelected, selected, classes, label, onDelete, color } = props;

  return (
    <Toolbar
      className={classNames(
        classes.root,
        { [classes.primaryBackground]: color === "primary" },
        { [classes.secondaryBackground]: color === "secondary" },
        {
          [classes.highlight]: numSelected > 0
        }
      )}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {label} - <span className={classes.bold}>{numSelected}</span>{" "}
            selected
          </Typography>
        ) : (
          <Typography
            variant="title"
            id="tableTitle"
            className={classes.labelColor}
          >
            {label}
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={() => onDelete(selected)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

export default withStyles(toolbarStyles)(EnhancedTableToolbar);
