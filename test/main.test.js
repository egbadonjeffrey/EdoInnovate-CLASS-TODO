// Todo class
class Todo {
  constructor(todo) {
    this.todo = todo;
    this.completed = false;
  }

  toggle() {
    this.completed = !this.completed;
  }
}

//  TodoList class
class TodoList {
  constructor() {
    this.todos = [];
  }

  addTodo(newTodo) {
    this.todos.push(newTodo);
    this.saveTodos();
  }

  deleteTodo(index) {
    this.todos.splice(index, 1);
    this.saveTodos();
  }

  toggleCompleteTodo(index) {
    const todo = this.todos[index];
    if (todo) {
      todo.toggle();
      this.saveTodos();
    }
  }

  saveTodos() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  loadTodos() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
  }
}

module.exports = { TodoList, Todo };
