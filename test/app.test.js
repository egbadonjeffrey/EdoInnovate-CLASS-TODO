const { expect } = require("chai");
const { TodoList, Todo } = require("./main.test.js");
const { JSDOM } = require("jsdom");
const mockLocalStorage = require("mock-local-storage");

// Create a JSDOM instance and set global variables
const { window } = new JSDOM();
global.window = window;
global.document = window.document;
global.localStorage = mockLocalStorage;

describe("TodoList", () => {
  let todoList;

  beforeEach(() => {
    todoList = new TodoList();
  });

  it("should add a new todo", () => {
    const newTodo = new Todo("Example Todo");
    todoList.addTodo(newTodo);

    expect(todoList.todos).to.have.lengthOf(1);
    expect(todoList.todos[0]).to.equal(newTodo);
  });

  it("should delete a todo by index", () => {
    const todo1 = new Todo("Todo 1");
    const todo2 = new Todo("Todo 2");
    todoList.addTodo(todo1);
    todoList.addTodo(todo2);

    todoList.deleteTodo(0);

    expect(todoList.todos).to.have.lengthOf(1);
    expect(todoList.todos[0]).to.equal(todo2);
  });

  it("should toggle the completion status of a todo", () => {
    const todo = new Todo("Example Todo");
    todoList.addTodo(todo);

    expect(todo.completed).to.be.false;

    todoList.toggleCompleteTodo(0);

    expect(todo.completed).to.be.true;
  });

  it("should save and load todos from localStorage", () => {
    const todo = new Todo("Example Todo");
    todoList.addTodo(todo);

    todoList.saveTodos();

    const newTodoList = new TodoList();
    newTodoList.loadTodos();

    expect(newTodoList.todos).to.have.lengthOf(1);
    expect(newTodoList.todos[0].todo).to.equal(todo.todo);
    expect(newTodoList.todos[0].completed).to.equal(todo.completed);
  });
});
