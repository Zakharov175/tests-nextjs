import { createTodoAction } from './create-todo.actions';
import { deleteTodoAction } from './delete-todo.actions';

export type CreateTodoAction = typeof createTodoAction;
export type DeleteTodoAction = typeof deleteTodoAction;
