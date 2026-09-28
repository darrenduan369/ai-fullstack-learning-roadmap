import { fetchTodo } from "../api";

import type { RequestState, Todo } from "../types";

import type { Result } from "../types/result";

import type { ApiError } from "../types/apiError";
import { HttpError, ResponseValidationError } from "../errors";
import { request } from "../api/httpClient";
import { isTodo, isTodoArray } from "../validators";
import { toApiError } from "../utils/toApiError";

async function safeFetchTodo(): Promise<Result<Todo, ApiError>> {
  try {
    const todo = await fetchTodo();

    return {
      ok: true,
      data: todo,
    };
  } catch (error) {
    return {
      ok: false,
      error: toApiError(error),
    };
  }
}

export async function runResultDemo(): Promise<void> {
  const result = await safeFetchTodo();

  if (result.ok) {
    console.log("Todo:", result.data.title);
  } else {
    console.log(`${result.error.code}: ${result.error.message}`);
  }
}

// Test function to demonstrate error handling
async function testHttpError(): Promise<void> {
  try {
    await request<Todo>("/invalid-page", isTodo);
  } catch (error) {
    console.log(error);
  }
}

async function safeFetchInvalidTodo(): Promise<Result<Todo, ApiError>> {
  try {
    const todo = await request<Todo>("/invalid-page", isTodo);

    return {
      ok: true,
      data: todo,
    };
  } catch (error) {
    return {
      ok: false,
      error: toApiError(error),
    };
  }
}

export async function runHttpErrorDemo(): Promise<void> {
  const result = await safeFetchInvalidTodo();

  console.log(result);
}

// Test function to demonstrate validation error handling
async function testValidationError(): Promise<Result<Todo[], ApiError>> {
  try {
    const todos = await request<Todo[]>("/todos/1", isTodoArray);

    return {
      ok: true,
      data: todos,
    };
  } catch (error) {
    if (error instanceof ResponseValidationError) {
      return {
        ok: false,
        error: {
          code: "VALIDATION_ERROR",
          message: error.message,
        },
      };
    }

    return {
      ok: false,
      error: {
        code: "UNKNOWN_ERROR",
        message: error instanceof Error ? error.message : "Unknown error",
      },
    };
  }
}

export async function runValidationErrorDemo(): Promise<void> {
  const result = await testValidationError();

  console.log(result);
}

function resultToRequestState<T>(result: Result<T, ApiError>): RequestState<T> {
  if (result.ok) {
    return {
      status: "success",
      data: result.data,
    };
  }

  return {
    status: "error",
    message: result.error.message,
  };
}

// const result = await safeFetchTodo();

// const state = resultToRequestState(result);
