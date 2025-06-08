import { makeValidatedTodo } from '../factories/make-validated-todo';
import { todoRepository } from '../repositories/default.repository';

export const createTodoUseCase = async (description: string) => {
  const response = makeValidatedTodo(description);
  if (!response.success) {
    return response;
  }
  const createResult = await todoRepository.create(response.todo);
  return createResult;
};
