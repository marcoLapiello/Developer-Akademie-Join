import { openCloseDropdown } from "../addTask/userDropdown.js";
window.openCloseDropdown = openCloseDropdown;

let currentPrio = "medium";
let currentProgress = 0;
let currentStatus = "In progress";

let emptyTaskTemplate = {
  id: "",
  title: "",
  description: "",
  assignedTo: { placeholder: "placeholder" },
  dueDate: "",
  creationDate: "",
  creatorId: "",
  priority: "",
  category: "",
  categoryColor: "",
  progress: "",
  status: "",
  subtasks: {
    placeholder: "placeholder",
  },
};

let newTaskObject = {
  id: "",
  title: "",
  description: "",
  assignedTo: { placeholder: "placeholder" },
  dueDate: "",
  creationDate: "",
  creatorId: "",
  priority: "",
  category: "",
  categoryColor: "",
  progress: "",
  status: "",
  subtasks: {
    placeholder: "placeholder",
  },
};

export function getNewTaskTemplate() {
  newTaskObject.id = "TASK" + Date.now();
  newTaskObject.title = document.getElementById("taskTitleInput").value;
  newTaskObject.description = document.getElementById("taskDescription").value;
  newTaskObject.dueDate = document.getElementById("taskDueDate").value;
  newTaskObject.creationDate = Date.now();
  newTaskObject.creatorId = "";
  newTaskObject.priority = currentPrio;
  newTaskObject.category = document.getElementById("taskCategory").innerText;
  newTaskObject.categoryColor = "";
  newTaskObject.progress = currentProgress;
  newTaskObject.status = currentStatus;

  let newTask = newTaskObject;

  newTaskObject = emptyTaskTemplate;
  currentPrio = "medium";

  return newTask;
  // - assign selected users

  // - clear selected users
}

// implement function!!! import selectedUsers(Array) from userDropdownlist.js
// change selectedUsers(Array) to an objact and assign it to getNewTaskTemplate

export function createNewSubtask(card, inputID, containerID) {
  if (card == "add") {
    generateSubtaskElement(inputID, containerID);
  }
  if (card == "edit") {
  }
}

export function generateSubtaskElement(inputID, containerID) {
  let subtaskText = document.getElementById(inputID).value;
  let subtaskListItem = document.createElement("li");
  subtaskListItem.innerText = subtaskText;
  document.getElementById(containerID).appendChild(subtaskListItem);
  createSubtaskTemplate(subtaskText);
}

function createSubtaskTemplate(subtaskText) {
  let subtaskID = "SUBTASK" + Date.now();
  let newSubtask = {
    creationDate: Date.now(),
    creatorId: "",
    id: subtaskID,
    isDone: false,
    task: subtaskText,
  };
  newTaskObject.subtasks[subtaskID] = newSubtask;
}

export function selectPrio(event) {
  if (event.target == document.getElementById("prioUrgent")) {
    removePrio();
    document.getElementById("prioUrgent").classList.add("urgentPrio");
    currentPrio = "Urgent";
  } else if (event.target == document.getElementById("prioMedium")) {
    removePrio();
    document.getElementById("prioMedium").classList.add("mediumPrio");
    currentPrio = "Medium";
  } else if (event.target == document.getElementById("prioLow")) {
    removePrio();
    document.getElementById("prioLow").classList.add("lowPrio");
    currentPrio = "Low";
  }
}

export function removePrio() {
  document.getElementById("prioUrgent").classList.remove("urgentPrio");
  document.getElementById("prioMedium").classList.remove("mediumPrio");
  document.getElementById("prioLow").classList.remove("lowPrio");
}

export function selectCategory(selectedCategory) {
  document.getElementById("taskCategory").innerText = selectedCategory;
  document.getElementById("categoryDropdownArrow").classList.toggle("rotatedArrow");
  document.getElementById("categorySelectionContainer").classList.toggle("d_none");
}

export async function getFilteredUsersArray() {
  // wir bauen ein array aus
}
