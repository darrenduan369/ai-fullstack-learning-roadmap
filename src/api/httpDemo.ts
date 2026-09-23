import { ApiResponse } from "../types/api";
import { request } from "./httpClient";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoQuery {
  userId?: number;
  completed?: boolean;
}

export type CreateTodoInput = Omit<Todo, "id">;

export type UpdateTodoInput = Partial<Pick<Todo, "title" | "completed">>;

export type ReplaceTodoInput = Omit<Todo, "id">;

export function isTodo(value: unknown): value is Todo {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const todo = value as Record<string, unknown>;

  return (
    typeof todo.userId === "number" &&
    typeof todo.id === "number" &&
    typeof todo.title === "string" &&
    typeof todo.completed === "boolean"
  );
}

export function isTodoArray(value: unknown): value is Todo[] {
  return Array.isArray(value) && value.every(isTodo);
}

// GET方式
// export async function fetchTodo(): Promise<Todo> {
//   const response = await fetch("/todos/1");

//   //   const response = await fetch(
//   //     "invalid-page",
//   //   );

//   console.log("Status:", response.status);

//   console.log("OK:", response.ok);

//   if (!response.ok) {
//     throw new Error(`HTTP ${response.status}`);
//   }

//   const data: unknown = await response.json();

//   if (!isTodo(data)) {
//     throw new Error("Invalid Todo response");
//   }

//   return data;
// }

// GET方式优化版
export async function fetchTodo(): Promise<Todo> {
  return request<Todo>("/todos/1", isTodo);
}

// export async function fetchTodos(): Promise<Todo[]> {
//   const response = await fetch("/todos"s");

//   console.log("/todos" list status:", response.status);

//   if (!response.ok) {
//     throw new Error(`HTTP ${response.status}`);
//   }

//   const data: unknown = await response.json();

//   if (!isTodoArray(data)) {
//     throw new Error("Invalid Todo list response");
//   }

//   return data;
// }

export async function fetchTodos(): Promise<Todo[]> {
  return request<Todo[]>("/todos", isTodoArray);
}

export async function fetchTodosByQuery(query: TodoQuery): Promise<Todo[]> {
  const params = new URLSearchParams();

  if (query.userId !== undefined) {
    params.set("userId", String(query.userId));
  }

  if (query.completed !== undefined) {
    params.set("completed", String(query.completed));
  }

  const queryString = params.toString();

  const path = queryString ? `/todos?${queryString}` : "/todos";
  console.log("Request path:", path);

  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!isTodoArray(data)) {
    throw new Error("Invalid Todo list response");
  }

  return data;
}

// POST方式
// export async function createTodo(input: CreateTodoInput): Promise<Todo> {
//   const response = await fetch("/todos", {
//     method: "POST",

//     headers: {
//       "Content-Type": "application/json",
//     },

//     body: JSON.stringify(input),
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP ${response.status}`);
//   }

//   const data: unknown = await response.json();

//   if (!isTodo(data)) {
//     throw new Error("Invalid Todo response");
//   }

//   return data;
// }

// POST 优化版
export async function createTodo(input: CreateTodoInput): Promise<Todo> {
  return request<Todo>("/todos", isTodo, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
}

// PUT → 用一份完整数据替换原资源
// PATCH → 只修改部分字段
// PATCH方式
export async function updateTodo(
  id: number,
  input: UpdateTodoInput,
): Promise<Todo> {
  const response = await fetch(`/todos/${id}`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!isTodo(data)) {
    throw new Error("Invalid Todo response");
  }

  return data;
}

export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
}

// PUT
export async function replaceTodo(
  id: number,
  input: ReplaceTodoInput,
): Promise<Todo> {
  const response = await fetch(`/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!isTodo(data)) {
    throw new Error("Invalid Todo response");
  }

  return data;
}
