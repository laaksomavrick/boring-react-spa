import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import withStyles, { StyledComponentProps } from "@material-ui/core/styles/withStyles";
import React, { ChangeEvent, Component, FormEvent } from "react";
import { ApiError } from "../utils/http";
import { FormError } from "./FormError";

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
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  formError: {
    margin: "auto",
    marginTop: theme.spacing.unit * 2,
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
          <FormControl className={classes.formControl} required>
            <InputLabel>Email</InputLabel>
            <Input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Enter a valid email address"
              value={email}
              onChange={onChange}
            />
          </FormControl>
          <FormControl className={classes.formControl} required>
            <InputLabel>Password</InputLabel>
            <Input
              type="password"
              autoComplete="new-password"
              placeholder="Enter your password"
              name="password"
              value={password}
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
            disabled={this.buttonDisabled()}
          >
            Submit
          </Button>
          <FormError className={classes.formError} error={error} />
        </form>
      </div>
    );
  }

  private renderConfirmPassword() {
    const {
      onChange,
      classes,
      state: { passwordConfirmation },
    } = this.props;
    if (passwordConfirmation == null) {
      return null;
    }
    return (
      <FormControl className={classes.formControl} required>
        <InputLabel>Confirm Password</InputLabel>
        <Input
          type="password"
          autoComplete="new-password"
          name="passwordConfirmation"
          placeholder="Confirm your password"
          value={passwordConfirmation}
          onChange={onChange}
        />
      </FormControl>
    );
  }

  private buttonDisabled(): boolean {
    const { email, password, passwordConfirmation } = this.props.state;
    if (passwordConfirmation) {
      return (
        email.length === 0 || password.length === 0 || passwordConfirmation.length === 0
      );
    } else {
      return email.length === 0 || password.length === 0;
    }
  }
}

export default styled(UserForm);
