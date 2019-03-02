import React, { Component, FormEvent } from "react";
import { FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import UserForm from "../components/UserForm.component";
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
      <div>
        <h1>Registration</h1>
        <UserForm
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          state={this.state}
          error={error}
        />
      </div>
    );
  }

  private onChange = async ({
    currentTarget: { value = "", name = "" },
  }: FormEvent<FormControl & HTMLInputElement>): Promise<void> => {
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

const mapStateToProps = (state: ApplicationState): Pick<Props, "error"> => {
  return {
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): Pick<Props, "createUser"> => {
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
