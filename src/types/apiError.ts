export type ApiErrorCode =
  | "NETWORK_ERROR"
  | "HTTP_ERROR"
  | "VALIDATION_ERROR"
  | "UNKNOWN_ERROR";

export interface ApiError {
  code: ApiErrorCode;
  message: string;
}
