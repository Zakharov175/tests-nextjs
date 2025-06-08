import { deleteTodoAction } from './delete-todo.actions';
import { makeTestTodoMocks } from '@/core/__tests__/utils/make-test-todo.mocks';

vi.mock('next/cache', () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe('deleteTodoAction (unit)', () => {
  test('should call deleteTodoUseCase with valid values', async () => {
    const { deleteTodoUseCaseSpy } = makeTestTodoMocks();
    const fakeId = 'any-id';
    await deleteTodoAction(fakeId);
    expect(deleteTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(fakeId);
  });

  it('should call revalidatePath when UseCase return success', async () => {
    const { revalidatePathMocked } = makeTestTodoMocks();
    const fakeId = 'any-id';
    await deleteTodoAction(fakeId);
    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
  });

  test('should return same value whe success useCase', async () => {
    const { successResult } = makeTestTodoMocks();
    const fakeId = 'any-id';
    const result = await deleteTodoAction(fakeId);
    expect(result).toStrictEqual(successResult);
  });

  it('should return same value when fail/error useCase', async () => {
    const { errorResult, deleteTodoUseCaseSpy } = makeTestTodoMocks();
    const fakeId = 'any-id';
    deleteTodoUseCaseSpy.mockResolvedValue(errorResult);
    const result = await deleteTodoAction(fakeId);
    expect(result).toStrictEqual(errorResult);
  });
});
