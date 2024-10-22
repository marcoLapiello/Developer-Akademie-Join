import { openCloseDropdown } from "../addTask/userDropdown.js";
window.openCloseDropdown = openCloseDropdown;

import { returnIcon } from "../icons.js";

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
  clearAddTaskHTML();
  return newTask;
  // - assign selected users

  // - clear selected users
}

// implement function!!! import selectedUsers(Array) from userDropdownlist.js
// change selectedUsers(Array) to an objact and assign it to getNewTaskTemplate

function setGlobalVariablesToDefault() {
  currentPrio = "medium";
  currentProgress = 0;
  currentStatus = "In progress";
  newTaskObject = emptyTaskTemplate;
}

export function clearAddTaskHTML() {
  document.getElementById("taskTitleInput").value = "";
  document.getElementById("taskDescription").value = "";
  document.getElementById("currentAssignation").innerHTML = "";
  document.getElementById("taskDueDate").value = "";
  document.getElementById("taskCategory").innerText = "Select task category";
  document.getElementById("subtaskContainer").innerHTML = "";
  setGlobalVariablesToDefault();
}

export function createNewSubtask(card, inputID, containerID) {
  if (card == "add") {
    renderSubtaskElement(inputID, containerID);
    document.getElementById("subtaskInput").value = "";
  }
  if (card == "edit") {
  }
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

export function renderSubtaskElement(inputID, containerID) {
  let subtaskText = document.getElementById(inputID).value;
  let subtaskID = createSubtaskObject(subtaskText);
  let newSubtaskTemplate = getSubtaskTemplate(subtaskText, subtaskID);
  document.getElementById(containerID).insertAdjacentHTML("beforeend", newSubtaskTemplate);
  console.log(newTaskObject);
  
}

function getSubtaskTemplate(subtaskText, subtaskID) {
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
        <input id="editSubtaskInput-${subtaskID}" type="text">
        <div class="subtaskActionBox">
          <div onclick="deleteSubtask('${subtaskID}', 'add')" id="editSubtaskDelete-${subtaskID}">Delete${returnIcon("deleteTrashCan")}</div>
          <div class="subtaskSeparator">Divider</div>
          <div onclick="saveSubtaskEditing('${subtaskID}', 'add')" id="editSubtaskSave-${subtaskID}">Save ${returnIcon("check")}</div>
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
  } else {
    // lösche das element im html mit der passenden ID
    // überschreibe das subtask object aus der datenbank mit hilfe von tasksApiService.js / patchUpdateSingleSubtaskDatabase(taskID, subtaskID, isChecked)
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

export async function getFilteredUsersArray() {
  // wir bauen ein array aus
}
