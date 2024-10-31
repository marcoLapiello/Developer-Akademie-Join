/**
 * @module "taskDetailViewEdit.js"
 */

/**
 * Imports the function to retrieve an icon element for use in the user interface.
 *
 * @module icons
 * @function returnIcon - Generates and returns an HTML element representing the specified icon.
 * @param {string} iconName - The name or identifier of the icon to retrieve.
 * @returns {HTMLElement} - The HTML element representing the requested icon.
 */
import { returnIcon } from "../icons.js";

/**
 * Imports the function to retrieve the array of tasks.
 *
 * @module script
 * @function getTasksArray - Retrieves the array of tasks from the script.
 */
import { getTasksArray } from "../../js/script.js";

/**
 * Imports various functions and variables for handling tasks and subtasks.
 *
 * @module addTask
 * @variable currentPrio - The current priority level of a task.
 * @function setGlobalVariablesToDefault - Resets global variables to their default values.
 * @function getSubtaskTemplate - Retrieves the template for a subtask.
 * @variable newTaskObject - An object template for a new task.
 */
import { currentPrio, setGlobalVariablesToDefault, getSubtaskTemplate, newTaskObject } from "../addTask/addTask.js";

/**
 * Imports functions and variables for handling the user dropdown list in the add task component.
 *
 * @module userDropdown
 * @function overwriteSelectedUsers - Overwrites the selected users.
 * @variable selectedUsers - An array to store the selected users.
 * @function renderUserDropdownList - Renders the user dropdown list.
 */
import { overwriteSelectedUsers, selectedUsers, renderUserDropdownList } from "../addTask/userDropdown.js";

/**
 * Imports the function to toggle the task detail view.
 *
 * @module taskDetailView
 * @function toggleTaskDetailView - Toggles the visibility of the task detail view.
 */
import { toggleTaskDetailView } from "../taskDetailView/taskDetailView.js";

/**
 * Imports the function to update a task in the database service.
 *
 * @module tasksApiService
 * @function patchTaskUpdate - Updates a task in the database.
 */
import { patchTaskUpdate } from "../../js/tasksApiService.js";

/**
 * Retrieves the values from the task edit input fields.
 *
 * @returns {Object} An object containing the following properties:
 * - titleInput {string}: The value of the task title input field.
 * - descriptionInput {string}: The value of the task description input field.
 * - dueDateInput {string}: The value of the task due date input field.
 * - priorityInput {string}: The current priority value.
 * - newSelectedUsers {Object}: An object containing the selected users.
 */
function getEditInputValues() {
  const titleInput = document.getElementById("taskTitleInput").value;
  const descriptionInput = document.getElementById("taskDescription").value;
  const dueDateInput = document.getElementById("taskDueDate").value;
  const priorityInput = currentPrio;
  const newSelectedUsers = {
    placeholder: "placeholder",
  };
  selectedUsers.forEach((user) => {
    newSelectedUsers[user] = user;
  });
  return { titleInput, descriptionInput, dueDateInput, priorityInput, newSelectedUsers };
}

/**
 * Asynchronously retrieves and updates task data based on the provided task ID.
 *
 * This function performs the following steps:
 * 1. Retrieves the array of tasks.
 * 2. Finds the task data corresponding to the provided task ID.
 * 3. Gets the input values for editing the task.
 * 4. Updates the task data with the new input values if they are provided.
 * 5. Patches the updated task data to the server.
 * 6. Finalizes the task editing process.
 *
 * @param {string} taskID - The ID of the task to be edited.
 * @returns {Promise<void>} - A promise that resolves when the task data has been updated.
 */
export async function getEditTaskData(taskID) {
  let tasksArray = await getTasksArray();
  const taskData = tasksArray.find(([id]) => id === taskID)[1];
  const { titleInput, descriptionInput, dueDateInput, priorityInput, newSelectedUsers } = getEditInputValues();
  if (titleInput) taskData.title = titleInput;
  if (descriptionInput) taskData.description = descriptionInput;
  if (dueDateInput) taskData.dueDate = dueDateInput;
  if (priorityInput) taskData.priority = priorityInput;
  if (selectedUsers) taskData.assignedTo = newSelectedUsers;
  if (newTaskObject.subtasks) taskData.subtasks = newTaskObject.subtasks;
  patchTaskUpdate(taskData, taskID, taskData.status);
  finalizeTaskEdit();
}

/**
 * Finalizes the task editing process by resetting global variables,
 * clearing selected users, toggling the task detail view, and providing user feedback.
 *
 * This function performs the following actions:
 * 1. Resets global variables to their default values.
 * 2. Clears the list of selected users.
 * 3. Toggles the visibility of the task detail view.
 * 4. Provides feedback to the user about the task editing process.
 */
function finalizeTaskEdit() {
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
