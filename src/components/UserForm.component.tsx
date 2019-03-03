import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import withStyles, { StyledComponentProps } from "@material-ui/core/styles/withStyles";
import React, { ChangeEvent, Component, FormEvent } from "react";
import { ApiError } from "../utils/http";
import { FormError } from "./FormError.component";

// todo how to test this?
// validate renderConfirmPassword
// validate onSubmit on submit
// ???

const styled = withStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%", // Fix IE 11 issue.
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
}));

interface Props extends StyledComponentProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  onSubmit: (event: FormEvent) => Promise<void>;
  state: {
    email: string;
    password: string;
    passwordConfirmation?: string;
  };
  header: string;
  error?: ApiError;
}

// todo: extract FormGroup dupes into form input component /form
// todo make this pretty :)
class UserForm extends Component<Props, {}> {
  public constructor(props: Props) {
    super(props);
  }

  public render() {
    const {
      onChange,
      onSubmit,
      error,
      header,
      classes,
      state: { email, password },
    } = this.props;
    return (
      <div className={classes.container}>
        <Typography component="h1" variant="h5">
          {header}
        </Typography>
        <form onSubmit={onSubmit} className={classes.form}>
          <FormControl>
            <InputLabel>Email</InputLabel>
            <Input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              placeholder="Enter a valid email address"
              onChange={onChange}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Password</InputLabel>
            <Input
              type="password"
              autoComplete="new-password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </FormControl>
          {this.renderConfirmPassword()}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          <FormError error={error} />
        </form>
      </div>
    );
  }

  private renderConfirmPassword() {
    const {
      onChange,
      state: { passwordConfirmation },
    } = this.props;
    if (passwordConfirmation == null) {
      return null;
    }
    return (
      <FormControl>
        <InputLabel>Confirm Password</InputLabel>
        <Input
          type="password"
          autoComplete="new-password"
          name="passwordConfirmation"
          value={passwordConfirmation}
          placeholder="Confirm your password"
          onChange={onChange}
        />
      </FormControl>
    );
  }
}

export default styled(UserForm);
