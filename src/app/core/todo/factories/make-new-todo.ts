import { Todo } from "../schemas/todo.contract";

export const makeNewTodo = (description: string): Todo => {
  return {
    id: crypto.randomUUID(),
    description: description,
    createdAt: new Date().toISOString(),
  };
};






