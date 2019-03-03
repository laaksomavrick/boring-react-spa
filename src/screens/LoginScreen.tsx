import { Paper } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import React, { ChangeEvent, Component, FormEvent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import UserForm from "../components/UserForm.component";
import { ApplicationState } from "../store";
import { authorizeUser } from "../store/user/actions";
import { UserInput } from "../store/user/types";
import { ApiError } from "../utils/http";

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

interface Props extends RouteComponentProps<{}> {
  authorizeUser: (user: UserInput) => Promise<void>;
  error: ApiError | undefined;
  classes: any;
}

interface State {
  email: string;
  password: string;
}

class Login extends Component<Props, State> {
  public state = { email: "", password: "" };

  public constructor(props: Props) {
    super(props);
  }

  public render() {
    const { classes, error } = this.props;
    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <UserForm
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            state={this.state}
            header="Login"
            error={error}
          />
        </Paper>
      </div>
    );
  }

  private onChange = async ({
    currentTarget: { value = "", name = "" },
  }: ChangeEvent<HTMLInputElement>): Promise<void> => {
    await this.setState({ ...this.state, [name]: value });
  };

  private onSubmit = async (event: FormEvent): Promise<void> => {
    const { authorizeUser, history } = this.props;
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    await authorizeUser(user);
    history.push("/");
  };
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    authorizeUser: async (user: UserInput): Promise<void> => {
      await dispatch(authorizeUser(user));
    },
  };
};

export default styled(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(Login),
  ),
);
