import { openCloseDropdown, closeUsersDropdownList, selectedUsers, clearSelectedUsers } from "../addTask/userDropdown.js";

import { returnIcon } from "../icons.js";

import { getTaskTemplate } from "../addTask/taskTemplate.js";

export let currentPrio = "medium";
let currentProgress = 0;
let currentStatus = "todo";

export function openTaskModal(modal) {
  document.getElementById("taskModalBackground").classList.remove("d_none");
  renderTaskTemplate(modal);
  setTimeout(() => {
    document.getElementById("addTaskModalContainer").style.left = "50%";
  }, 50);
}

export function hideTaskModal() {
  document.getElementById("addTaskModalContainer").style.left = "150%";
  clearAddTaskHTML();
  setTimeout(() => {
    document.getElementById("taskModalBackground").classList.add("d_none");
  }, 550);
}

export function hideTaskModalFromBG(event) {
  if (event.target.id == "taskModalBackground") {
    hideTaskModal();
  } else {
    return;
  }
}

export function renderTaskTemplate(card, currentID) {
  let cardRef;
  if (card == "add") {
    cardRef = "addTaskWrapper";
  } else if (card == "edit") {
    cardRef = "taskDetailViewCard";
  } else {
    cardRef = "addTaskModalContainer";
  }
  let cardRenderRef = document.getElementById(cardRef);
  cardRenderRef.innerHTML = getTaskTemplate(card);
}

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

export let newTaskObject = {
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
  getSelectedUsers();
  let newTask = newTaskObject;
  if (!validateNewTaskInputs()) {
    return;
  }
  clearAddTaskHTML();
  clearSelectedUsers();
  return newTask;
}

export function setGlobalVariablesToDefault() {
  currentPrio = "medium";
  currentProgress = 0;
  currentStatus = "todo";
  newTaskObject = emptyTaskTemplate;
}

export function clearAddTaskHTML() {
  document.getElementById("taskTitleInput").value = "";
  document.getElementById("taskTitleWarning").classList.add("d_none");
  document.getElementById("taskTitleInput").style.borderColor = "#d1d1d1";
  document.getElementById("taskDescription").value = "";
  document.getElementById("currentAssignation").innerHTML = "";
  document.getElementById("taskDueDate").value = "";
  document.getElementById("taskDateWarning").classList.add("d_none");
  document.getElementById("taskDueDate").style.borderColor = "#d1d1d1";
  document.getElementById("taskCategory").innerText = "Select task category";
  document.getElementById("taskCategoryWarning").classList.add("d_none");
  document.getElementById("categoryDropdown").style.borderColor = "#d1d1d1";
  document.getElementById("subtaskContainer").innerHTML = "";
  setGlobalVariablesToDefault();
  clearSelectedUsers();
  closeUsersDropdownList("assignedToDropdownArrow", "contactsToAssign");
}

export function createNewSubtask(card, inputID, containerID) {
  if (card == "add" && document.getElementById("subtaskInput").value) {
    renderSubtaskElement(inputID, containerID);
    document.getElementById("subtaskInput").value = "";
  }
  if (card == "edit") {
  }
}

export function renderSubtaskElement(inputID, containerID) {
  let subtaskText = document.getElementById(inputID).value;
  let subtaskID = createSubtaskObject(subtaskText);
  let newSubtaskTemplate = getSubtaskTemplate(subtaskText, subtaskID);
  document.getElementById(containerID).insertAdjacentHTML("beforeend", newSubtaskTemplate);
}

function createSubtaskObject(subtaskText) {
  let subtaskID = "SUBTASK" + Date.now();
  let newSubtask = {
    creationDate: Date.now(),
    creatorId: "",
    id: subtaskID,
    isDone: false,
    task: subtaskText,
  };
  newTaskObject.subtasks[subtaskID] = newSubtask;
  return subtaskID;
}

export function getSubtaskTemplate(subtaskText, subtaskID) {
  return /*html*/ `
    <div id="subtaskElementWrapper-${subtaskID}" class="subtaskElementWrapper">
      <div id="currentSubtaskBox-${subtaskID}" class="currentSubtaskBox">
        <div class="dotBox">
          ${returnIcon("dot")}
          <p id="currentSubtaskText-${subtaskID}">${subtaskText}</p>
        </div>
        
        <div class="subtaskActionBox">
          <div onclick="editSubtask('${subtaskID}')" id="currentSubtaskEdit-${subtaskID}">${returnIcon("editPen")}</div>
          <div class="subtaskSeparator"></div>
          <div onclick="deleteSubtask('${subtaskID}', 'add')" id="currentSubtaskDelete-${subtaskID}">${returnIcon("deleteTrashCan")}</div>
        </div>
      </div>
      <div id="editSubtaskBox-${subtaskID}" class="editSubtaskBox d_none">
        <input id="editSubtaskInput-${subtaskID}" type="text" class="editSubtaskInput">
        <div class="subtaskActionBox">
          <div onclick="deleteSubtask('${subtaskID}', 'add')" id="editSubtaskDelete-${subtaskID}">${returnIcon("deleteTrashCan")}</div>
          <div class="subtaskSeparator"></div>
          <div onclick="saveSubtaskEditing('${subtaskID}', 'add')" id="editSubtaskSave-${subtaskID}">${returnIcon("check_black")}</div>
        </div>
      </div>
    </div>
  `;
}

export function editSubtask(subtaskID) {
  document.getElementById(`editSubtaskInput-${subtaskID}`).value = document.getElementById(`currentSubtaskText-${subtaskID}`).innerText;
  document.getElementById(`currentSubtaskBox-${subtaskID}`).classList.add("d_none");
  document.getElementById(`editSubtaskBox-${subtaskID}`).classList.remove("d_none");
}

export function deleteSubtask(subtaskID, card) {
  if (card == "add") {
    document.getElementById(`subtaskElementWrapper-${subtaskID}`).remove();
    delete newTaskObject.subtasks[subtaskID];
    console.log(newTaskObject);
  } else {
    // lösche das element im html mit der passenden ID
    // lösche das subtask object aus der datenbank mit hilfe von tasksApiService.js / delteSingleSubtaskDatabase()
  }
}

export function saveSubtaskEditing(subtaskID, card) {
  if (card == "add") {
    document.getElementById(`currentSubtaskText-${subtaskID}`).innerText = document.getElementById(`editSubtaskInput-${subtaskID}`).value;
    newTaskObject.subtasks[subtaskID].task = document.getElementById(`editSubtaskInput-${subtaskID}`).value;
    document.getElementById(`currentSubtaskBox-${subtaskID}`).classList.remove("d_none");
    document.getElementById(`editSubtaskBox-${subtaskID}`).classList.add("d_none");
    console.log(newTaskObject);
  } else {
    // lösche das element im html mit der passenden ID
    // überschreibe das subtask object aus der datenbank mit hilfe von tasksApiService.js / patchUpdateSingleSubtaskDatabase(taskID, subtaskID, isChecked)
  }
}

export function setHighlightSubtaskDivBorder(event) {
  document.getElementById("subtaskInputContainer").classList.add("borderColorBlue");
}

export function removeHighlightSubtaskDivBorder(event) {
  if (event.target.id != "subtaskInput") {
    document.getElementById("subtaskInputContainer").classList.remove("borderColorBlue");
  }
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

export function getSelectedUsers() {
  selectedUsers.forEach((userID) => {
    newTaskObject.assignedTo[userID] = userID;
  });
}

export function validateNewTaskInputs() {
  let isTitleValid = validateTaskTitleInput();
  let isDateValid = validateTaskDateInput();
  let isCategoryValid = validateTaskCategoryInput();
  if (!isTitleValid || !isDateValid || !isCategoryValid) {
    return false;
  }
  return true;
}

export function validateTaskTitleInput() {
  let title = document.getElementById("taskTitleInput").value;
  if (title.length < 3) {
    document.getElementById("taskTitleWarning").classList.remove("d_none");
    document.getElementById("taskTitleInput").classList.add("borderColorRed");
    return false;
  }
  document.getElementById("taskTitleWarning").classList.add("d_none");
  document.getElementById("taskTitleInput").classList.remove("borderColorRed");
  return true;
}

export function validateTaskDateInput() {
  let date = document.getElementById("taskDueDate").value;
  let dateToday = new Date(Date.now());
  let formattedDate = dateToday.toISOString().split("T")[0];
  if (!date || date < formattedDate) {
    document.getElementById("taskDateWarning").classList.remove("d_none");
    document.getElementById("taskDueDate").classList.add("borderColorRed");
    return false;
  }
  document.getElementById("taskDateWarning").classList.add("d_none");
  document.getElementById("taskDueDate").classList.remove("borderColorRed");
  return true;
}

export function validateTaskCategoryInput() {
  let category = document.getElementById("taskCategory").innerHTML;
  if (category == "Select task category") {
    document.getElementById("taskCategoryWarning").classList.remove("d_none");
    document.getElementById("categoryDropdown").classList.add("borderColorRed");
    return false;
  }
  document.getElementById("taskCategoryWarning").classList.add("d_none");
  document.getElementById("categoryDropdown").classList.remove("borderColorRed");
  return true;
}

export function validateTaskTitleByOninput() {
  let inputLettersCount = document.getElementById("taskTitleInput").value.length;
  if (inputLettersCount > 2) {
    validateTaskTitleInput();
    document.getElementById("taskTitleInput").classList.remove("borderColorRed");
  }
}
