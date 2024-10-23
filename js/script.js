import { getTaskTemplate } from "../components/addTask/taskTemplate.js";
window.getTaskTemplate = getTaskTemplate;

import { renderContactList, aktivNewContactButton, removeAktivContactButton } from "../components/contactList/contactList.js";
renderContactList();
window.aktivNewContactButton = aktivNewContactButton;
window.removeAktivContactButton = removeAktivContactButton;

import { renderContactDetails, renderAfterDelete, selectedUser, switchMobile, userProfileButtonsMobile } from "../components/contactDetails/contactDetails.js";
renderContactDetails();
window.renderContactDetails = renderContactDetails;
window.renderAfterDelete = renderAfterDelete;
window.selectedUser = selectedUser;
window.switchMobile = switchMobile;
window.userProfileButtonsMobile = userProfileButtonsMobile;

import { renderTasks } from "../components/taskCards/taskCards.js";
renderTasks();

import { renderTaskDetailView, toggleTaskDetailView, checkedSubtask } from "../components/taskDetailView/taskDetailView.js";
window.toggleTaskDetailView = toggleTaskDetailView;
window.checkedSubtask = checkedSubtask;
window.renderTaskDetailView = renderTaskDetailView;

import { renderTaskDetailViewEdit, getEditTaskData } from "../components/taskDetailViewEdit/taskDetailViewEdit.js";
window.renderTaskDetailViewEdit = renderTaskDetailViewEdit;
window.getEditTaskData = getEditTaskData;

import { renderSidebar } from "../components/sidebar/sidebar.js";
renderSidebar();

import { toggle_d_None, renderHeader } from "../components/header/header.js";
window.toggle_d_None = toggle_d_None;
renderHeader();

import { renderBoardHeadTemplate } from "../components/board/board.js";
renderBoardHeadTemplate();

import { loadTasks, patchNewTask, deleteExistungTask } from "./tasksApiService.js";
window.patchNewTask = patchNewTask;
window.deleteExistungTask = deleteExistungTask;

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
} from "../components/addTask/addTask.js";
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

import { updateProgress } from "../components/taskDetailViewEdit/editTask.js";
window.updateProgress = updateProgress;

import { addContact, deleteChosenUser, loadUsers } from "../js/apiService.js";
window.addContact = addContact;
window.deleteChosenUser = deleteChosenUser;

import { getFilteredTasksArray } from "../components/board/board.js";
window.getFilteredTasksArray = getFilteredTasksArray;

import {
  renderUserDropdownList,
  openCloseDropdown,
  selectUser,
  openUsersDropdownList,
  closeUsersDropdownList,
  closeDropdownFromWindow,
  filterUsersByName,
  removeUsersSearchFieldValue,
} from "../components/addTask/userDropdown.js";
window.renderUserDropdownList = renderUserDropdownList;
window.openCloseDropdown = openCloseDropdown;
window.selectUser = selectUser;
window.openUsersDropdownList = openUsersDropdownList;
window.closeUsersDropdownList = closeUsersDropdownList;
window.closeDropdownFromWindow = closeDropdownFromWindow;
window.filterUsersByName = filterUsersByName;
window.removeUsersSearchFieldValue = removeUsersSearchFieldValue;

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

export let contactModalRef = document.getElementById("contactModal");

export let addNameWarningRef = document.getElementById("addNameWarning");
export let addEmailWarningRef = document.getElementById("addEmailWarning");
export let addPhoneWarningRef = document.getElementById("addPhoneWarning");
export let editNameWarningRef = document.getElementById("editNameWarning");
export let editEmailWarningRef = document.getElementById("editEmailWarning");
export let editPhoneWarningRef = document.getElementById("editPhoneWarning");

export async function getUsersArray() {
  let usersArray = await loadUsers();
  return usersArray;
}

export async function getTasksArray() {
  let tasksArray = await loadTasks();
  return tasksArray;
}

// später diese Funktion in eine "onload init Funktion packen"
getUsersArray();
getTasksArray();
