const { expect } = require("chai"); // Import the expect assertion library from Chai
const { TodoList, Todo } = require("./main.test.js"); // Import the TodoList and Todo classes from the main test file
const { JSDOM } = require("jsdom"); // Import the JSDOM module for creating a simulated DOM environment
const mockLocalStorage = require("mock-local-storage"); // Import the mock-local-storage module for simulating localStorage

// Create a JSDOM instance and set global variables
const { window } = new JSDOM(); // Create a JSDOM instance and extract the window object
global.window = window; // Set the global window object to the JSDOM window
global.document = window.document; // Set the global document object to the JSDOM document
global.localStorage = mockLocalStorage; // Set the global localStorage object to the mock-local-storage

describe("TodoList", () => {
  let todoList;

  beforeEach(() => {
    todoList = new TodoList(); // Create a new TodoList instance before each test
  });

  it("should add a new todo", () => {
    const newTodo = new Todo("Example Todo");
    todoList.addTodo(newTodo);

    expect(todoList.todos).to.have.lengthOf(1); // Assert that the todos array has a length of 1
    expect(todoList.todos[0]).to.equal(newTodo); // Assert that the first todo in the array is the same as the newTodo
  });

  it("should delete a todo by index", () => {
    const todo1 = new Todo("Todo 1");
    const todo2 = new Todo("Todo 2");
    todoList.addTodo(todo1);
    todoList.addTodo(todo2);

    todoList.deleteTodo(0);

    expect(todoList.todos).to.have.lengthOf(1); // Assert that the todos array has a length of 1 after deletion
    expect(todoList.todos[0]).to.equal(todo2); // Assert that the remaining todo is the same as todo2
  });

  it("should toggle the completion status of a todo", () => {
    const todo = new Todo("Example Todo");
    todoList.addTodo(todo);

    expect(todo.completed).to.be.false; // Assert that the initial completion status is false

    todoList.toggleCompleteTodo(0);

    expect(todo.completed).to.be.true; // Assert that the completion status has been toggled to true
  });

  it("should save and load todos from localStorage", () => {
    const todo = new Todo("Example Todo");
    todoList.addTodo(todo);

    todoList.saveTodos(); // Save todos to localStorage

    const newTodoList = new TodoList();
    newTodoList.loadTodos(); // Load todos from localStorage

    expect(newTodoList.todos).to.have.lengthOf(1); // Assert that the loaded todos array has a length of 1
    expect(newTodoList.todos[0].todo).to.equal(todo.todo); // Assert that the loaded todo's content is the same as the original todo
    expect(newTodoList.todos[0].completed).to.equal(todo.completed); // Assert that the loaded todo's completion status is the same as the original todo
  });
});
