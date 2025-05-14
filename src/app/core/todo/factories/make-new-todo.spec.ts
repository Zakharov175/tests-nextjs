import { makeNewTodo } from "./make-new-todo";

describe("makeNewTodo function (tests unit)", () => {
  it("create new valid todo", () => {
    const expectedTodo = {
      id: expect.any(String),
      description: "my new todo",
      createdAt: expect.any(String),
    };
    const newTodo = makeNewTodo("my new todo");
    expect(newTodo.description).toBe(expectedTodo.description);
    expect(newTodo).toStrictEqual(expectedTodo);
  });
});
