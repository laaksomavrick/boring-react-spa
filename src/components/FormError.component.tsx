import React, { SFC } from "react";
import { Alert } from "react-bootstrap";
import { ApiError, ApiErrorDetails } from "../utils/http";

interface Props {
  error?: ApiError;
}

export const FormError: SFC<Props> = (props: Props): any => {
  const { error } = props;
  if (error == null) {
    return null;
  }
  const { errors } = error;
  return (
    <>
      {errors.map((err: ApiErrorDetails, idx: number) => (
        <Alert key={idx} bsStyle="danger">
          {err.msg}
        </Alert>
      ))}
    </>
  );
};