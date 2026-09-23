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
