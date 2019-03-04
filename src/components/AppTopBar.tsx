import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import { Folder } from "../store/folders/types";

const styled = withStyles(theme => ({
  root: {
    width: "100%",
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
}));

interface Props {
  classes?: any;
  selectedFolder?: Folder;
}

class AppTopBar extends Component<Props, {}> {
  public constructor(props: Props) {
    super(props);
  }

  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState): any => {
  return {
    selectedFolder: state.folders.selected,
  };
};

// const mapDispatchToProps = (dispatch: Dispatch<any>): object => {
//   return {
//     startUp: async (user: User) => dispatch(startUp(user)),
//     getMe: async () => dispatch(getMe()),
//     setSelectedFolder: (folder: Folder) => dispatch(setSelectedFolder(folder)),
//   };
// };

export default connect(
  mapStateToProps,
  null,
)(styled(AppTopBar));
