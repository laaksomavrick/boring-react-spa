import { Typography } from "@material-ui/core";
import React, { HTMLAttributes } from "react";
import { ApiError, ApiErrorDetails } from "../utils/http";

interface Props extends HTMLAttributes<HTMLDivElement> {
  error?: ApiError;
}

export const FormError = (props: Props) => {
  const { error, className } = props;
  if (error == null) {
    return null;
  }
  const { errors } = error;
  return (
    <>
      {errors.map((err: ApiErrorDetails, idx: number) => (
        <Typography key={idx} variant="subtitle1" color="error" className={className}>
          {err.msg}
        </Typography>
      ))}
    </>
  );
};
