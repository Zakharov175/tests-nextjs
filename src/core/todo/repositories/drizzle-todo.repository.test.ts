import {
  insertTestTodos,
  makeTestTodoRepository,
} from "@/core/__tests__/utils/make-test-todo.repository";
import { todo } from "node:test";

describe("DrizzleTodoRepository (integrations tests)", () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  describe("findAll", () => {
    test("should return an array empty when the table has no value", async () => {
      const { repository } = await makeTestTodoRepository();
      //console.log(drizzleDatabase.db.$client.name);
      const result = await repository.findAll();
      expect(result).toStrictEqual([]);
      expect(result).toHaveLength(0);
    });
    test("should return all todos in descending order", async () => {
      const { repository } = await makeTestTodoRepository();
      await insertTestTodos();
      const result = await repository.findAll();
      expect(result[0].createdAt).toBe("date 4");
      expect(result[1].createdAt).toBe("date 3");
      expect(result[2].createdAt).toBe("date 2");
      expect(result[3].createdAt).toBe("date 1");
      expect(result[4].createdAt).toBe("date 0");
    });
  });

  describe("create", () => {
    test("should create a todo with all data be is valid", async () => {
      const { repository, todos } = await makeTestTodoRepository();
      const newTodo = await repository.create(todos[0]);
      expect(newTodo).toStrictEqual({
        success: true,
        todo: todos[0],
      });
    });
    test("should fail when there is a repeated description in the table", async () => {
      const { repository, todos } = await makeTestTodoRepository();
      await repository.create(todos[0]);
      const anotherTodo = {
        id: "any-id",
        description: todos[0].description,
        createdAt: "any-date",
      };
      const resultWithRepeatedTodo = await repository.create(anotherTodo);
      expect(resultWithRepeatedTodo).toStrictEqual({
        success: false,
        errors: ["A todo with same description or Id already exists"],
      });
    });
    test("should be fail when there is an exist id in the table", async () => {
      const { repository, todos } = await makeTestTodoRepository();
      await repository.create(todos[0]);
      const anotherTodo = {
        id: todos[0].id,
        description: "any-description",
        createdAt: "any-date",
      };
      const result = await repository.create(anotherTodo);
      expect(result).toStrictEqual({
        success: false,
        errors: ["A todo with same description or Id already exists"],
      });
    });
    test("should be fail when there is an exist id and description repeated in the table", async () => {
      const { repository, todos } = await makeTestTodoRepository();
      await repository.create(todos[0]);
      const anotherTodo = {
        id: todos[0].id,
        description: todos[0].description,
        createdAt: "any-date",
      };
      const result = await repository.create(anotherTodo);
      expect(result).toStrictEqual({
        success: false,
        errors: ["A todo with same description or Id already exists"],
      });
    });
  });
  describe("remove", () => {
    test("should remove a todo if it exists", async () => {
      const { repository, todos } = await makeTestTodoRepository();
      await insertTestTodos();
      const result = await repository.remove(todos[0].id);
      expect(result).toStrictEqual({
        success: true,
        todo: todos[0],
      });
    });
    test("should fail remove when  the todo does not exist", async () => {
      const { repository } = await makeTestTodoRepository();
      const result = await repository.remove("any-id");
      expect(result).toStrictEqual({
        success: false,
        errors: ["Todo not exist"],
      });
    });
  });
});
