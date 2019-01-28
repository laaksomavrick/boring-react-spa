import React, { FormEvent, SFC } from "react";
import { Button, ControlLabel, FormControl, FormGroup } from "react-bootstrap";

// todo how to test this?
// validate renderConfirmPassword
// validate onSubmit on submit
// ???

interface Props {
  onChange: (event: FormEvent<FormControl & HTMLInputElement>) => Promise<void>;
  onSubmit: (event: FormEvent) => Promise<void>;
  state: {
    email: string;
    password: string;
    passwordConfirmation?: string | null;
  };
  error?: any;
}

// todo: extract FormGroup dupes into form input component /form
// todo make this pretty :)
export const UserForm: SFC<Props> = (props: Props): any => {
  const {
    onChange,
    onSubmit,
    error,
    state: { email, password },
  } = props;
  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <ControlLabel>Email</ControlLabel>
        <FormControl
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          placeholder="Enter a valid email address"
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Password</ControlLabel>
        <FormControl
          type="password"
          autoComplete="new-password"
          name="password"
          value={password}
          placeholder="Enter your password"
          onChange={onChange}
        />
      </FormGroup>
      {renderConfirmPassword(props)}
      <Button bsStyle="primary" type="submit">
        Submit
      </Button>
      {error ? <h1>{error}</h1> : null}
    </form>
  );
};

function renderConfirmPassword({
  onChange,
  state: { passwordConfirmation = null },
}: Props) {
  if (passwordConfirmation === null) {
    return null;
  }
  return (
    <FormGroup>
      <ControlLabel>Confirm Password</ControlLabel>
      <FormControl
        type="password"
        autoComplete="new-password"
        name="passwordConfirmation"
        value={passwordConfirmation}
        placeholder="Confirm your password"
        onChange={onChange}
      />
    </FormGroup>
  );
}
