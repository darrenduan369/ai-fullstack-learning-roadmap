import type { ApiError } from "../types";

import {
  HttpError,
  ProductNotFoundError,
  ResponseValidationError,
} from "../errors";

export function toApiError(error: unknown): ApiError {
  if (error instanceof ProductNotFoundError) {
    return {
      code: "NOT_FOUND",
      message: error.message,
    };
  }
  if (error instanceof HttpError) {
    return {
      code: "HTTP_ERROR",
      message: error.message,
    };
  }

  if (error instanceof ResponseValidationError) {
    return {
      code: "VALIDATION_ERROR",
      message: error.message,
    };
  }

  if (error instanceof TypeError) {
    return {
      code: "NETWORK_ERROR",
      message: error.message,
    };
  }

  return {
    code: "UNKNOWN_ERROR",
    message: error instanceof Error ? error.message : "Unknown error",
  };
}
