let tasks = JSON.parse(localStorage.getItem("task")) || [];
const inputEl = document.getElementById("input");
const addEl = document.getElementById("addItem");
const taskEl = document.getElementById("taskes");
const listInfoEl = document.getElementById("listInfo");
const actionsEl = document.getElementById("actions");
const hideListEl = document.getElementById("hideList");
const myTodoListEl = document.getElementById("myTodoList");
const editTaskEl = document.getElementById("editTask");
const showList = (hideListEl.innerHTML = "Show list");
const hideList = (hideListEl.innerHTML = "Hide list");
const editBtnEl = document.getElementById("editBtn");
let editIndex = -1;
hideListEl.addEventListener("click", () => {
  taskEl.classList.toggle("hidden");
  if (taskEl.classList.contains("hidden")) {
    //  taskEl.style.display = 'block'
    hideListEl.innerHTML = "Show List";
  } else {
    hideListEl.innerHTML = "Hide List";
  }
});
// let currentIndex = null;
// editBtnEl.addEventListener("click", () => {
//   const newTask = editTaskEl.value;
//   if (currentIndex !== null && newTask) {
//     editTask(currentIndex, newTask);
//     editTaskEl.value = "";
//     currentIndex = null;
//   } else {
//     alert("No task selected!");
//   }
// });
// const listItemDetails = document.createElement("li");
// listItemDetails.className = "li";
function renderList() {
  taskEl.innerHTML = "";
  tasks.forEach((task, index) => {
    const listItem = document.createElement("p");
    const listItemDetails = document.createElement("li");
    listItemDetails.className = "li";
    listItemDetails.textContent = task;
    listItem.className = "listContainer";

    // listItem.onclick = () => selectTodoForEditing(index, task);
    listItemDetails.addEventListener("click", () => {
      editTaskEl.value = task;
      editIndex = index;
    });

    let actions = document.createElement("p");
    actions.className = "actions";
    let actionItems1 = document.createElement("span");
    let actionItems2 = document.createElement("span");
    let actionItems3 = document.createElement("span");
    actionItems1.innerHTML = "Up";
    actionItems2.innerHTML = "Down";
    actionItems3.innerHTML = "Remove";
    actionItems1.onclick = (e) => {
      e.stopPropagation();
      moveTodoUp(index);
    };
    actionItems2.onclick = (e) => {
      e.stopPropagation();
      moveTodoDown(index);
    };
    actionItems3.classList.add("remove-btn");
    actionItems3.addEventListener("click", () => removeTask(index));
    actions.append(actionItems1, actionItems2, actionItems3);

    listItem.append(listItemDetails, actions);
    taskEl.appendChild(listItem);
  });
}
function moveTodoUp(index) {
  if (tasks.length > 1 && index > 0 && index < tasks.length) {
    const temp = tasks[index];
    tasks[index] = tasks[index - 1];
    tasks[index - 1] = temp;
    saveTask();
    renderList();
  }
}
function moveTodoDown(index) {
  if (index < tasks.length - 1) {
    const temp = tasks[index];
    tasks[index] = tasks[index + 1];
    tasks[index + 1] = temp;
    saveTask();
    renderList();
  }
}
function selectTodoForEditing(index, task) {
  listItemDetails.textContent = task;
  editIndex = index;
}
function updateTodo() {
  const editedTodo = editTaskEl.value.trim();
  if (editedTodo !== "" && editIndex > -1) {
    editTask(editIndex, editedTodo);
    editTaskEl.value = "";
    editIndex = -1;
    renderList();
  }
}
function editTask(index, newTask) {
  const tasks = JSON.parse(localStorage.getItem("task"));
  if (tasks && index >= 0 && index < tasks.length) {
    tasks[index] = newTask;
    localStorage.setItem("task", JSON.stringify(tasks));
    renderList(); // Reload the todo list to reflect the changes
  } else {
    alert("Task not found!");
  }
}

function saveTask() {
  localStorage.setItem("task", JSON.stringify(tasks));
}
function addTask() {
  const newTaskValue = inputEl.value.trim();
  if (newTaskValue) {
    tasks.push(newTaskValue);
    inputEl.value = "";
    renderList();
    saveTask();
  } else {
    alert("Write a task!");
  }
}
function removeTask(index) {
  tasks.splice(index, 1);
  renderList();
  saveTask();
}
function upButton(index) {}

renderList();
