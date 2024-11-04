/**
 * @module "script.js"
 */

/**
 * Imports functions for handling task templates.
 *
 * @module taskTemplate
 */
import * as taskTemplate from "../components/addTask/taskTemplate.js";

/**
 * Exposes the getTaskTemplate function to the global window object.
 */
window.getTaskTemplate = taskTemplate.getTaskTemplate;

/**
 * Imports functions for handling contact list operations.
 *
 * @module contactList
 */
import * as contactList from "../components/contactList/contactList.js";
contactList.renderContactList();

/**
 * Exposes functions to the global window object for activating and removing the active contact button.
 */
window.aktivNewContactButton = contactList.aktivNewContactButton;
window.removeAktivContactButton = contactList.removeAktivContactButton;

/**
 * Imports functions for handling contact details operations.
 *
 * @module contactDetails
 */
import * as contactDetails from "../components/contactDetails/contactDetails.js";
contactDetails.renderContactDetails();

/**
 * Exposes functions and variables to the global window object for rendering contact details, handling deletions, managing the selected user, and switching mobile views.
 */
window.renderContactDetails = contactDetails.renderContactDetails;
window.renderAfterDelete = contactDetails.renderAfterDelete;
window.selectedUser = contactDetails.selectedUser;
window.switchMobile = contactDetails.switchMobile;
window.userProfileButtonsMobile = contactDetails.userProfileButtonsMobile;

/**
 * Imports functions for handling task cards operations.
 *
 * @module taskCards
 */
import * as taskCards from "../components/taskCards/taskCards.js";
taskCards.renderTasks();

/**
 * Imports functions for handling task detail view operations.
 *
 * @module taskDetailView
 */
import * as taskDetailView from "../components/taskDetailView/taskDetailView.js";

/**
 * Exposes functions to the global window object for toggling the task detail view, handling checked subtasks, and rendering the task detail view.
 */
window.toggleTaskDetailView = taskDetailView.toggleTaskDetailView;
window.checkedSubtask = taskDetailView.checkedSubtask;
window.renderTaskDetailView = taskDetailView.renderTaskDetailView;

/**
 * Imports functions for handling task detail view editing.
 *
 * @module taskDetailViewEdit
 */
import * as taskDetailViewEdit from "../components/taskDetailViewEdit/taskDetailViewEdit.js";

/**
 * Exposes functions to the global window object for rendering the editable task detail view and retrieving edited task data.
 */
window.renderTaskDetailViewEdit = taskDetailViewEdit.renderTaskDetailViewEdit;
window.getEditTaskData = taskDetailViewEdit.getEditTaskData;

/**
 * Imports functions for handling sidebar operations.
 *
 * @module sidebar
 */
import * as sidebar from "../components/sidebar/sidebar.js";
sidebar.renderSidebar();

/**
 * Imports functions for handling header operations.
 *
 * @module header
 */
import * as header from "../components/header/header.js";
header.renderHeader();

/**
 * Exposes the openCloseUserMenu function to the global window object.
 */
window.openCloseUserMenu = header.openCloseUserMenu;

/**
 * Imports functions for handling tasks API services.
 *
 * @module tasksApiService
 */
import * as tasksApiService from "./tasksApiService.js";

/**
 * Exposes functions to the global window object for patching new tasks and deleting existing tasks.
 */
window.loadTasks = tasksApiService.loadTasks;
window.patchNewTask = tasksApiService.patchNewTask;
window.deleteExistungTask = tasksApiService.deleteExistungTask; // Unverändert

/**
 * Imports functions for handling user authentication and rendering login/signup templates.
 *
 * @module logIn
 */
import * as logIn from "../components/logIn/logIn.js";

/**
 * Exposes functions to the global window object for user authentication and rendering login/signup templates.
 */
window.signUpNewUser = logIn.signUpNewUser;
window.renderSignUpTemplate = logIn.renderSignUpTemplate;
window.goToSignUpPage = logIn.goToSignUpPage;
window.getNewUserData = logIn.getNewUserData;
window.enableSignUpButton = logIn.enableSignUpButton;
window.renderLogInTemplate = logIn.renderLogInTemplate;
window.initRenderLogInPage = logIn.initRenderLogInPage;
window.goToLogInPage = logIn.goToLogInPage;
window.logInRegistratedUser = logIn.logInRegistratedUser;
window.enableLogInButton = logIn.enableLogInButton;
window.doGuestLogIn = logIn.doGuestLogIn;
window.toggleRememberMe = logIn.toggleRememberMe;
window.getUserLogInDataFromLocalStorage = logIn.getUserLogInDataFromLocalStorage;

/**
 * Imports functions for handling user authentication and rendering login/signup templates.
 *
 * @module logInValidation
 */
import * as logInValidation from "../components/logIn/logInValidation.js";

/**
 * Exposes functions to the global window object for validation of log In.
 */
window.setBorderColorBlue = logInValidation.setBorderColorBlue;
window.setBorderColorGrey = logInValidation.setBorderColorGrey;
window.removeValidationWarning = logInValidation.removeValidationWarning;

/**
 * Imports functions for handling tasks and subtasks.
 *
 * @module addTask
 */
import * as addTask from "../components/addTask/addTask.js";

/**
 * Exposes functions to the global window object for handling tasks and subtasks.
 */
window.getNewTaskTemplate = addTask.getNewTaskTemplate;
window.selectPrio = addTask.selectPrio;
window.selectCategory = addTask.selectCategory;
window.renderTaskTemplate = addTask.renderTaskTemplate;
window.renderDeleteTaskTemplate = addTask.renderDeleteTaskTemplate;
window.openTaskModal = addTask.openTaskModal;
window.hideTaskModal = addTask.hideTaskModal;
window.hideTaskModalFromBG = addTask.hideTaskModalFromBG;
window.clearAddTaskHTML = addTask.clearAddTaskHTML;
window.getHashParameter = addTask.getHashParameter;
window.newTaskUserFeedback = addTask.newTaskUserFeedback;
window.editTaskUserFeedback = addTask.editTaskUserFeedback;

/**
 * Imports functions for handling to validate input fields of the add Task component.
 *
 * @module addTaskValidation
 */
import * as addTaskValidation from "../components/addTask/addTaskValidation.js";

/**
 * Exposes functions to the global window to validate input fields of the add Task component.
 */
window.validateNewTaskInputs = addTaskValidation.validateNewTaskInputs;
window.validateTaskTitleInput = addTaskValidation.validateTaskTitleInput;
window.validateTaskDateInput = addTaskValidation.validateTaskDateInput;
window.validateTaskCategoryInput = addTaskValidation.validateTaskCategoryInput;
window.validateTaskTitleByOninput = addTaskValidation.validateTaskTitleByOninput;

/**
 * Imports functions for handling to create and edit subtasks.
 *
 * @module addTaskSubtasks
 */
import * as addTaskSubtasks from "../components/addTask/addTaskSubtasks.js";

/**
 * Exposes functions to the global window to create and edit subtasks.
 */
window.createNewSubtask = addTaskSubtasks.createNewSubtask;
window.renderSubtaskElement = addTaskSubtasks.renderSubtaskElement;
window.editSubtask = addTaskSubtasks.editSubtask;
window.deleteSubtask = addTaskSubtasks.deleteSubtask;
window.saveSubtaskEditing = addTaskSubtasks.saveSubtaskEditing;
window.setHighlightSubtaskDivBorder = addTaskSubtasks.setHighlightSubtaskDivBorder;
window.removeHighlightSubtaskDivBorder = addTaskSubtasks.removeHighlightSubtaskDivBorder;

/**
 * Imports functions for handling task detail view editing.
 *
 * @module editTask
 */
import * as editTask from "../components/taskDetailViewEdit/editTask.js";

/**
 * Exposes the updateProgress function to the global window object.
 */
window.updateProgress = editTask.updateProgress;

/**
 * Imports functions for handling API services.
 *
 * @module apiService
 */
import * as apiService from "../js/apiService.js";

/**
 * Exposes functions to the global window object for handling contacts.
 */
window.addContact = apiService.addContact;
window.deleteChosenUser = apiService.deleteChosenUser;
window.deletUserFromTasks = apiService.deletUserFromTasks;

/**
 * Imports functions for handling board operations.
 *
 * @module board
 */
import * as board from "../components/board/board.js";
board.renderBoardHeadTemplate();

/**
 * Exposes the getFilteredTasksArray function to the global window object.
 */
window.getFilteredTasksArray = board.getFilteredTasksArray;

/**
 * Imports functions for handling the user dropdown list in the add task component.
 *
 * @module userDropdown
 */
import * as userDropdown from "../components/addTask/userDropdown.js";

/**
 * Exposes functions to the global window object for handling the user dropdown list.
 */
window.renderUserDropdownList = userDropdown.renderUserDropdownList;
window.openCloseDropdown = userDropdown.openCloseDropdown;
window.selectUser = userDropdown.selectUser;
window.openUsersDropdownList = userDropdown.openUsersDropdownList;
window.closeUsersDropdownList = userDropdown.closeUsersDropdownList;
window.closeDropdownFromWindow = userDropdown.closeDropdownFromWindow;
window.filterUsersByName = userDropdown.filterUsersByName;
window.removeUsersSearchFieldValue = userDropdown.removeUsersSearchFieldValue;
window.openUserDropdownFromUserInput = userDropdown.openUserDropdownFromUserInput;

/**
 * Imports functions for handling user dialogs and validation in the contact modal.
 *
 * @module contactModal
 */
import * as contactModal from "../components/contactModal/contactModal.js";

/**
 * Exposes functions to the global window object for handling user dialogs and validation in the contact modal.
 */
window.showAddNewUserDialog = contactModal.showAddNewUserDialog;
window.hideAddNewUserDialog = contactModal.hideAddNewUserDialog;
window.showEditChosenUserDialog = contactModal.showEditChosenUserDialog;
window.hideEditChosenUserDialog = contactModal.hideEditChosenUserDialog;
window.showConfirmDeleteUserDialog = contactModal.showConfirmDeleteUserDialog;
window.hideConfirmDeleteUserDialog = contactModal.hideConfirmDeleteUserDialog;
window.hideConfirmDeleteUserDialogFromBG = contactModal.hideConfirmDeleteUserDialogFromBG;
window.hideAddNewUserDialogFromBG = contactModal.hideAddNewUserDialogFromBG;
window.hideEditChosenUserDialogFromBG = contactModal.hideEditChosenUserDialogFromBG;

/**
 * Imports functions for handling user dialogs and validation in the contact modal.
 *
 * @module contactModalValidation
 */
import * as contactModalValidation from "../components/contactModal/contactModalValidation.js";

/**
 * Exposes functions to the global window object for handling user dialogs and validation in the contact modal.
 */
window.validateNewPhonenumber = contactModalValidation.validateNewPhonenumber;
window.validateEditPhonenumber = contactModalValidation.validateEditPhonenumber;

/**
 * Imports functions for handling summary operations.
 *
 * @module summary
 */
import * as summary from "../components/summary/summary.js";

/**
 * Exposes functions to the global window object for initializing the summary component and redirecting to the board.
 */
window.initSummary = summary.initSummary;
window.redirectToBoard = summary.redirectToBoard;

/**
 * Asynchronously retrieves an array of users.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of users.
 */
export async function getUsersArray() {
  let usersArray = await apiService.loadUsers();
  return usersArray;
}
getUsersArray();

/**
 * Asynchronously retrieves an array of tasks.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of tasks.
 */
export async function getTasksArray() {
  let tasksArray = await tasksApiService.loadTasks();
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
