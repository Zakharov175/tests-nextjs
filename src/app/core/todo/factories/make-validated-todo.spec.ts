import {
  InvalidTodo,
  makeValidatedTodo,
  ValidTodo,
} from "./make-validated-todo";
import * as sanitizerStrMod from "@/utils/sanitize-str";
import * as makeNewTodoMod from "./make-new-todo";
import * as makeValidatedTodoMod from "../schemas/validate-todo-description";

describe("mekeValidatedTodo functiont (tests units)", () => {
  const makeMocks = (description = "description") => {
    const todo = {
      id: "any-id",
      description,
      createdAt: new Date().toISOString(),
    };

    const sanitizeStrSpy = vi
      .spyOn(sanitizerStrMod, "sanitizeStr")
      .mockReturnValue(description);

    const validateTodoDescriptionSpy = vi
      .spyOn(makeValidatedTodoMod, "validateTodoDescription")
      .mockReturnValue({
        errors: [],
        success: true,
      });

    const makeNewTodoSpy = vi
      .spyOn(makeNewTodoMod, "makeNewTodo")
      .mockReturnValue(todo);

    return {
      description,
      sanitizeStrSpy,
      validateTodoDescriptionSpy,
      makeNewTodoSpy,
      todo,
      errors: ["any", "error"],
    };
  };

  test("should call function sanitizerStr with correct value", () => {
    //that way the test is not a dont be unit test, since other functions are being called
    // const description = "abdc";
    // const sanitizeStrSpy = vi.spyOn(sanitizerStrMod, "sanitizeStr");
    //important to use mockReturnValue and when a promise use mockResolvedValue or mockedRejectValue
    const { description, sanitizeStrSpy } = makeMocks();
    makeValidatedTodo(description);
    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
    expect(sanitizeStrSpy).toHaveBeenCalledTimes(1);
    expect(sanitizeStrSpy).toHaveBeenCalledWith(description);
  });

  test("should call function validateTodoDescription with return of sanitizerStre", () => {
    const { description, sanitizeStrSpy, validateTodoDescriptionSpy } =
      makeMocks();
    const sanitizeStrReturn = "return sanitizeStr";
    sanitizeStrSpy.mockReturnValue(sanitizeStrReturn);
    const result = makeValidatedTodo(description) as ValidTodo;

    expect(validateTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(
      sanitizeStrReturn
    );

    expect(result.success).toBe(true);
    //some options for

    expect(result.data).toStrictEqual(
      expect.objectContaining({
        description: "description",
        id: "any-id",
      })
    );
    expect(result.data).toStrictEqual({
      id: "any-id",
      description: "description",
      createdAt: expect.any(String),
    });
    expect(result.data.createdAt).toMatch(
      /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.\d{3}Z$/
    );
  });

  test("should call makeNewTodo if validateTodoDescription return success", () => {
    const { description } = makeMocks();
    const result = makeValidatedTodo(description) as ValidTodo;
    expect(result.success).toBe(true);
  });

  test("should call return validatedDescription.error if value fails", () => {
    const { description, validateTodoDescriptionSpy, errors } = makeMocks();
    validateTodoDescriptionSpy.mockReturnValue({ errors, success: false });
    const result = makeValidatedTodo(description) as InvalidTodo;
    expect(result).toStrictEqual({ errors, success: false });
  });
});
