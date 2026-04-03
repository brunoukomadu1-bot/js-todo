// ================================
// SELECT DOM ELEMENTS
// ================================
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const deleteSelectedBtn = document.getElementById("delete-selected");

// ================================
// LOAD TODOS FROM LOCAL STORAGE
// ================================
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// ================================
// SAVE TODOS TO LOCAL STORAGE
// ================================
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// ================================
// RENDER TODOS TO UI
// ================================
function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    // Left side (checkbox + text)
    const leftDiv = document.createElement("div");
    leftDiv.className = "todo-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    // Toggle completed
    checkbox.addEventListener("change", () => {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos();
    });

    const span = document.createElement("span");
    span.textContent = todo.text;

    if (todo.completed) {
      span.classList.add("completed");
    }

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);

    // Right side (buttons)
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "todo-actions";

    // EDIT BUTTON
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit");

    editBtn.addEventListener("click", () => {
      const newText = prompt("Update your task:", todo.text);
      if (newText !== null && newText.trim() !== "") {
        todo.text = newText.trim();
        saveTodos();
        renderTodos();
      }
    });

    // DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(leftDiv);
    li.appendChild(actionsDiv);

    list.appendChild(li);
  });
}

// ================================
// ADD NEW TODO
// ================================
addBtn.addEventListener("click", () => {
  const text = input.value.trim();

  if (text === "") return;

  todos.push({
    text: text,
    completed: false
  });

  input.value = "";
  saveTodos();
  renderTodos();
});

// ================================
// DELETE SELECTED TODOS
// ================================
deleteSelectedBtn.addEventListener("click", () => {
  todos = todos.filter(todo => !todo.completed);
  saveTodos();
  renderTodos();
});

// ================================
// INITIAL RENDER
// ================================
renderTodos();