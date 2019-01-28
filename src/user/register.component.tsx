import React, { Component, FormEvent } from "react";
import {
  Button,
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Grid,
  Row,
} from "react-bootstrap";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Dispatch } from "redux";
import { ApplicationState } from "../app/app.reducer";
import { createUser } from "./user.actions";

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

  // todo screen vs component

  public render() {
    const { error } = this.props;
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h1>Registration</h1>
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  type="email"
                  name="email"
                  value={this.state.email}
                  placeholder="Enter a valid email address"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="password"
                  autoComplete="new-password"
                  name="password"
                  value={this.state.password}
                  placeholder="Enter your password"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Confirm Password</ControlLabel>
                <FormControl
                  type="password"
                  autoComplete="new-password"
                  name="passwordConfirmation"
                  value={this.state.passwordConfirmation}
                  placeholder="Confirm your password"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button bsStyle="primary" type="submit">
                Submit
              </Button>
              {error ? <h1>{error}</h1> : null}
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }

  private handleChange = async ({
    currentTarget: { value = "", name = "" },
  }: FormEvent<FormControl & HTMLInputElement>): Promise<void> => {
    // todo, spread here to get around typechecker err [name] not part of RegisterState
    // how to handle?
    await this.setState({ ...this.state, [name]: value });
  };

  private handleSubmit = async (event: FormEvent): Promise<void> => {
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
