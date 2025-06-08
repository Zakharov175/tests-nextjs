import { makeTestTodoRepository } from '@/core/__tests__/utils/make-test-todo.repository';
import { deleteTodoUseCase } from './delete-todo.usecase';

describe('deleteTOdoUseCase (integration)', () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  test('should return error when id is invalid', async () => {
    const invalidIdRemove = await deleteTodoUseCase('');
    expect(invalidIdRemove).toStrictEqual({
      success: false,
      errors: ['Id invalid'],
    });
  });
  test('should return success when id is valid and todo exist', async () => {
    const { insertTodoDb, todos } = await makeTestTodoRepository();
    await insertTodoDb().values(todos);
    const result = await deleteTodoUseCase(todos[0].id);
    expect(result).toStrictEqual({
      success: true,
      todo: todos[0],
    });
  });
  test('should return error when id not exist when todo not exist', async () => {
    const sut = await deleteTodoUseCase('id-not-exist');
    expect(sut).toStrictEqual({
      success: false,
      errors: ['Todo not exist'],
    });
  });
});
