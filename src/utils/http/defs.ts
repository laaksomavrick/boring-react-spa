export interface ApiError {
  status: number;
  msg: string;
  errors: ApiErrorDetails[];
}

export interface ApiErrorDetails {
  param: string;
  msg: string;
}
