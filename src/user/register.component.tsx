import React, { Component, FormEvent } from "react";
import {
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Grid,
  HelpBlock,
  Row,
} from "react-bootstrap";
import { RouteComponentProps } from "react-router";

interface RegisterState {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export class Register extends Component<RouteComponentProps<{}>, RegisterState> {
  public state: RegisterState = { email: "", password: "", passwordConfirmation: "" };

  constructor(props: any) {
    super(props);
  }
  getValidationState() {

    const length = 10;
    if (length > 10) return "success";
    else if (length > 5) return "warning";
    else if (length > 0) return "error";
    return null;
  }

  handleChange = ({
    currentTarget: { value = "" },
  }: FormEvent<FormControl & HTMLInputElement>): void => {
    this.setState({ email: value });
  };

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <h1>Hello, world</h1>
            <form>
              <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationState()}
              >
                <ControlLabel>Working example with validation</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.email}
                  placeholder="Enter text"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>Validation is based on string length.</HelpBlock>
              </FormGroup>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}
