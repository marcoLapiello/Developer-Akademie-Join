/**
 * @module "script.js"
 */

/**
 * Imports the function to retrieve a task template.
 *
 * @module taskTemplate
 * @function getTaskTemplate - Retrieves the template for a task.
 */
import { getTaskTemplate } from "../components/addTask/taskTemplate.js";

/**
 * Exposes the getTaskTemplate function to the global window object.
 *
 * @function getTaskTemplate - Retrieves the template for a task.
 */
window.getTaskTemplate = getTaskTemplate;

/**
 * Imports functions and variables for rendering the contact list and managing contact buttons.
 *
 * @module contactList
 * @function renderContactList - Renders the contact list on the user interface.
 * @function aktivNewContactButton - Activates the new contact button.
 * @function removeAktivContactButton - Removes the active contact button.
 */
import { renderContactList, aktivNewContactButton, removeAktivContactButton } from "../components/contactList/contactList.js";
renderContactList();

/**
 * Exposes the aktivNewContactButton and removeAktivContactButton functions to the global window object.
 *
 * @function aktivNewContactButton - Activates the new contact button.
 * @function removeAktivContactButton - Removes the active contact button.
 */
window.aktivNewContactButton = aktivNewContactButton;
window.removeAktivContactButton = removeAktivContactButton;

/**
 * Imports functions and variables for rendering contact details, handling deletions, managing the selected user, and switching mobile views.
 *
 * @module contactDetails
 * @function renderContactDetails - Renders the details of a contact.
 * @function renderAfterDelete - Renders the view after a contact is deleted.
 * @variable selectedUser - The currently selected user.
 * @function switchMobile - Switches the view to mobile mode.
 * @variable userProfileButtonsMobile - Buttons for user profile actions in mobile view.
 */
import { renderContactDetails, renderAfterDelete, selectedUser, switchMobile, userProfileButtonsMobile } from "../components/contactDetails/contactDetails.js";
renderContactDetails();

/**
 * Exposes functions and variables to the global window object for rendering contact details, handling deletions, managing the selected user, and switching mobile views.
 *
 * @function renderContactDetails - Renders the details of a contact.
 * @function renderAfterDelete - Renders the view after a contact is deleted.
 * @variable selectedUser - The currently selected user.
 * @function switchMobile - Switches the view to mobile mode.
 * @variable userProfileButtonsMobile - Buttons for user profile actions in mobile view.
 */
window.renderContactDetails = renderContactDetails;
window.renderAfterDelete = renderAfterDelete;
window.selectedUser = selectedUser;
window.switchMobile = switchMobile;
window.userProfileButtonsMobile = userProfileButtonsMobile;

/**
 * Imports the function to render tasks.
 *
 * @module taskCards
 * @function renderTasks - Renders the tasks on the user interface.
 */
import { renderTasks } from "../components/taskCards/taskCards.js";
renderTasks();

/**
 * Imports functions for rendering and toggling the task detail view, and for handling checked subtasks.
 *
 * @module taskDetailView
 * @function renderTaskDetailView - Renders the detailed view of a task.
 * @function toggleTaskDetailView - Toggles the visibility of the task detail view.
 * @function checkedSubtask - Handles the state of a checked subtask.
 */
import { renderTaskDetailView, toggleTaskDetailView, checkedSubtask } from "../components/taskDetailView/taskDetailView.js";

/**
 * Exposes functions to the global window object for toggling the task detail view, handling checked subtasks, and rendering the task detail view.
 *
 * @function toggleTaskDetailView - Toggles the visibility of the task detail view.
 * @function checkedSubtask - Handles the state of a checked subtask.
 * @function renderTaskDetailView - Renders the detailed view of a task.
 */
window.toggleTaskDetailView = toggleTaskDetailView;
window.checkedSubtask = checkedSubtask;
window.renderTaskDetailView = renderTaskDetailView;

/**
 * Imports functions for rendering the editable task detail view and retrieving edited task data.
 *
 * @module taskDetailViewEdit
 * @function renderTaskDetailViewEdit - Renders the editable view of a task.
 * @function getEditTaskData - Retrieves the data of an edited task.
 */
import { renderTaskDetailViewEdit, getEditTaskData } from "../components/taskDetailViewEdit/taskDetailViewEdit.js";

/**
 * Exposes functions to the global window object for rendering the editable task detail view and retrieving edited task data.
 *
 * @function renderTaskDetailViewEdit - Renders the editable view of a task.
 * @function getEditTaskData - Retrieves the data of an edited task.
 */
window.renderTaskDetailViewEdit = renderTaskDetailViewEdit;
window.getEditTaskData = getEditTaskData;

/**
 * Imports the function to render the sidebar.
 *
 * @module sidebar
 * @function renderSidebar - Renders the sidebar on the user interface.
 */
import { renderSidebar } from "../components/sidebar/sidebar.js";
renderSidebar();

/**
 * Imports functions for toggling the display and rendering the header.
 *
 * @module header
 * @function toggle_d_None - Toggles the display property of an element.
 * @function renderHeader - Renders the header on the user interface.
 */
import { openCloseUserMenu, renderHeader } from "../components/header/header.js";
renderHeader();

/**
 * Exposes the toggle_d_None function to the global window object.
 *
 * @function toggle_d_None - Toggles the display property of an element.
 */
window.openCloseUserMenu = openCloseUserMenu;

/**
 * Imports the function to render the board head template.
 *
 * @module board
 * @function renderBoardHeadTemplate - Renders the head template of the board.
 */
import { renderBoardHeadTemplate } from "../components/board/board.js";
renderBoardHeadTemplate();

/**
 * Imports functions for loading tasks, patching new tasks, and deleting existing tasks.
 *
 * @module tasksApiService
 * @function loadTasks - Loads tasks from the API.
 * @function patchNewTask - Patches a new task to the API.
 * @function deleteExistungTask - Deletes an existing task from the API.
 */
import { loadTasks, patchNewTask, deleteExistungTask } from "./tasksApiService.js";

/**
 * Exposes functions to the global window object for patching new tasks and deleting existing tasks.
 *
 * @function patchNewTask - Patches a new task to the API.
 * @function deleteExistungTask - Deletes an existing task from the API.
 */
window.patchNewTask = patchNewTask;
window.deleteExistungTask = deleteExistungTask;

/**
 * Imports functions for handling user authentication and rendering login/signup templates.
 *
 * @module logIn
 * @function signUpNewUser - Signs up a new user.
 * @function renderLogInTemplate - Renders the login template.
 * @function renderSignUpTemplate - Renders the signup template.
 * @function initRenderLogInPage - Initializes and renders the login page.
 * @function goToSignUpPage - Navigates to the signup page.
 * @function goToLogInPage - Navigates to the login page.
 * @function doGuestLogIn - Logs in as a guest user.
 * @function logInRegistratedUser - Logs in a registered user.
 * @function toggleRememberMe - Toggles the "remember me" option.
 * @function getUserLogInDataFromLocalStorage - Retrieves user login data from local storage.
 * @function getNewUserData - Retrieves new user data.
 */
import {
  signUpNewUser,
  renderLogInTemplate,
  renderSignUpTemplate,
  initRenderLogInPage,
  goToSignUpPage,
  goToLogInPage,
  doGuestLogIn,
  logInRegistratedUser,
  toggleRememberMe,
  getUserLogInDataFromLocalStorage,
  getNewUserData,
  enableLogInButton,
  enableSignUpButton,
  setBorderColorBlue,
  setBorderColorGrey,
  removeValidationWarning,
} from "../components/logIn/logIn.js";

/**
 * Exposes functions to the global window object for user authentication and rendering login/signup templates.
 *
 * @function signUpNewUser - Signs up a new user.
 * @function renderLogInTemplate - Renders the login template.
 * @function renderSignUpTemplate - Renders the signup template.
 * @function initRenderLogInPage - Initializes and renders the login page.
 * @function goToSignUpPage - Navigates to the signup page.
 * @function goToLogInPage - Navigates to the login page.
 * @function doGuestLogIn - Logs in as a guest user.
 * @function logInRegistratedUser - Logs in a registered user.
 * @function toggleRememberMe - Toggles the "remember me" option.
 * @function getUserLogInDataFromLocalStorage - Retrieves user login data from local storage.
 * @function getNewUserData - Retrieves new user data.
 * @function enableLogInButton - Enables Log In Button after entering email and password
 * @function enableSignUpButton - Enables Sign Up Button after entering all input fields
 * @function setBorderColorBlue -
 * @function setBorderColorGrey -
 * @function removeValidationWarning -
 */
window.signUpNewUser = signUpNewUser;
window.renderLogInTemplate = renderLogInTemplate;
window.renderSignUpTemplate = renderSignUpTemplate;
window.initRenderLogInPage = initRenderLogInPage;
window.goToSignUpPage = goToSignUpPage;
window.goToLogInPage = goToLogInPage;
window.doGuestLogIn = doGuestLogIn;
window.logInRegistratedUser = logInRegistratedUser;
window.toggleRememberMe = toggleRememberMe;
window.getUserLogInDataFromLocalStorage = getUserLogInDataFromLocalStorage;
window.getNewUserData = getNewUserData;
window.enableLogInButton = enableLogInButton;
window.enableSignUpButton = enableSignUpButton;
window.setBorderColorBlue = setBorderColorBlue;
window.setBorderColorGrey = setBorderColorGrey;
window.removeValidationWarning = removeValidationWarning;

/**
 * Imports various functions for handling tasks and subtasks.
 *
 * @module addTask
 * @function getNewTaskTemplate - Retrieves the template for creating a new task.
 * @function selectPrio - Selects the priority of a task.
 * @function createNewSubtask - Creates a new subtask.
 * @function selectCategory - Selects the category of a task.
 * @function renderSubtaskElement - Renders a subtask element.
 * @function editSubtask - Edits a subtask.
 * @function deleteSubtask - Deletes a subtask.
 * @function saveSubtaskEditing - Saves the editing of a subtask.
 * @function clearAddTaskHTML - Clears the HTML for adding a task.
 * @function validateNewTaskInputs - Validates the inputs for a new task.
 * @function renderTaskTemplate - Renders the task template.
 * @function openTaskModal - Opens the task modal.
 * @function validateTaskTitleInput - Validates the task title input.
 * @function validateTaskDateInput - Validates the task date input.
 * @function validateTaskCategoryInput - Validates the task category input.
 * @function validateTaskTitleByOninput - Validates the task title input on input.
 * @function hideTaskModal - Hides the task modal.
 * @function hideTaskModalFromBG - Hides the task modal from the background.
 * @function setHighlightSubtaskDivBorder - Sets the highlight border for the subtask div.
 * @function removeHighlightSubtaskDivBorder - Removes the highlight border for the subtask div.
 * @function renderDeleteTaskTemplate - Renders the template for deleting a task.
 * @function getHashParameter - Retrieves a hash parameter.
 * @function newTaskUserFeedback - Provides feedback for a new task.
 * @function editTaskUserFeedback - Provides feedback for an edited task.
 */
import {
  getNewTaskTemplate,
  selectPrio,
  createNewSubtask,
  selectCategory,
  renderSubtaskElement,
  editSubtask,
  deleteSubtask,
  saveSubtaskEditing,
  clearAddTaskHTML,
  validateNewTaskInputs,
  renderTaskTemplate,
  openTaskModal,
  validateTaskTitleInput,
  validateTaskDateInput,
  validateTaskCategoryInput,
  validateTaskTitleByOninput,
  hideTaskModal,
  hideTaskModalFromBG,
  setHighlightSubtaskDivBorder,
  removeHighlightSubtaskDivBorder,
  renderDeleteTaskTemplate,
  getHashParameter,
  newTaskUserFeedback,
  editTaskUserFeedback,
} from "../components/addTask/addTask.js";

/**
 * Exposes functions to the global window object for handling tasks and subtasks.
 *
 * @function getNewTaskTemplate - Retrieves the template for creating a new task.
 * @function selectPrio - Selects the priority of a task.
 * @function createNewSubtask - Creates a new subtask.
 * @function selectCategory - Selects the category of a task.
 * @function renderSubtaskElement - Renders a subtask element.
 * @function editSubtask - Edits a subtask.
 * @function deleteSubtask - Deletes a subtask.
 * @function saveSubtaskEditing - Saves the editing of a subtask.
 * @function clearAddTaskHTML - Clears the HTML for adding a task.
 * @function validateNewTaskInputs - Validates the inputs for a new task.
 * @function renderTaskTemplate - Renders the task template.
 * @function openTaskModal - Opens the task modal.
 * @function validateTaskTitleInput - Validates the task title input.
 * @function validateTaskDateInput - Validates the task date input.
 * @function validateTaskCategoryInput - Validates the task category input.
 * @function validateTaskTitleByOninput - Validates the task title input on input.
 * @function hideTaskModal - Hides the task modal.
 * @function hideTaskModalFromBG - Hides the task modal from the background.
 * @function setHighlightSubtaskDivBorder - Sets the highlight border for the subtask div.
 * @function removeHighlightSubtaskDivBorder - Removes the highlight border for the subtask div.
 * @function renderDeleteTaskTemplate - Renders the template for deleting a task.
 * @function getHashParameter - Retrieves a hash parameter.
 * @function newTaskUserFeedback - Provides feedback for a new task.
 * @function editTaskUserFeedback - Provides feedback for an edited task.
 */
window.getNewTaskTemplate = getNewTaskTemplate;
window.selectPrio = selectPrio;
window.createNewSubtask = createNewSubtask;
window.selectCategory = selectCategory;
window.renderSubtaskElement = renderSubtaskElement;
window.editSubtask = editSubtask;
window.deleteSubtask = deleteSubtask;
window.saveSubtaskEditing = saveSubtaskEditing;
window.clearAddTaskHTML = clearAddTaskHTML;
window.validateNewTaskInputs = validateNewTaskInputs;
window.renderTaskTemplate = renderTaskTemplate;
window.openTaskModal = openTaskModal;
window.validateTaskTitleInput = validateTaskTitleInput;
window.validateTaskDateInput = validateTaskDateInput;
window.validateTaskCategoryInput = validateTaskCategoryInput;
window.validateTaskTitleByOninput = validateTaskTitleByOninput;
window.hideTaskModal = hideTaskModal;
window.hideTaskModalFromBG = hideTaskModalFromBG;
window.setHighlightSubtaskDivBorder = setHighlightSubtaskDivBorder;
window.removeHighlightSubtaskDivBorder = removeHighlightSubtaskDivBorder;
window.renderDeleteTaskTemplate = renderDeleteTaskTemplate;
window.getHashParameter = getHashParameter;
window.newTaskUserFeedback = newTaskUserFeedback;
window.editTaskUserFeedback = editTaskUserFeedback;

/**
 * Imports the function to update the progress of a task.
 *
 * @module editTask
 * @function updateProgress - Updates the progress of a task in the task detail view.
 */
import { updateProgress } from "../components/taskDetailViewEdit/editTask.js";

/**
 * Exposes the updateProgress function to the global window object.
 *
 * @function updateProgress - Updates the progress of a task in the task detail view.
 */
window.updateProgress = updateProgress;

/**
 * Imports functions for adding a contact, deleting a chosen user, and loading users.
 *
 * @module apiService
 * @function addContact - Adds a new contact.
 * @function deleteChosenUser - Deletes the chosen user.
 * @function loadUsers - Loads the users.
 */
import { addContact, deleteChosenUser, loadUsers } from "../js/apiService.js";

/**
 * Exposes functions to the global window object for adding a contact and deleting a chosen user.
 *
 * @function addContact - Adds a new contact.
 * @function deleteChosenUser - Deletes the chosen user.
 */
window.addContact = addContact;
window.deleteChosenUser = deleteChosenUser;

/**
 * Imports the function to retrieve a filtered array of tasks.
 *
 * @module board
 * @function getFilteredTasksArray - Retrieves a filtered array of tasks based on certain criteria.
 */
import { getFilteredTasksArray } from "../components/board/board.js";

/**
 * Exposes the getFilteredTasksArray function to the global window object.
 *
 * @function getFilteredTasksArray - Retrieves a filtered array of tasks based on certain criteria.
 */
window.getFilteredTasksArray = getFilteredTasksArray;

/**
 * Imports functions for handling the user dropdown list in the add task component.
 *
 * @module userDropdown
 * @function renderUserDropdownList - Renders the user dropdown list.
 * @function openCloseDropdown - Opens or closes the dropdown list.
 * @function selectUser - Selects a user from the dropdown list.
 * @function openUsersDropdownList - Opens the users dropdown list.
 * @function closeUsersDropdownList - Closes the users dropdown list.
 * @function closeDropdownFromWindow - Closes the dropdown list from the window.
 * @function filterUsersByName - Filters users by name in the dropdown list.
 * @function removeUsersSearchFieldValue - Removes the search field value in the dropdown list.
 * @function openUserDropdownFromUserInput - Opens the user dropdown from user input.
 */
import {
  renderUserDropdownList,
  openCloseDropdown,
  selectUser,
  openUsersDropdownList,
  closeUsersDropdownList,
  closeDropdownFromWindow,
  filterUsersByName,
  removeUsersSearchFieldValue,
  openUserDropdownFromUserInput,
} from "../components/addTask/userDropdown.js";

/**
 * Exposes functions to the global window object for handling the user dropdown list in the add task component.
 *
 * @function renderUserDropdownList - Renders the user dropdown list.
 * @function openCloseDropdown - Opens or closes the dropdown list.
 * @function selectUser - Selects a user from the dropdown list.
 * @function openUsersDropdownList - Opens the users dropdown list.
 * @function closeUsersDropdownList - Closes the users dropdown list.
 * @function closeDropdownFromWindow - Closes the dropdown list from the window.
 * @function filterUsersByName - Filters users by name in the dropdown list.
 * @function removeUsersSearchFieldValue - Removes the search field value in the dropdown list.
 * @function openUserDropdownFromUserInput - Opens the user dropdown from user input.
 */
window.renderUserDropdownList = renderUserDropdownList;
window.openCloseDropdown = openCloseDropdown;
window.selectUser = selectUser;
window.openUsersDropdownList = openUsersDropdownList;
window.closeUsersDropdownList = closeUsersDropdownList;
window.closeDropdownFromWindow = closeDropdownFromWindow;
window.filterUsersByName = filterUsersByName;
window.removeUsersSearchFieldValue = removeUsersSearchFieldValue;
window.openUserDropdownFromUserInput = openUserDropdownFromUserInput;

/**
 * Imports functions for handling user dialogs and validation in the contact modal.
 *
 * @module contactModal
 * @function showAddNewUserDialog - Shows the dialog for adding a new user.
 * @function hideAddNewUserDialog - Hides the dialog for adding a new user.
 * @function showEditChosenUserDialog - Shows the dialog for editing the chosen user.
 * @function hideEditChosenUserDialog - Hides the dialog for editing the chosen user.
 * @function hideConfirmDeleteUserDialog - Hides the dialog for confirming user deletion.
 * @function showConfirmDeleteUserDialog - Shows the dialog for confirming user deletion.
 * @function validateNewPhonenumber - Validates the phone number for a new user.
 * @function validateEditPhonenumber - Validates the phone number for an edited user.
 * @function hideAddNewUserDialogFromBG - Hides the add new user dialog from the background.
 * @function hideConfirmDeleteUserDialogFromBG - Hides the confirm delete user dialog from the background.
 * @function hideEditChosenUserDialogFromBG - Hides the edit chosen user dialog from the background.
 */
import {
  showAddNewUserDialog,
  hideAddNewUserDialog,
  showEditChosenUserDialog,
  hideEditChosenUserDialog,
  hideConfirmDeleteUserDialog,
  showConfirmDeleteUserDialog,
  validateNewPhonenumber,
  validateEditPhonenumber,
  hideAddNewUserDialogFromBG,
  hideConfirmDeleteUserDialogFromBG,
  hideEditChosenUserDialogFromBG,
} from "../components/contactModal/contactModal.js";

/**
 * Exposes functions to the global window object for handling user dialogs and validation in the contact modal.
 *
 * @function showAddNewUserDialog - Shows the dialog for adding a new user.
 * @function hideAddNewUserDialog - Hides the dialog for adding a new user.
 * @function showEditChosenUserDialog - Shows the dialog for editing the chosen user.
 * @function hideEditChosenUserDialog - Hides the dialog for editing the chosen user.
 * @function hideConfirmDeleteUserDialog - Hides the dialog for confirming user deletion.
 * @function showConfirmDeleteUserDialog - Shows the dialog for confirming user deletion.
 * @function validateNewPhonenumber - Validates the phone number for a new user.
 * @function validateEditPhonenumber - Validates the phone number for an edited user.
 * @function hideAddNewUserDialogFromBG - Hides the add new user dialog from the background.
 * @function hideConfirmDeleteUserDialogFromBG - Hides the confirm delete user dialog from the background.
 * @function hideEditChosenUserDialogFromBG - Hides the edit chosen user dialog from the background.
 */
window.showAddNewUserDialog = showAddNewUserDialog;
window.hideAddNewUserDialog = hideAddNewUserDialog;
window.showEditChosenUserDialog = showEditChosenUserDialog;
window.hideEditChosenUserDialog = hideEditChosenUserDialog;
window.hideConfirmDeleteUserDialog = hideConfirmDeleteUserDialog;
window.showConfirmDeleteUserDialog = showConfirmDeleteUserDialog;
window.validateNewPhonenumber = validateNewPhonenumber;
window.validateEditPhonenumber = validateEditPhonenumber;
window.hideAddNewUserDialogFromBG = hideAddNewUserDialogFromBG;
window.hideConfirmDeleteUserDialogFromBG = hideConfirmDeleteUserDialogFromBG;
window.hideEditChosenUserDialogFromBG = hideEditChosenUserDialogFromBG;

/**
 * Imports the function to initialize the summary component.
 *
 * @module summary
 * @function initSummary - Initializes the summary component.
 */
import { initSummary, redirectToBoard } from "../components/summary/summary.js";

/**
 * Exposes the initSummary function to the global window object.
 *
 * @function initSummary - Initializes the summary component.
 */
window.initSummary = initSummary;
window.redirectToBoard = redirectToBoard;

/**
 * References to various DOM elements used in the script.
 *
 * @constant {HTMLElement} addContactNameInputRef - Reference to the input element for adding a contact's name.
 * @constant {HTMLElement} addContactEmailInputRef - Reference to the input element for adding a contact's email.
 * @constant {HTMLElement} addContactPhoneInputRef - Reference to the input element for adding a contact's phone number.
 * @constant {HTMLElement} editContactNameInputRef - Reference to the input element for editing a contact's name.
 * @constant {HTMLElement} editContactEmailInputRef - Reference to the input element for editing a contact's email.
 * @constant {HTMLElement} editContactPhoneInputRef - Reference to the input element for editing a contact's phone number.
 * @constant {HTMLElement} editNewUserLogoRef - Reference to the element for editing a new user's logo.
 * @constant {HTMLElement} saveEditedUserButtonRef - Reference to the button for saving an edited user.
 * @constant {HTMLElement} deleteChosenUserBtnRef - Reference to the button for deleting the chosen user.
 * @constant {HTMLElement} addedUserFeedbackRef - Reference to the element for displaying feedback after adding a user.
 * @constant {HTMLElement} editUserFeedbackRef - Reference to the element for displaying feedback after editing a user.
 * @constant {HTMLElement} confirmDeleteUserModalRef - Reference to the modal for confirming user deletion.
 * @constant {HTMLElement} sureToDeleteContactBtnRef - Reference to the button for confirming contact deletion.
 * @constant {HTMLElement} newTaskUserFeedbackRef - Reference to the element for displaying feedback for a new task.
 * @constant {HTMLElement} editTaskUserFeedbackRef - Reference to the element for displaying feedback for an edited task.
 * @constant {HTMLElement} contactModalRef - Reference to the contact modal element.
 * @constant {HTMLElement} addNameWarningRef - Reference to the element for displaying a warning when adding a name.
 * @constant {HTMLElement} addEmailWarningRef - Reference to the element for displaying a warning when adding an email.
 * @constant {HTMLElement} addPhoneWarningRef - Reference to the element for displaying a warning when adding a phone number.
 * @constant {HTMLElement} editNameWarningRef - Reference to the element for displaying a warning when editing a name.
 * @constant {HTMLElement} editEmailWarningRef - Reference to the element for displaying a warning when editing an email.
 * @constant {HTMLElement} editPhoneWarningRef - Reference to the element for displaying a warning when editing a phone number.
 */
export let addContactNameInputRef = document.getElementById("addContactNameInput");
export let addContactEmailInputRef = document.getElementById("addContactEmailInput");
export let addContactPhoneInputRef = document.getElementById("addContactPhoneInput");
export let editContactNameInputRef = document.getElementById("editContactNameInput");
export let editContactEmailInputRef = document.getElementById("editContactEmailInput");
export let editContactPhoneInputRef = document.getElementById("editContactPhoneInput");
export let editNewUserLogoRef = document.getElementById("editNewUserLogo");
export let saveEditedUserButtonRef = document.getElementById("saveEditedUserButton");
export let deleteChosenUserBtnRef = document.getElementById("deleteChosenUserBtn");
export let addedUserFeedbackRef = document.getElementById("addedUserFeedback");
export let editUserFeedbackRef = document.getElementById("editUserFeedback");
export let confirmDeleteUserModalRef = document.getElementById("confirmDeleteUserModal");
export let sureToDeleteContactBtnRef = document.getElementById("sureToDeleteContactBtn");
export let newTaskUserFeedbackRef = document.getElementById("newTaskUserFeedback");
export let editTaskUserFeedbackRef = document.getElementById("editTaskUserFeedback");
export let contactModalRef = document.getElementById("contactModal");
export let addNameWarningRef = document.getElementById("addNameWarning");
export let addEmailWarningRef = document.getElementById("addEmailWarning");
export let addPhoneWarningRef = document.getElementById("addPhoneWarning");
export let editNameWarningRef = document.getElementById("editNameWarning");
export let editEmailWarningRef = document.getElementById("editEmailWarning");
export let editPhoneWarningRef = document.getElementById("editPhoneWarning");

/**
 * Asynchronously retrieves an array of users.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of users.
 */
export async function getUsersArray() {
  let usersArray = await loadUsers();
  return usersArray;
}
getUsersArray();

/**
 * Asynchronously retrieves an array of tasks.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of tasks.
 */
export async function getTasksArray() {
  let tasksArray = await loadTasks();
  return tasksArray;
}
getTasksArray();

/**
 * Checks if a user is logged in by retrieving the user ID from local storage.
 * If no user ID is found, redirects to the login page.
 *
 * @returns {number|null} The logged-in user ID if found, otherwise null.
 */
function isUserLoggedIn() {
  const loggedInUserIdJson = localStorage.getItem("loggedInUserId");
  const loggedInUserId = JSON.parse(loggedInUserIdJson);
  if (loggedInUserId === null) {
    window.location.href = "../index.html";
    // console.log("User is not logged in: Function isUserLoggedIn() temporary disabled");
  }
  return loggedInUserId;
}
window.isUserLoggedIn = isUserLoggedIn;

/**
 * Logs out the current user by removing their ID from local storage and redirecting to the index page.
 */
function userLogOut() {
  localStorage.removeItem("loggedInUserId");
  window.location.href = "../index.html";
}
window.userLogOut = userLogOut;

/**
 * Navigates the browser to the previous page in the session history.
 */
function backToLastSite() {
  window.history.back();
}
window.backToLastSite = backToLastSite;
