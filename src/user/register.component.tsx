import React, { Component } from "react";
import {
  Col,
  ControlLabel,
  FormControl,
  FormGroup,
  Grid,
  HelpBlock,
  Row,
} from "react-bootstrap";

export class Register extends Component {

  constructor(props: any, context: any) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: "",
    };
  }
  getValidationState() {
    const length = (this.state as any).value.length;
    if (length > 10) return "success";
    else if (length > 5) return "warning";
    else if (length > 0) return "error";
    return null;
  }

  handleChange(e: any) {
    this.setState({ value: e.target.value });
  }

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
                  value={(this.state as any).value}
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
