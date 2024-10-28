/**
 * @module "taskDetailViewEdit.js"
 */

import { returnIcon } from "../icons.js";
import { getTasksArray } from "../../js/script.js";
import { currentPrio, setGlobalVariablesToDefault, getSubtaskTemplate, newTaskObject } from "../addTask/addTask.js";
import { overwriteSelectedUsers, selectedUsers, renderUserDropdownList } from "../addTask/userDropdown.js";
import { toggleTaskDetailView } from "../taskDetailView/taskDetailView.js";
import { patchTaskUpdate } from "../../js/tasksApiService.js";

/**
 * Retrieves the values from the task edit input fields.
 *
 * @returns {Object} An object containing the values from the input fields:
 * - `titleInput` {string}: The value of the task title input field.
 * - `descriptionInput` {string}: The value of the task description input field.
 * - `dueDateInput` {string}: The value of the task due date input field.
 * - `priorityInput` {string}: The current priority value.
 */
function getEditInputValues() {
  const titleInput = document.getElementById("taskTitleInput").value;
  const descriptionInput = document.getElementById("taskDescription").value;
  const dueDateInput = document.getElementById("taskDueDate").value;
  const priorityInput = currentPrio;
  return { titleInput, descriptionInput, dueDateInput, priorityInput };
}

// ! Refactor this function to use the return value from getEditInputValues
/**
 * Updates the task data with the provided task ID by fetching the tasks array,
 * updating the task details with the input values, and then patching the task update.
 *
 * @async
 * @function getEditTaskData
 * @param {string} taskID - The ID of the task to be edited.
 * @returns {Promise<void>} - A promise that resolves when the task data has been updated.
 */
export async function getEditTaskData(taskID) {
  let tasksArray = await getTasksArray();
  const newSelectedUsers = {
    placeholder: "placeholder",
  };
  selectedUsers.forEach((user) => {
    newSelectedUsers[user] = user;
  });
  const taskData = tasksArray.find(([id]) => id === taskID)[1];
  const { titleInput, descriptionInput, dueDateInput, priorityInput } = getEditInputValues();
  if (titleInput) taskData.title = titleInput;
  if (descriptionInput) taskData.description = descriptionInput;
  if (dueDateInput) taskData.dueDate = dueDateInput;
  if (priorityInput) taskData.priority = priorityInput;
  if (selectedUsers) taskData.assignedTo = newSelectedUsers;
  if (newTaskObject.subtasks) taskData.subtasks = newTaskObject.subtasks;
  patchTaskUpdate(taskData, taskID, taskData.status);
  setGlobalVariablesToDefault();
  overwriteSelectedUsers("");
  toggleTaskDetailView();
  editTaskUserFeedback();
}

/**
 * Renders the task detail view in edit mode for a given task ID.
 *
 * This function fetches the tasks array, finds the task data corresponding to the provided task ID,
 * and updates the inner HTML of the task detail view element with the edit template. It also sets
 * the input values for editing based on the task data.
 *
 * @async
 * @function renderTaskDetailViewEdit
 * @param {string} taskID - The ID of the task to be edited.
 * @returns {Promise<void>} A promise that resolves when the task detail view has been rendered.
 */
export async function renderTaskDetailViewEdit(taskID) {
  let tasksArray = await getTasksArray();
  const taskData = tasksArray.find(([id]) => id === taskID)[1];
  const taskDetailViewRef = document.getElementById("taskDetailView");
  taskDetailViewRef.innerHTML = renderTaskDetailViewEditTemplate(taskData);
  setEditInputValues(taskData);
}

/**
 * Sets the input values for editing a task based on the provided task data.
 *
 * @param {Object} taskData - The data of the task to be edited.
 * @param {string} taskData.title - The title of the task.
 * @param {string} taskData.description - The description of the task.
 * @param {string} taskData.dueDate - The due date of the task.
 * @param {Object} taskData.subtasks - The subtasks of the task.
 * @param {Object} taskData.assignedTo - The users assigned to the task.
 */
function setEditInputValues(taskData) {
  document.getElementById("taskTitleInput").value = taskData.title;
  document.getElementById("taskDescription").value = taskData.description;
  document.getElementById("taskDueDate").value = taskData.dueDate;
  Object.entries(taskData.subtasks).forEach(([key, subtask]) => {
    if (key !== "placeholder") {
      newTaskObject.subtasks[key] = subtask;
      document.getElementById("subtaskContainer").innerHTML += getSubtaskTemplate(subtask.task, subtask.id);
    }
  });
  const assignedUsers = Object.values(taskData.assignedTo).filter((value) => value !== "placeholder");
  overwriteSelectedUsers(assignedUsers);
  renderUserDropdownList();
}

/**
 * Renders the task detail view edit template.
 *
 * @param {Object} taskData - The data of the task to be edited.
 * @param {string} taskData.id - The unique identifier of the task.
 * @param {string} taskData.priority - The priority level of the task (e.g., "urgent", "medium", "low").
 * @returns {string} The HTML template for the task detail view edit.
 */
function renderTaskDetailViewEditTemplate(taskData) {
  return /*html*/ `
  <div class="taskDetailViewCardContainer">
    <div class="taskDetailViewCardEdit" onclick="removeHighlightSubtaskDivBorder(event)"> 
        <div class="header">
            <div onclick="toggleTaskDetailView()" class="closeButton">${returnIcon("closeX")}</div>
        </div>      
        <div class="titleContainer">
          <p class="title">Title<span style="color: red">*</span></p>
          <input oninput="validateTaskTitleByOninput()" id="taskTitleInput" class="taskTitleInput" type="text" placeholder="Enter a title" />
          <p class="addTaskValidationWarning"><span id="taskTitleWarning" class="d_none">Insert a title longer than 3 letters</span>&nbsp;</p>
        </div>
        <div class="descriptionContainer">
          <p class="description">Description</p>
          <textarea name="" id="taskDescription" class="taskDescriptionInput" placeholder="Enter a description"></textarea>
        </div>     
        <div class="dueDateContainer">
          <p class="dueDate" >Due date<span style="color: red">*</span></p>
          <input onchange="validateTaskDateInput()" id="taskDueDate" class="taskDueDateInput" type="date" placeholder="dd/mm/yyyy" />
          <p class="addTaskValidationWarning"><span id="taskDateWarning" class="d_none">Due date must be today or later</span>&nbsp;</p>
        </div>
        <div class="priorityContainer">
          <p class="priority">Priority</p>
          <div id="prioContainer" class="prioContainer">
          <div onclick="selectPrio(event)" id="prioUrgent" class="priorities ${
            taskData.priority.toLowerCase() == "urgent" ? "urgentPrio" : ""
          }">Urgent<img src="./assets/icons/urgent_icon.png" alt="" /></div>
          <div onclick="selectPrio(event)" id="prioMedium" class="priorities ${
            taskData.priority.toLowerCase() == "medium" ? "mediumPrio" : ""
          }">Medium<img src="./assets/icons/medium_icon.png" alt="" /></div>
          <div onclick="selectPrio(event)" id="prioLow" class="priorities ${
            taskData.priority.toLowerCase() == "low" ? "lowPrio" : ""
          }">Low<img src="./assets/icons/low_icon.png" alt="" /></div>
          </div>
        </div>
        <div class="assignedToContainer">
          <p class="assignedTo">Assigned to</p>          
          <div class="assignedToDropdown" id="assignedToDropdown">
              <input id="searchUserToAssign" class="searchUserToAssign" 
              onfocus="openUserDropdownFromUserInput()" oninput="filterUsersByName()" type="text" placeholder="Select contacts to assign" />
              <img id="assignedToDropdownArrow" class="assignedToDropdownArrow" 
              onclick="openCloseDropdown('assignedToDropdownArrow' , 'contactsToAssign') , renderUserDropdownList()" src="./assets/icons/arrow_drop_down.png" alt="" />
          </div>
        </div>
        <div id="contactsToAssign" class="contactsToAssign d_none"></div>
        <div id="currentAssignation" class="currentAssignation"></div>   
        <div class="subtasksContainer">
          <p class="subtasks">Subtasks</p>
          <div class="addSubtaskContainer">
            <div onclick="setHighlightSubtaskDivBorder()" id="subtaskInputContainer" class="subtaskInputContainer">
              <input id="subtaskInput" class="subtaskInput" type="text" placeholder="Add a new subtask" />
              <div onclick="createNewSubtask('add', 'subtaskInput', 'subtaskContainer')" id="renderSubtaskElement" class="newSubtaskPlusBtn">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/ svg">
                  <path d="M8.66602 11.3327H0.666016V8.66602H8.66602V0.666016H11.3327V8.66602H19.3327V11.3327H11.3327V19.3327H8.66602V11.3327Z" fill="black" />
                </svg>
              </div>
            </div>
            <ul class="subtaskContainer" id="subtaskContainer"></ul>
          </div>
        </div>        
        <div id="addTaskBottomContainer" class="addTaskBottomContainer">
          <p><span style="color: red">*</span>This field is required</p>
          <div id="taskBtnContainer" class="taskBtnContainer">
            <button onclick="getEditTaskData('${taskData.id}')" class="createBtn" onclick="">Ok${returnIcon("check", "check")}</button>
          </div>
        </div>
    </div>
  </div>
    `;
}
