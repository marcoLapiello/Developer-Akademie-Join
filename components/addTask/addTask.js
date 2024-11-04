/**
 * @module "addTask.js"
 */

import { validateNewTaskInputs } from "./addTaskValidation.js";

/**
 * Imports functions and variables for handling the user dropdown list.
 *
 * @module userDropdown
 * @function closeUsersDropdownList - Closes the users dropdown list.
 * @variable selectedUsers - An array to store the selected users.
 * @function clearSelectedUsers - Clears the array of selected users.
 */
import { closeUsersDropdownList, selectedUsers, clearSelectedUsers } from "../addTask/userDropdown.js";

/**
 * Imports functions to retrieve task templates.
 *
 * @module taskTemplate
 * @function getTaskTemplate - Retrieves the template for a task.
 * @function getDeleteTaskTemplate - Retrieves the template for deleting a task.
 */
import { getTaskTemplate, getDeleteTaskTemplate } from "../addTask/taskTemplate.js";

/**
 * A variable to store the current priority level of a task.
 *
 * @type {string}
 */
export let currentPrio = "medium";

/**
 * References to feedback elements for tasks.
 *
 * @type {HTMLElement}
 */
let newTaskUserFeedbackRef = document.getElementById("newTaskUserFeedback");
let editTaskUserFeedbackRef = document.getElementById("editTaskUserFeedback");

/**
 * A variable to store the current progress of a task.
 *
 * @type {number}
 */
let currentProgress = 0;

/**
 * A variable to store the current status of a task.
 *
 * @type {string}
 */
let currentStatus = "todo";

/**
 * A template object for an empty task.
 *
 * @type {Object}
 * @property {string} id - The unique identifier for the task.
 * @property {string} title - The title of the task.
 * @property {string} description - The description of the task.
 * @property {Object} assignedTo - The user(s) assigned to the task.
 * @property {string} assignedTo.placeholder - Placeholder for assigned users.
 * @property {string} dueDate - The due date of the task.
 * @property {string} creationDate - The creation date of the task.
 * @property {string} creatorId - The ID of the task creator.
 * @property {string} priority - The priority level of the task.
 * @property {string} category - The category of the task.
 * @property {string} categoryColor - The color associated with the task category.
 * @property {string} progress - The progress of the task.
 * @property {string} status - The status of the task.
 * @property {Object} subtasks - The subtasks associated with the task.
 * @property {string} subtasks.placeholder - Placeholder for subtasks.
 */
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

/**
 * An object template for a new task.
 *
 * @type {Object}
 * @property {string} id - The unique identifier for the task.
 * @property {string} title - The title of the task.
 * @property {string} description - The description of the task.
 * @property {Object} assignedTo - The user(s) assigned to the task.
 * @property {string} assignedTo.placeholder - Placeholder for assigned users.
 * @property {string} dueDate - The due date of the task.
 * @property {string} creationDate - The creation date of the task.
 * @property {string} creatorId - The ID of the task creator.
 * @property {string} priority - The priority level of the task.
 * @property {string} category - The category of the task.
 * @property {string} categoryColor - The color associated with the task category.
 * @property {string} progress - The progress of the task.
 * @property {string} status - The status of the task.
 * @property {Object} subtasks - The subtasks associated with the task.
 * @property {string} subtasks.placeholder - Placeholder for subtasks.
 */
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

/**
 * Extracts a parameter value from the URL hash and assigns it to the currentStatus variable.
 * If the hash is not present, the function returns without doing anything.
 *
 * @function
 */
export function getHashParameter() {
  let hashParameter = window.location.hash;
  let parameter = hashParameter.split("=")[1];
  if (hashParameter) {
    currentStatus = parameter;
  } else {
    return;
  }
}

/**
 * Opens the task modal and sets the current task status.
 *
 * @param {string} status - The status of the task. Can be "todo", "inProgress", or "awaitFeedback".
 */
export function openTaskModal(status) {
  if (!status) currentStatus == "todo";
  if (status == "todo") currentStatus = "todo";
  if (status == "inProgress") currentStatus = "inProgress";
  if (status == "awaitFeedback") currentStatus = "awaitFeedback";
  document.getElementById("taskModalBackground").classList.remove("d_none");
  renderTaskTemplate();
  setTimeout(() => {
    document.getElementById("addTaskModalContainer").style.left = "50%";
  }, 50);
}

/**
 * Hides the task modal by moving it off-screen and clearing its content.
 * After a delay, it also hides the modal background.
 */
export function hideTaskModal() {
  document.getElementById("addTaskModalContainer").style.left = "150%";
  clearAddTaskHTML();
  setTimeout(() => {
    document.getElementById("taskModalBackground").classList.add("d_none");
  }, 550);
}

/**
 * Hides the task modal if the background is clicked.
 *
 * @param {Event} event - The event object from the click event.
 * @returns {void}
 */
export function hideTaskModalFromBG(event) {
  if (event.target.id == "taskModalBackground") {
    hideTaskModal();
  } else {
    return;
  }
}

/**
 * Renders a task template into the appropriate container based on the provided card type.
 *
 * @param {string} card - The type of card to render. Can be "add", "edit", or any other string.
 *  - "add": Renders the template into the "addTaskWrapper" container.
 *  - "edit": Renders the template into the "taskDetailViewCard" container.
 *  - Any other value: Renders the template into the "addTaskModalContainer" container.
 */
export function renderTaskTemplate(card) {
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

/**
 * Renders the delete task template and displays the confirmation modal.
 *
 * @param {string} status - The status of the task to be deleted.
 * @param {number} taskID - The ID of the task to be deleted.
 */
export function renderDeleteTaskTemplate(status, taskID) {
  document.getElementById("confirmDeleteUserModal").classList.remove("d_none");
  let deleteTaskTemplate = getDeleteTaskTemplate(status, taskID);
  document.getElementById("confirmDeleteUserModal").innerHTML = deleteTaskTemplate;
}

/**
 * Generates a new task template object with the current input values and settings.
 *
 * @returns {Object|undefined} The new task object if inputs are valid, otherwise undefined.
 */
export function getNewTaskTemplate() {
  newTaskObject.id = "TASK" + Date.now();
  newTaskObject.title = document.getElementById("taskTitleInput").value;
  newTaskObject.description = document.getElementById("taskDescription").value;
  newTaskObject.dueDate = document.getElementById("taskDueDate").value;
  newTaskObject.creationDate = Date.now();
  newTaskObject.creatorId = "";
  newTaskObject.priority = currentPrio;
  newTaskObject.category = document.getElementById("taskCategory").innerText;
  if (newTaskObject.category == "Technical task") newTaskObject.categoryColor = "#1fd7c1";
  if (newTaskObject.category == "User story") newTaskObject.categoryColor = "#0038ff";
  newTaskObject.progress = currentProgress;
  newTaskObject.status = currentStatus;
  getSelectedUsers();
  let newTask = newTaskObject;
  if (!validateNewTaskInputs()) return;
  clearAddTaskHTML();
  clearSelectedUsers();
  return newTask;
}

/**
 * Resets global variables to their default values.
 *
 * This function sets the following global variables to their default values:
 * - `currentPrio`: Set to "medium".
 * - `currentProgress`: Set to 0.
 * - `currentStatus`: Set to "todo".
 * - `newTaskObject`: Set to `emptyTaskTemplate`.
 */
export function setGlobalVariablesToDefault() {
  currentPrio = "medium";
  currentProgress = 0;
  currentStatus = "todo";
  newTaskObject = emptyTaskTemplate;
}

/**
 * Clears the input fields and resets the UI elements in the add task form.
 *
 * This function performs the following actions:
 * - Clears the value of the task title input field.
 * - Hides the task title warning message.
 * - Resets the border color of the task title input field.
 * - Clears the value of the task description input field.
 * - Clears the current assignation list.
 * - Clears the value of the task due date input field.
 * - Hides the task due date warning message.
 * - Resets the border color of the task due date input field.
 * - Resets the task category text to the default value.
 * - Hides the task category warning message.
 * - Resets the border color of the category dropdown.
 * - Clears the subtask container.
 * - Calls the function to reset global variables to their default values.
 * - Calls the function to clear selected users.
 * - Closes the users dropdown list.
 */
export function clearAddTaskHTML() {
  document.getElementById("taskDescription").value = "";
  document.getElementById("currentAssignation").innerHTML = "";
  document.getElementById("subtaskContainer").innerHTML = "";
  clearCategory();
  clearTitle();
  clearDueDate();
  setGlobalVariablesToDefault();
  clearSelectedUsers();
  closeUsersDropdownList("assignedToDropdownArrow", "contactsToAssign");
}

function clearTitle() {
  document.getElementById("taskTitleInput").value = "";
  document.getElementById("taskTitleWarning").classList.add("d_none");
  document.getElementById("taskTitleInput").classList.remove("borderColorRed");
  document.getElementById("taskTitleInput").classList.add("borderColorGrey");
}

function clearDueDate() {
  document.getElementById("taskDueDate").value = "";
  document.getElementById("taskDateWarning").classList.add("d_none");
  document.getElementById("taskDueDate").classList.remove("borderColorRed");
  document.getElementById("taskDueDate").classList.add("borderColorGrey");
}

function clearCategory() {
  document.getElementById("taskCategory").innerText = "Select task category";
  document.getElementById("taskCategoryWarning").classList.add("d_none");
  document.getElementById("categoryDropdown").classList.remove("borderColorRed");
  document.getElementById("categoryDropdown").classList.add("borderColorGrey");
}

/**
 * Creates a new subtask object and adds it to the `newTaskObject.subtasks` collection.
 *
 * @param {string} subtaskText - The text description of the subtask.
 * @returns {string} The unique identifier of the newly created subtask.
 */
export function createSubtaskObject(subtaskText) {
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

/**
 * Selects the priority based on the clicked element and updates the UI accordingly.
 *
 * @param {Event} event - The event object from the click event.
 * @returns {void}
 */
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

/**
 * Removes priority classes from the priority elements.
 *
 * This function targets elements with IDs "prioUrgent", "prioMedium", and "prioLow",
 * and removes the classes "urgentPrio", "mediumPrio", and "lowPrio" from them respectively.
 */
export function removePrio() {
  document.getElementById("prioUrgent").classList.remove("urgentPrio");
  document.getElementById("prioMedium").classList.remove("mediumPrio");
  document.getElementById("prioLow").classList.remove("lowPrio");
}

/**
 * Updates the task category display and toggles the visibility of the category selection container.
 *
 * @param {string} selectedCategory - The category selected by the user.
 */
export function selectCategory(selectedCategory) {
  document.getElementById("taskCategory").innerText = selectedCategory;
  document.getElementById("categoryDropdownArrow").classList.toggle("rotatedArrow");
  document.getElementById("categorySelectionContainer").classList.toggle("d_none");
}

/**
 * Assigns selected users to the new task object.
 * Iterates over the `selectedUsers` array and assigns each user ID to the `assignedTo` property of `newTaskObject`.
 *
 * @function
 */
export function getSelectedUsers() {
  selectedUsers.forEach((userID) => {
    newTaskObject.assignedTo[userID] = userID;
  });
}

/**
 * Provides user feedback when a new task is added.
 *
 * This function displays feedback to the user when a new task is added.
 * It handles different behaviors based on the screen width and the current page.
 *
 * - If the screen width is less than 1400 pixels, it calls `taskFeedbackResponsive`
 *   and redirects to the board page after 2300 milliseconds if the current page is `addTask.html`.
 * - If the screen width is 1400 pixels or more, it calls `taskFeedbackDesktop` and hides the task modal
 *   if the current page is `board.html`. It also redirects to the board page after 2300 milliseconds
 *   if the current page is `addTask.html`.
 *
 * @function newTaskUserFeedback
 */
export function newTaskUserFeedback() {
  newTaskUserFeedbackRef.classList.remove("d_none");
  if (window.innerWidth < 1400) {
    taskFeedbackResponsive(newTaskUserFeedbackRef);
    if (window.location.pathname === "/addTask.html") {
      setTimeout(() => {
        window.location.href = "/board.html";
      }, 2300);
    }
  } else {
    if (window.location.pathname == "/board.html") {
      hideTaskModal();
    }
    taskFeedbackDesktop(newTaskUserFeedbackRef);
    if (window.location.pathname === "/addTask.html") {
      setTimeout(() => {
        window.location.href = "/board.html";
      }, 2300);
    }
  }
}

/**
 * Displays user feedback for editing a task.
 *
 * This function shows the user feedback element for editing a task by removing
 * the "d_none" class. It then adjusts the feedback display based on the window
 * width. If the window width is less than 1400 pixels, it calls
 * `taskFeedbackResponsive` to handle the feedback display for smaller screens.
 * Otherwise, it calls `taskFeedbackDesktop` for larger screens.
 */
export function editTaskUserFeedback() {
  editTaskUserFeedbackRef.classList.remove("d_none");
  if (window.innerWidth < 1400) {
    taskFeedbackResponsive(editTaskUserFeedbackRef);
  } else {
    taskFeedbackDesktop(editTaskUserFeedbackRef);
  }
}

/**
 * Adjusts the position and visibility of the feedback element in a responsive manner.
 *
 * @param {HTMLElement} feedbackRef - The reference to the feedback element.
 */
function taskFeedbackResponsive(feedbackRef) {
  setTimeout(() => {
    feedbackRef.style.left = "50%";
  }, 500);
  setTimeout(() => {
    feedbackRef.style.left = "150%";
  }, 1800);
  setTimeout(() => {
    feedbackRef.classList.add("d_none");
  }, 2800);
}

/**
 * Provides visual feedback on a desktop by animating the position of the feedback element.
 *
 * @param {HTMLElement} feedbackRef - The reference to the feedback element that will be animated.
 */
function taskFeedbackDesktop(feedbackRef) {
  setTimeout(() => {
    feedbackRef.style.left = "655px";
  }, 500);
  setTimeout(() => {
    feedbackRef.style.left = "100%";
  }, 1800);
  setTimeout(() => {
    feedbackRef.classList.add("d_none");
  }, 2800);
}
