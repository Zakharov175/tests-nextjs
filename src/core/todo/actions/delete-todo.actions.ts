import { deleteTodoUseCase } from '../usecases/delete-todo.usecase';
import { revalidatePath } from 'next/cache';

export const deleteTodoAction = async (id: string) => {
  const result = await deleteTodoUseCase(id);
  if (result.success) {
    revalidatePath('/');
  }
  return result;
};
