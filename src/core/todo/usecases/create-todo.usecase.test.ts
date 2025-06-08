import { makeTestTodoRepository } from '@/core/__tests__/utils/make-test-todo.repository';
import { createTodoUseCase } from './create-todo.usecase';
import { InvalidTodo, ValidTodo } from '../schemas/todo.contract';

describe('createTodoUseCase (integration)', () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });
  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });
  test('should return error if validation fail', async () => {
    const result = (await createTodoUseCase('')) as InvalidTodo;
    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
  });
  test('should return Todo with validation success', async () => {
    const description = 'Now its work!';
    const result = (await createTodoUseCase(description)) as ValidTodo;
    expect(result.success).toBe(true);
    expect(result.todo).toStrictEqual({
      id: expect.any(String),
      description,
      createdAt: expect.any(String),
    });
  });
  test('should return error when repository find error in todo', async () => {
    const description = "It's worker first time";
    //create first todo with description
    (await createTodoUseCase(description)) as ValidTodo;
    //try create second todo with same description and should return error
    const result = (await createTodoUseCase(description)) as InvalidTodo;
    expect(result.success).toBe(false);
    expect(result.errors).toStrictEqual([
      'A todo with same description or Id already exists',
    ]);
  });
});
