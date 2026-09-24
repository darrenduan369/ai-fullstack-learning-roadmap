import type { RequestState, Todo } from "../types";
import { assertNever } from "../utils/assertNever";
import { fetchTodo } from "../api";

function printTodoState(state: RequestState<Todo>): void {
  switch (state.status) {
    case "idle":
      console.log("Ready");
      break;

    case "loading":
      console.log("Loading...");
      break;

    case "success":
      console.log("Todo:", state.data.title);
      break;

    case "error":
      console.log("Error:", state.message);
      break;

    case "empty":
      console.log("No data");
      break;

    default:
      assertNever(state);
  }
}

// printTodoState(todoState);

async function loadTodoState(): Promise<RequestState<Todo>> {
  try {
    const todo = await fetchTodo();

    return {
      status: "success",
      data: todo,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function runTodoStateDemo(): Promise<void> {
  let state: RequestState<Todo> = {
    status: "loading",
  };

  printTodoState(state);

  state = await loadTodoState();

  printTodoState(state);
}
