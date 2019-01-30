import React, { Component, FormEvent } from "react";
import { FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import { ApplicationState } from "../../app/app.reducer";
import { UserContainer } from "../components/container.component";
import { UserForm } from "../components/userForm.component";
import { createUser } from "../redux/user.actions";
import { UserInput } from "../user.types";

interface Props extends RouteComponentProps<{}> {
  createUser: (user: object) => void;
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
      <UserContainer>
        <h1>Registration</h1>
        <UserForm
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          state={this.state}
          error={error}
        />
      </UserContainer>
    );
  }

  private onChange = async ({
    currentTarget: { value = "", name = "" },
  }: FormEvent<FormControl & HTMLInputElement>): Promise<void> => {
    // todo, spread here to get around typechecker err [name] not part of RegisterState
    // how to handle?
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
    history.push("/");
  };
}

const mapStateToProps = (state: ApplicationState): any => {
  return {
    error: state.userState.error,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): object => {
  return {
    createUser: async (user: UserInput): Promise<void> => {
      await dispatch(createUser(user));
    },
  };
};

export const ConnectedRegister = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Register),
);
