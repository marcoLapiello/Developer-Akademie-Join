/**
 * @module "addTask.js"
 */

/**
 * Imports the following functions and variables from the userDropdown module:
 * - closeUsersDropdownList: Function to close the users dropdown list.
 * - selectedUsers: Variable that holds the list of selected users.
 * - clearSelectedUsers: Function to clear the list of selected users.
 */
import { closeUsersDropdownList, selectedUsers, clearSelectedUsers } from "../addTask/userDropdown.js";
/**
 * Imports the returnIcon function from the icons module.
 * The returnIcon function is used to retrieve an icon based on certain criteria.
 */
import { returnIcon } from "../icons.js";
/**
 * Imports the following functions from the taskTemplate module:
 * - getTaskTemplate: Function to retrieve the template for a task.
 * - getDeleteTaskTemplate: Function to retrieve the template for deleting a task.
 */
import { getTaskTemplate, getDeleteTaskTemplate } from "../addTask/taskTemplate.js";
/**
 * Imports the following references from the script module:
 * - newTaskUserFeedbackRef: Reference for user feedback related to creating a new task.
 * - editTaskUserFeedbackRef: Reference for user feedback related to editing an existing task.
 */
import { newTaskUserFeedbackRef, editTaskUserFeedbackRef } from "../../js/script.js";

/**
 * Exports the currentPrio variable with an initial value of "medium".
 * This variable represents the current priority level of a task.
 */
export let currentPrio = "medium";

/**
 * Declares the currentProgress variable with an initial value of 0.
 * This variable represents the current progress of a task.
 */
let currentProgress = 0;

/**
 * Declares the currentStatus variable with an initial value of "todo".
 * This variable represents the current status of a task.
 */
let currentStatus = "todo";

/**
 * Declares the emptyTaskTemplate object with default values.
 * This object serves as a template for creating new tasks.
 *
 * Properties:
 * - id: The unique identifier for the task.
 * - title: The title of the task.
 * - description: A detailed description of the task.
 * - assignedTo: An object containing information about the user assigned to the task.
 * - dueDate: The due date for the task.
 * - creationDate: The date the task was created.
 * - creatorId: The unique identifier of the task creator.
 * - priority: The priority level of the task.
 * - category: The category to which the task belongs.
 * - categoryColor: The color associated with the task category.
 * - progress: The current progress of the task.
 * - status: The current status of the task.
 * - subtasks: An object containing information about the subtasks of the task.
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
 * Exports the newTaskObject with default values.
 * This object serves as a template for creating new tasks.
 *
 * Properties:
 * - id: The unique identifier for the task.
 * - title: The title of the task.
 * - description: A detailed description of the task.
 * - assignedTo: An object containing information about the user assigned to the task.
 * - dueDate: The due date for the task.
 * - creationDate: The date the task was created.
 * - creatorId: The unique identifier of the task creator.
 * - priority: The priority level of the task.
 * - category: The category to which the task belongs.
 * - categoryColor: The color associated with the task category.
 * - progress: The current progress of the task.
 * - status: The current status of the task.
 * - subtasks: An object containing information about the subtasks of the task.
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
  if (newTaskObject.category == "Technical task") {
    newTaskObject.categoryColor = "#1fd7c1";
  }
  if (newTaskObject.category == "User story") {
    newTaskObject.categoryColor = "#0038ff";
  }
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
  document.getElementById("taskTitleInput").value = "";
  document.getElementById("taskTitleWarning").classList.add("d_none");
  document.getElementById("taskTitleInput").classList.remove("borderColorRed");
  document.getElementById("taskTitleInput").classList.add("borderColorGrey");
  document.getElementById("taskDescription").value = "";
  document.getElementById("currentAssignation").innerHTML = "";
  document.getElementById("taskDueDate").value = "";
  document.getElementById("taskDateWarning").classList.add("d_none");
  document.getElementById("taskDueDate").classList.remove("borderColorRed");
  document.getElementById("taskDueDate").classList.add("borderColorGrey");
  document.getElementById("taskCategory").innerText = "Select task category";
  document.getElementById("taskCategoryWarning").classList.add("d_none");
  document.getElementById("categoryDropdown").classList.remove("borderColorRed");
  document.getElementById("categoryDropdown").classList.add("borderColorGrey");
  document.getElementById("subtaskContainer").innerHTML = "";
  setGlobalVariablesToDefault();
  clearSelectedUsers();
  closeUsersDropdownList("assignedToDropdownArrow", "contactsToAssign");
}

/**
 * Creates a new subtask element based on the provided parameters.
 *
 * @param {string} card - The type of card operation, either "add" or "edit".
 * @param {string} inputID - The ID of the input element for the subtask.
 * @param {string} containerID - The ID of the container where the subtask element will be rendered.
 */
export function createNewSubtask(card, inputID, containerID) {
  if (card == "add" && document.getElementById("subtaskInput").value) {
    renderSubtaskElement(inputID, containerID);
    document.getElementById("subtaskInput").value = "";
  }
  if (card == "edit") {
  }
}

/**
 * Renders a subtask element and appends it to the specified container.
 *
 * @param {string} inputID - The ID of the input element containing the subtask text.
 * @param {string} containerID - The ID of the container element where the subtask will be appended.
 */
export function renderSubtaskElement(inputID, containerID) {
  let subtaskText = document.getElementById(inputID).value;
  let subtaskID = createSubtaskObject(subtaskText);
  let newSubtaskTemplate = getSubtaskTemplate(subtaskText, subtaskID);
  document.getElementById(containerID).insertAdjacentHTML("beforeend", newSubtaskTemplate);
}

/**
 * Creates a new subtask object and adds it to the `newTaskObject.subtasks` collection.
 *
 * @param {string} subtaskText - The text description of the subtask.
 * @returns {string} The unique identifier of the newly created subtask.
 */
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

/**
 * Generates the HTML template for a subtask element.
 *
 * @param {string} subtaskText - The text content of the subtask.
 * @param {string} subtaskID - The unique identifier for the subtask.
 * @returns {string} The HTML template string for the subtask element.
 */
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

/**
 * Edits a subtask by showing the input field for editing and hiding the current subtask text.
 *
 * @param {string} subtaskID - The unique identifier of the subtask to be edited.
 */
export function editSubtask(subtaskID) {
  document.getElementById(`editSubtaskInput-${subtaskID}`).value = document.getElementById(`currentSubtaskText-${subtaskID}`).innerText;
  document.getElementById(`currentSubtaskBox-${subtaskID}`).classList.add("d_none");
  document.getElementById(`editSubtaskBox-${subtaskID}`).classList.remove("d_none");
}

/**
 * Deletes a subtask from the task object and removes its corresponding HTML element.
 *
 * @param {string} subtaskID - The ID of the subtask to be deleted.
 * @param {string} card - The type of card, should be "add" to perform the deletion.
 */
export function deleteSubtask(subtaskID, card) {
  if (card == "add") {
    document.getElementById(`subtaskElementWrapper-${subtaskID}`).remove();
    delete newTaskObject.subtasks[subtaskID];
  }
}

/**
 * Saves the edited subtask if the input value is not empty. If the input value is empty, deletes the subtask.
 *
 * @param {number} subtaskID - The ID of the subtask being edited.
 * @param {string} card - The type of card, should be "add" to save the subtask.
 */
export function saveSubtaskEditing(subtaskID, card) {
  if (document.getElementById(`editSubtaskInput-${subtaskID}`).value) {
    if (card == "add") {
      document.getElementById(`currentSubtaskText-${subtaskID}`).innerText = document.getElementById(`editSubtaskInput-${subtaskID}`).value;
      newTaskObject.subtasks[subtaskID].task = document.getElementById(`editSubtaskInput-${subtaskID}`).value;
      document.getElementById(`currentSubtaskBox-${subtaskID}`).classList.remove("d_none");
      document.getElementById(`editSubtaskBox-${subtaskID}`).classList.add("d_none");
    } else {
      return;
    }
  } else {
    deleteSubtask(subtaskID, card);
    console.log("empty subtask deleted");
  }
}

/**
 * Adds a blue border color to the subtask input container.
 * This function selects the element with the ID "subtaskInputContainer"
 * and adds the "borderColorBlue" class to it.
 */
export function setHighlightSubtaskDivBorder() {
  document.getElementById("subtaskInputContainer").classList.add("borderColorBlue");
}

/**
 * Removes the highlight border from the subtask input container if the event target is not the subtask input.
 *
 * @param {Event} event - The event object triggered by the user interaction.
 */
export function removeHighlightSubtaskDivBorder(event) {
  if (event.target.id != "subtaskInput") {
    if (document.getElementById("subtaskInputContainer")) {
      document.getElementById("subtaskInputContainer").classList.remove("borderColorBlue");
    }
  }
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
 * Validates the inputs for creating a new task.
 *
 * This function checks the validity of the task title, date, and category inputs.
 * If any of these inputs are invalid, the function returns false. Otherwise, it returns true.
 *
 * @returns {boolean} - Returns true if all inputs are valid, otherwise false.
 */
export function validateNewTaskInputs() {
  let isTitleValid = validateTaskTitleInput();
  let isDateValid = validateTaskDateInput();
  let isCategoryValid = validateTaskCategoryInput();
  if (!isTitleValid || !isDateValid || !isCategoryValid) {
    return false;
  }
  return true;
}

/**
 * Validates the task title input field.
 *
 * This function checks the length of the value in the input field with the ID "taskTitleInput".
 * If the length is less than 3 characters, it displays a warning message and changes the input field's border color to red.
 * If the length is 3 characters or more, it hides the warning message and resets the input field's border color.
 *
 * @returns {boolean} - Returns `true` if the input value length is 3 or more characters, otherwise `false`.
 */
export function validateTaskTitleInput() {
  let title = document.getElementById("taskTitleInput").value;
  if (title.length < 3) {
    document.getElementById("taskTitleWarning").classList.remove("d_none");
    document.getElementById("taskTitleInput").classList.remove("borderColorGrey");
    document.getElementById("taskTitleInput").classList.add("borderColorRed");
    return false;
  }
  document.getElementById("taskTitleWarning").classList.add("d_none");
  document.getElementById("taskTitleInput").classList.remove("borderColorRed");
  return true;
}

/**
 * Validates the task due date input field.
 *
 * This function checks if the date entered in the "taskDueDate" input field is valid.
 * It compares the entered date with the current date and ensures that the entered date
 * is not in the past. If the date is invalid, it displays a warning message and changes
 * the input field's border color to red. If the date is valid, it hides the warning message
 * and resets the input field's border color.
 *
 * @returns {boolean} - Returns `true` if the date is valid, otherwise `false`.
 */
export function validateTaskDateInput() {
  let date = document.getElementById("taskDueDate").value;
  let dateToday = new Date(Date.now());
  let formattedDate = dateToday.toISOString().split("T")[0];
  if (!date || date < formattedDate) {
    document.getElementById("taskDateWarning").classList.remove("d_none");
    document.getElementById("taskDueDate").classList.remove("borderColorGrey");
    document.getElementById("taskDueDate").classList.add("borderColorRed");
    return false;
  }
  document.getElementById("taskDateWarning").classList.add("d_none");
  document.getElementById("taskDueDate").classList.remove("borderColorRed");
  return true;
}

/**
 * Validates the task category input by checking if the selected category is valid.
 * If the category is "Select task category", it displays a warning and changes the border color to red.
 * Otherwise, it hides the warning and resets the border color.
 *
 * @returns {boolean} - Returns `false` if the category is "Select task category", otherwise `true`.
 */
export function validateTaskCategoryInput() {
  let category = document.getElementById("taskCategory").innerHTML;
  if (category == "Select task category") {
    document.getElementById("taskCategoryWarning").classList.remove("d_none");
    document.getElementById("categoryDropdown").classList.remove("borderColorGrey");
    document.getElementById("categoryDropdown").classList.add("borderColorRed");
    return false;
  }
  document.getElementById("taskCategoryWarning").classList.add("d_none");
  document.getElementById("categoryDropdown").classList.remove("borderColorRed");
  return true;
}

/**
 * Validates the task title input field by checking the number of characters entered.
 * If the input length is greater than 2, it calls the `validateTaskTitleInput` function
 * and removes the "borderColorRed" class from the input field.
 */
export function validateTaskTitleByOninput() {
  let inputLettersCount = document.getElementById("taskTitleInput").value.length;
  if (inputLettersCount > 2) {
    validateTaskTitleInput();
    document.getElementById("taskTitleInput").classList.remove("borderColorRed");
  }
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
