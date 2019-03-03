import { Paper } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import React, { HTMLAttributes } from "react";

const styled = withStyles(theme => ({
  container: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing
      .unit * 3}px`,
  },
}));

interface Props extends HTMLAttributes<HTMLDivElement> {
  classes: any;
}

const UserScreen = ({ classes, children }: Props) => (
  <div className={classes.container}>
    <Paper className={classes.paper}>{children}</Paper>
  </div>
);

export default styled(UserScreen);
