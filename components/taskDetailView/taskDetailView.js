/**
 * @module "taskDetailView.js"
 */

/**
 * Imports the function to retrieve an icon element for use in the user interface.
 *
 * @module icons
 * @function returnIcon - Generates and returns an HTML element representing the specified icon based on the provided icon name.
 * @param {string} iconName - The name or identifier of the icon to retrieve.
 * @returns {HTMLElement} - The HTML element representing the requested icon.
 */
import { returnIcon } from "../icons.js";

/**
 * Imports functions to retrieve arrays of users and tasks.
 *
 * @module script
 * @function getUsersArray - Retrieves the array of users from the script.
 * @function getTasksArray - Retrieves the array of tasks from the script.
 */
import { getUsersArray, getTasksArray } from "../../js/script.js";

/**
 * Imports the function to update the progress of a task.
 *
 * @module editTask
 * @function updateProgress - Updates the progress of a task in the task detail view.
 */
import { updateProgress } from "../taskDetailViewEdit/editTask.js";

/**
 * Renders the task detail view for a given task ID.
 *
 * This function fetches the tasks array, renders the assigned users and subtasks for the given task ID,
 * and updates the task detail view element with the rendered template.
 *
 * @param {string} taskID - The ID of the task to render the detail view for.
 * @returns {Promise<void>} A promise that resolves when the task detail view has been rendered.
 */
export async function renderTaskDetailView(taskID) {
  let tasksArray = await getTasksArray();
  let assignedUsers = await renderAssignedUser(taskID, tasksArray);
  let subtasks = await renderSubtasks(taskID, tasksArray);
  const taskDetailViewRef = document.getElementById("taskDetailView");
  const taskData = tasksArray.find(([id]) => id === taskID)[1];
  if (taskDetailViewRef && taskData) taskDetailViewRef.innerHTML = renderTaskDetailViewTemplate(taskData, assignedUsers, subtasks);
  toggleTaskDetailView();
}

/**
 * Retrieves the data of users assigned to a specific task.
 *
 * @param {string} taskID - The ID of the task to retrieve assigned users for.
 * @param {Array} tasksArray - An array of tasks where each task is represented as a tuple [taskID, taskData].
 * @returns {Promise<Array>} A promise that resolves to an array of user data objects assigned to the specified task.
 */
export async function getAssignedUsersData(taskID, tasksArray) {
  let usersArray = await getUsersArray();
  const taskData = tasksArray.find(([id]) => id === taskID)[1];
  const assignedTo = Object.values(taskData.assignedTo);
  const assignedUsers = [];
  assignedTo.forEach((userId) => {
    const user = usersArray.find((usersGroup) => usersGroup[1].id === userId);
    if (user) assignedUsers.push(user[1]);
  });
  return assignedUsers;
}

/**
 * Toggles the visibility of the task detail view element.
 * This function selects the element with the ID "taskDetailView" and toggles the "d_none" class on it.
 */
export function toggleTaskDetailView() {
  const taskDetailViewRef = document.getElementById("taskDetailView");
  taskDetailViewRef.classList.toggle("d_none");
}

/**
 * Adds a click event listener to toggle the visibility of the task detail view
 * when clicking directly on the task detail view container.
 *
 * - Targets the element with the ID "taskDetailView".
 * - Checks if the clicked element is the "taskDetailView" itself.
 * - Toggles the "d_none" class to hide or show the task detail view.
 *
 * @listens click
 * @param {MouseEvent} event - The click event triggered by user interaction.
 * @returns {void}
 */
document.addEventListener("click", (event) => {
  const taskDetailViewRef = document.getElementById("taskDetailView");
  if (event.target.id == "taskDetailView") {
    taskDetailViewRef.classList.toggle("d_none");
  }
});

/**
 * Renders the assigned users for a given task.
 *
 * @param {number} taskID - The ID of the task for which to render assigned users.
 * @param {Array} tasksArray - The array of tasks containing user data.
 * @returns {Promise<string>} A promise that resolves to an HTML string representing the list of assigned users.
 */
async function renderAssignedUser(taskID, tasksArray) {
  let assignedUsers = await getAssignedUsersData(taskID, tasksArray);
  let userListHTML = "";
  assignedUsers.forEach((user) => {
    if (user) {
      userListHTML += /*html*/ `
        <li class="userName">
          <span class="userInitials" style="background-color: ${user.user_color}">
            ${user.profile.initials}
          </span>
          ${user.profile.first_name} ${user.profile.last_name}
        </li>
      `;
    }
  });
  return userListHTML;
}

/**
 * Renders the HTML for the subtasks of a given task.
 *
 * @param {string} taskID - The ID of the task for which subtasks are to be rendered.
 * @param {Array} tasksArray - An array of tasks, where each task is represented as an array with the first element being the task ID and the second element being the task data.
 * @returns {Promise<string>} A promise that resolves to a string containing the HTML for the subtasks.
 */
async function renderSubtasks(taskID, tasksArray) {
  const taskData = tasksArray.find(([id]) => id === taskID)[1];
  const subtasks = Object.values(taskData.subtasks);
  let subtasksListHTML = "";
  if (subtasks.length > 1) subtasksListHTML += /*html*/ ` <span>Subtasks</span> `;
  subtasks.forEach((subtask) => {
    if (subtask && subtask !== "placeholder") {
      subtasksListHTML += /*html*/ `
        <li class="subtask" id="subtasksID${subtask.id}">
          <input 
            onchange="checkedSubtask(event,'${taskID}','${taskData.status}')" 
            type="checkbox" 
            name="${subtask.id}" 
            id="${subtask.id}" 
            class="checkboxSubtask" 
            ${subtask.isDone ? "checked" : ""}>
          ${subtask.task}
        </li>
      `;
    }
  });
  return subtasksListHTML;
}

/**
 * Handles the checking and unchecking of a subtask checkbox.
 *
 * @param {Event} event - The event object from the checkbox interaction.
 * @param {number} taskID - The ID of the task containing the subtask.
 * @param {string} currentTaskStatus - The current status of the task.
 * @returns {Promise<void>} - A promise that resolves when the subtask status is updated.
 */
export async function checkedSubtask(event, taskID, currentTaskStatus) {
  let tasksArray = await getTasksArray();
  const taskData = tasksArray.find(([id]) => id === taskID)[1];
  let checkboxId = event.target.id;
  let isChecked = event.target.checked;
  const foundSubtask = taskData.subtasks[checkboxId];
  if (foundSubtask) foundSubtask.isDone = isChecked;
  updateProgress(taskID, checkboxId, isChecked, currentTaskStatus);
}

/**
 * Renders the task detail view template.
 *
 * @param {Object} currentTask - The current task object.
 * @param {string} currentTask.id - The ID of the current task.
 * @param {string} currentTask.status - The status of the current task.
 * @param {string} currentTask.categoryColor - The color of the task category.
 * @param {string} currentTask.category - The category of the task.
 * @param {string} currentTask.title - The title of the task.
 * @param {string} currentTask.description - The description of the task.
 * @param {string} currentTask.dueDate - The due date of the task.
 * @param {string} currentTask.priority - The priority of the task.
 * @param {string} assignedUsers - The HTML string of assigned users.
 * @param {string} subtasks - The HTML string of subtasks.
 * @returns {string} The HTML string for the task detail view.
 */
function renderTaskDetailViewTemplate(currentTask, assignedUsers, subtasks) {
  let taskID = currentTask.id;
  let status = currentTask.status;
  return /*html*/ `
      <div class="taskDetailViewCardContainer">
          <div id="taskDetailViewCard" class="taskDetailViewCard">
              <div class="header"> 
                  <div class="category" style="background-color: ${currentTask.categoryColor}">${currentTask.category}</div>
                  <div onclick="toggleTaskDetailView()" class="closeButton">${returnIcon("closeX")}</div>
              </div>
              <div class="title">${currentTask.title}</div>
              <div class="description">${currentTask.description}</div>
              <div class="dueDate"><span>Due date:</span><p>${currentTask.dueDate}</p></div>
              <div class="priority"><span>Priority:</span><p>${currentTask.priority}</p>${returnIcon(`${currentTask.priority}`, `${currentTask.priority}Icon`)}</div>
              <div class="assignedTo">
              <span>Assigned To:</span>
              <ul class="userNames">
                  ${assignedUsers}
              </ul>
              <div class="subtasks">
                <ul>
                    ${subtasks}
                </ul>
              </div>
              <div class="buttons">                
                  <button onclick="renderDeleteTaskTemplate('${status}', '${taskID}')" class="deleteButton">${returnIcon("delete")}Delete</button>  
                  <button onclick="renderTaskDetailViewEdit('${currentTask.id}')" class="editButton">${returnIcon("edit")}Edit</button>  
                  </div>
              </div>
          </div>  
      </div>
    `;
}
