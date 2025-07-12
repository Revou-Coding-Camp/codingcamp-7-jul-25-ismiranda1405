document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoDate = document.getElementById("todo-date");
  const filterInput = document.getElementById("filter-input");
  const todoList = document.getElementById("todo-list");
  let todos = [];

  // Tambah To-Do
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = todoInput.value.trim();
    const date = todoDate.value;

    if (task === "" || date === "") {
      alert("Form tidak boleh kosong!");
      return;
    }

    const todoItem = {
      id: Date.now(),
      task,
      date,
    };

    todos.push(todoItem);
    renderTodos(todos);
    todoForm.reset();
  });

  // Render To-Do List
  function renderTodos(data) {
    todoList.innerHTML = "";
    data.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.task} - ${item.date}
        <button class="delete" data-id="${item.id}">Delete</button>
      `;
      todoList.appendChild(li);
    });
  }

  // Hapus To-Do
  todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      const id = Number(e.target.dataset.id);
      todos = todos.filter((item) => item.id !== id);
      renderTodos(todos);
    }
  });

  // Filter To-Do
  filterInput.addEventListener("input", () => {
    const keyword = filterInput.value.toLowerCase();
    const filtered = todos.filter((item) =>
      item.task.toLowerCase().includes(keyword)
    );
    renderTodos(filtered);
  });
});