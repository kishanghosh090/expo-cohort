import { createContext } from "react";

export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "todo message",
      isCompleted: false,
    },
  ],
  createTodo: (todo: any) => {},
  editTodo: (id: any, todo: any) => {},
  deleteTodo: (id: any) => {},
  toggleComplete: (id: any) => {},
});

export const TodoProvider = TodoContext.Provider;
