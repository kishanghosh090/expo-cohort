import { TodoContext } from "@/context/TodoContext";
import { useContext } from "react";

export const useTodo = () => {
  return useContext(TodoContext);
};
