// "use strict";
const userInput = document.querySelector("input");
const addTodoBtn = document.querySelector("button"); //Add Button
const todoListContainer = document.querySelector("ul");
userInput.focus();

/////////////////////
//Class to add, remove, render and mark todos as complete
class App {
  constructor() {
    this.todos = [];
  }
  //A method that adds a new todo to the todos array
  addToDo(text) {
    // If no user input it returns
    if (!text) return;
    this.todos.push(text); //adds todo to the todos array
    userInput.value = "";
    userInput.focus();
  }
  // Removes the given todo from the array
  removeToDo(item) {
    // finds the first occurance of the todo item and removes it
    const indexOfItem = this.todos.findIndex((todo) => todo === item);
    if (indexOfItem !== -1) {
      this.todos.splice(indexOfItem, 1);
    }
  }
  // Marks a todo as completed
  completeTodo(element) {
    const el = element.querySelector("h2").textContent;
    element.classList.toggle("isComplete");
    // removes the completed todo after a given time
    if (element.classList.contains("isComplete")) {
      setTimeout(() => {
        const indexOfItem = this.todos.findIndex((todo) => todo === el);
        if (indexOfItem !== -1) {
          this.todos.splice(indexOfItem, 1);
        }
        this.renderTodo();
      }, 5000);
    } else {
      return;
    }
  }
  renderTodo() {
    // Renders all the todos
    todoListContainer.innerHTML = "";
    this.todos.forEach((todo) => {
      todoListContainer.insertAdjacentHTML(
        "afterbegin",
        `<li>
            <div class="list_items-container">
              <h2>${todo}</h2>
              <button class="remove_button"><ion-icon name="close-outline" ></ion-icon></button>
            </div>
          </li>`
      );
    });
    const removeButtons = document.querySelectorAll(".remove_button");
    const listItemContainer = document.querySelectorAll(
      ".list_items-container"
    );

    removeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const item = e.target.parentElement.querySelector("h2").textContent;
        todo.removeToDo(item);
        todo.renderTodo();
      });
    });
    listItemContainer.forEach((todo) => {
      todo.addEventListener("click", (e) => {
        e.preventDefault();
        this.completeTodo(e.target.closest(".list_items-container"));
      });
    });
  }
}

const todo = new App();

addTodoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  todo.addToDo(userInput.value);
  todo.renderTodo();
});
