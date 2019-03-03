import React, { ChangeEvent, Component, FormEvent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import UserForm from "../components/UserForm";
import UserScreen from "../components/UserScreen";
import { ApplicationState } from "../store";
import { createUser } from "../store/user/actions";
import { UserInput } from "../store/user/types";

interface Props extends RouteComponentProps<{}> {
  createUser: (user: UserInput) => Promise<void>;
  error: any;
}

interface State {
  email: string;
  password: string;
  passwordConfirmation: string;
}

class Register extends Component<Props, State> {
  public state = { email: "", password: "", passwordConfirmation: "" };

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
          header="Register"
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
    const { createUser, history } = this.props;
    event.preventDefault();
    // todo: handle password / password confirmation valid
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    await createUser(user);
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
    createUser: async (user: UserInput): Promise<void> => {
      await dispatch(createUser(user));
    },
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Register),
);
