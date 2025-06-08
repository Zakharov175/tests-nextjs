import { createTodoAction } from './create-todo.actions';
import { makeTestTodoMocks } from '@/core/__tests__/utils/make-test-todo.mocks';

vi.mock('next/cache', () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe('createTodoAction (unit)', () => {
  test('should call createTodoUseCase with valid values', async () => {
    const { createTodoUseCaseSpy } = makeTestTodoMocks();
    const expectedParamCall = 'UseCase should be called with this';
    await createTodoAction(expectedParamCall);
    expect(createTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(
      expectedParamCall,
    );
  });
  test('should call revalidatePath when useCase return success', async () => {
    const { revalidatePathMocked } = makeTestTodoMocks();
    const description = 'UseCase test';
    await createTodoAction(description);
    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
  });
  test('should return same value when success useCase', async () => {
    const { successResult } = makeTestTodoMocks();
    const description = 'UseCase Test';
    const result = await createTodoAction(description);
    expect(result).toStrictEqual(successResult);
  });
  test('should return same value when fail/error useCase', async () => {
    const { errorResult, createTodoUseCaseSpy } = makeTestTodoMocks();
    const description = 'UseCase Test';
    createTodoUseCaseSpy.mockResolvedValue(errorResult);
    const result = await createTodoAction(description);
    expect(result).toStrictEqual(errorResult);
  });
});
