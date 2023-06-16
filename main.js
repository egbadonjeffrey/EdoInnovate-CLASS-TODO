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

// DOMContentLoaded event listener

document.addEventListener("DOMContentLoaded", () => {
  const todoList = new TodoList();

  const addTodoForm = document.getElementById("addTodoForm");
  const todoInput = document.getElementById("todo");
  const todoContainer = document.querySelector(".todo-container");

  addTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todoValue = todoInput.value.trim();

    if (todoValue === "") {
      alert("Please fill in the todo field");
      return;
    }

    const newTodo = new Todo(todoValue);
    todoList.addTodo(newTodo);
    todoInput.value = "";

    displayTodos();
  });

  function displayTodos() {
    todoContainer.innerHTML = "";

    if (todoList.todos.length === 0) {
      todoContainer.innerHTML = "<p>No todos yet.</p>";
    } else {
      todoList.todos.map((todo, index) => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");

        const todoText = document.createElement("p");
        todoText.textContent = todo.todo;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("remove-btn");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
          todoList.deleteTodo(index);
          displayTodos();
        });

        todoItem.appendChild(todoText);
        todoItem.appendChild(deleteButton);

        todoContainer.appendChild(todoItem);
      });
    }
  }

  // Load todos from local storage on page load
  todoList.loadTodos();
  displayTodos();
});
