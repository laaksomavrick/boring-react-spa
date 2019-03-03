import React, { ChangeEvent, Component, FormEvent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import UserForm from "../components/UserForm";
import UserScreen from "../components/UserScreen";
import { ApplicationState } from "../store";
import { authorizeUser } from "../store/user/actions";
import { UserInput } from "../store/user/types";
import { ApiError } from "../utils/http";

interface Props extends RouteComponentProps<{}> {
  authorizeUser: (user: UserInput) => Promise<void>;
  error: ApiError | undefined;
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
    const { error } = this.props;
    return (
      <UserScreen>
        <UserForm
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          state={this.state}
          header="Login"
          error={error}
        />
      </UserScreen>
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
    const { error } = this.props;
    if (error == null) {
      history.push("/");
    }
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login),
);
