import React, { Component, FormEvent } from "react";
import { Col, FormControl, Grid, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Dispatch } from "redux";
import styled from "styled-components";
import { ApplicationState } from "../../app/app.reducer";
import { UserForm } from "../components/userForm.component";
import { createUser } from "../redux/user.actions";

interface Props extends RouteComponentProps<{}> {
  createUser: (user: object) => void;
  error: any;
}

interface State {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const StyledRow = styled(Row)`
  display: flex;
  justify-content: center;
`;

class Register extends Component<Props, State> {
  public state = { email: "", password: "", passwordConfirmation: "" };

  public constructor(props: Props) {
    super(props);
  }

  public render() {
    const { error } = this.props;
    return (
      <Grid>
        <StyledRow>
          <Col xs={12} md={8} lg={6}>
            <h1>Registration</h1>
            <UserForm
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              state={this.state}
              error={error}
            />
          </Col>
        </StyledRow>
      </Grid>
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
    const { createUser } = this.props;
    event.preventDefault();
    // todo: handle password / password confirmation valid
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    await createUser(user);
  };
}

const mapStateToProps = (state: ApplicationState): any => {
  return {
    error: state.userState.error,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): object => {
  return {
    createUser: (user: object): void => {
      dispatch(createUser(user));
    },
  };
};

export const ConnectedRegister = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
