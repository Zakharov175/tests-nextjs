import { sanitizeStr } from '@/utils/sanitize-str';
import { todoRepository } from '../repositories/default.repository';

export const deleteTodoUseCase = async (id: string) => {
  const cleanId = sanitizeStr(id);
  if (!cleanId) {
    return {
      success: false,
      errors: ['Id invalid'],
    };
  }

  const deleteResult = await todoRepository.remove(id);

  return deleteResult;
};
