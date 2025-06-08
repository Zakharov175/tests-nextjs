import { revalidatePath } from 'next/cache';
import { createTodoUseCase } from '../usecases/create-todo.usecase';

export const createTodoAction = async (description: string) => {
  'use server';
  const createResult = await createTodoUseCase(description);
  if (createResult.success) {
    revalidatePath('/');
  }
  return createResult;
};
