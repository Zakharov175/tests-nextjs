import { Todo } from "../schemas/todo.contract";
import { validateTodoDescription } from "../schemas/validate-todo-description";
import { sanitizeStr } from "../../../utils/sanitize-str";
import { makeNewTodo } from "./make-new-todo";
export type InvalidTodo = {
  success: false;
  errors: string[];
};
export type ValidTodo = {
  success: true;
  data: Todo;
};

type MakeValidatedTodo = ValidTodo | InvalidTodo;

export const makeValidatedTodo = (description: string): MakeValidatedTodo => {
  const cleanDescription = sanitizeStr(description);
  const validatedDescription = validateTodoDescription(cleanDescription);
  if (validatedDescription.success) {
    return {
      success: true,
      data: makeNewTodo(cleanDescription),
    };
  }
  return {
    success: false,
    errors: validatedDescription.errors,
  };
};
