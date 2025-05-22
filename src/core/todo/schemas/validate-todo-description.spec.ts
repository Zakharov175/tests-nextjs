import { validateTodoDescription } from "./validate-todo-description";

describe("validateTodoDescription function (tests unit)", () => {
  it("returns false when description is too short (less than 4 characters) ", () => {
    const description = "aab";
    const result = validateTodoDescription(description);
    expect(result.errors).toStrictEqual([
      "Description must have more than 3 characters",
    ]);
    expect(result.success).toBe(false);
  });
  it("returns true when descriptin is correct value (more than 3 characters)", () => {
    const description = "abcd";
    const result = validateTodoDescription(description);
    expect(result.errors).toStrictEqual([]);
    expect(result.success).toBe(true);
  });
});
