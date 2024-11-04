/**
 * @module "contactModal.js"
 */

/**
 * Imports the function to retrieve the array of users.
 *
 * @module script
 * @function getUsersArray - Retrieves the array of users from the script.
 */
import { getUsersArray } from "../../js/script.js";

import { clearAddErrorAlerts, clearEditErrorAlerts } from "./contactModalValidation.js";

/**
 * Imports the function to edit an existing user.
 *
 * @module apiService
 * @function editExistingUser - Edits the details of an existing user in the database.
 */
import { editExistingUser } from "../../js/apiService.js";

/**
 * Imports the function to remove the active contact button.
 *
 * @module contactList
 * @function removeAktivContactButton - Removes the active contact button from the contact list.
 */
import { removeAktivContactButton } from "../contactList/contactList.js";

/**
 * References to various DOM elements used in the contact modal.
 *
 * @type {HTMLElement}
 */
let addContactNameInputRef = document.getElementById("addContactNameInput");
let addContactEmailInputRef = document.getElementById("addContactEmailInput");
let addContactPhoneInputRef = document.getElementById("addContactPhoneInput");
let editContactNameInputRef = document.getElementById("editContactNameInput");
let editContactEmailInputRef = document.getElementById("editContactEmailInput");
let editContactPhoneInputRef = document.getElementById("editContactPhoneInput");
let editNewUserLogoRef = document.getElementById("editNewUserLogo");
let saveEditedUserButtonRef = document.getElementById("saveEditedUserButton");
let deleteChosenUserBtnRef = document.getElementById("deleteChosenUserBtn");
let addedUserFeedbackRef = document.getElementById("addedUserFeedback");
let editUserFeedbackRef = document.getElementById("editUserFeedback");
let confirmDeleteUserModalRef = document.getElementById("confirmDeleteUserModal");
let sureToDeleteContactBtnRef = document.getElementById("sureToDeleteContactBtn");

/**
 * An array of color codes used for user identification.
 *
 * @type {string[]}
 */
let userColors = [
  "#FF7A00",
  "#FF5EB3",
  "#6E52FF",
  "#9327FF",
  "#00BEE8",
  "#1FD7C1",
  "#FF745E",
  "#FFA35E",
  "#FC71FF",
  "#FFC701",
  "#0038FF",
  "#C3FF2B",
  "#FFE62B",
  "#FF4646",
  "#FFBB2B",
];

/**
 * Generates a random color from the userColors array.
 *
 * @returns {string} A random color from the userColors array.
 */
export function getRandomUserColor() {
  let randomIndex = Math.floor(Math.random() * userColors.length);
  let randomColor = userColors[randomIndex];
  return randomColor;
}

/**
 * Generates a new user object based on input values.
 *
 * @returns {Object} The new user object.
 * @returns {string} return.id - The unique identifier for the user.
 * @returns {string} return.password - The user's password (initially empty).
 * @returns {boolean} return.isLoggedIn - The user's login status (initially false).
 * @returns {string} return.user_color - The user's assigned color.
 * @returns {Object} return.profile - The user's profile information.
 * @returns {string} return.profile.first_name - The user's first name.
 * @returns {string} return.profile.last_name - The user's last name.
 * @returns {string} return.profile.initials - The user's initials.
 * @returns {string} return.profile.email - The user's email address.
 * @returns {string} return.profile.phone - The user's phone number.
 */
export function getNewUser() {
  let fullName = addContactNameInputRef.value;
  let nameParts = fullName.split(" ");
  let name = nameParts[0];
  let surname = nameParts[1];
  let userInitials = name.charAt(0) + surname.charAt(0);
  let id = userInitials + Date.now();
  let email = addContactEmailInputRef.value;
  let phoneNumber = addContactPhoneInputRef.value;
  let user = {
    id: id,
    password: "",
    isLoggedIn: false,
    user_color: getRandomUserColor(),
    profile: {
      first_name: name,
      last_name: surname,
      initials: userInitials,
      email: email,
      phone: phoneNumber,
    },
  };
  return user;
}

/**
 * Generates an edited user profile object based on input values.
 *
 * @param {Object} user - The user object (not used in the function).
 * @returns {Object} The edited user profile object containing the following properties:
 * - first_name {string}: The first name extracted from the full name input.
 * - last_name {string}: The last name extracted from the full name input.
 * - initials {string}: The initials derived from the first and last name.
 * - email {string}: The email address from the email input.
 * - phone {string}: The phone number from the phone input.
 */
export function getEditUserObject(user) {
  let fullName = editContactNameInputRef.value;
  let email = editContactEmailInputRef.value;
  let phoneNumber = editContactPhoneInputRef.value;
  let nameParts = fullName.split(" ");
  let name = nameParts[0];
  let surname = nameParts[1];
  let userInitials = name.charAt(0) + surname.charAt(0);
  let editUserProfile = {
    first_name: name,
    last_name: surname,
    initials: userInitials,
    email: email,
    phone: phoneNumber,
  };
  return editUserProfile;
}

/**
 * Displays the "Add New User" dialog by removing the "d_none" class from the contact modal,
 * clearing any error alerts, and animating the contact container to slide into view.
 */
export function showAddNewUserDialog() {
  document.getElementById("contactModal").classList.remove("d_none");
  clearAddErrorAlerts();
  setTimeout(() => {
    document.getElementById("addContactContainer").style.left = "50%";
  }, 50);
}

/**
 * Hides the "Add New User" dialog by moving the container out of view and then hiding the modal.
 * Also removes the active contact button and clears the input fields after a delay.
 */
export function hideAddNewUserDialog() {
  document.getElementById("addContactContainer").style.left = "150%";
  removeAktivContactButton();
  setTimeout(() => {
    document.getElementById("contactModal").classList.add("d_none");
    clearAddInputFields();
  }, 550);
}

/**
 * Hides the "Add New User" dialog if the background (with id "contactModal") is clicked.
 *
 * @param {Event} event - The event object representing the click event.
 */
export function hideAddNewUserDialogFromBG(event) {
  if (event.target.id == "contactModal") {
    hideAddNewUserDialog();
  } else {
    return;
  }
}

/**
 * Clears the input fields for adding a contact.
 *
 * This function resets the values of the input fields for contact name, email, and phone to empty strings.
 */
export function clearAddInputFields() {
  addContactNameInputRef.value = "";
  addContactEmailInputRef.value = "";
  addContactPhoneInputRef.value = "";
}

/**
 * Displays feedback for a newly added user by manipulating the CSS classes and styles of the feedback element.
 *
 * The feedback element is initially shown by removing the "d_none" class. Then, its position is adjusted based on the window width.
 * After a delay, the feedback element is moved off-screen and finally hidden again by adding the "d_none" class.
 *
 * @function newUserFeedback
 */
export function newUserFeedback() {
  addedUserFeedbackRef.classList.remove("d_none");
  setTimeout(() => {
    if (window.innerWidth < 1400) {
      addedUserFeedbackRef.style.left = "calc(50% - 163px)";
    } else {
      addedUserFeedbackRef.style.left = "746px";
    }
  }, 500);
  setTimeout(() => {
    addedUserFeedbackRef.style.left = "100%";
  }, 3000);
  setTimeout(() => {
    addedUserFeedbackRef.classList.add("d_none");
  }, 4000);
}

/**
 * Displays the edit dialog for a chosen user.
 *
 * This function retrieves the user data based on the provided ID, populates the edit form fields with the user's information,
 * and sets up event listeners for saving the edited user and deleting the user. It also handles the display of the edit modal.
 *
 * @async
 * @function showEditChosenUserDialog
 * @param {number} id - The ID of the user to be edited.
 * @returns {Promise<void>} - A promise that resolves when the user data is retrieved and the dialog is displayed.
 */
export async function showEditChosenUserDialog(id) {
  let usersArray = await getUsersArray();
  let user = usersArray.find((element) => element[0] == id);
  editContactNameInputRef.value = user[1].profile.first_name + " " + user[1].profile.last_name;
  editContactEmailInputRef.value = user[1].profile.email;
  editContactPhoneInputRef.value = user[1].profile.phone;
  editNewUserLogoRef.style.backgroundColor = user[1].user_color;
  editNewUserLogoRef.innerHTML = `<span>${user[1].profile.initials}</span>`;
  saveEditedUserButtonRef.addEventListener("click", () => {
    editExistingUser(id, user);
  });
  deleteChosenUserBtnRef.addEventListener("click", () => {
    showConfirmDeleteUserDialog(id);
  });
  document.getElementById("editContactModal").classList.remove("d_none");
  clearEditErrorAlerts();
  setTimeout(() => {
    document.getElementById("editContactContainer").style.left = "50%";
  }, 50);
}

/**
 * Displays and animates the user feedback element.
 *
 * This function performs the following steps:
 * 1. Removes the "d_none" class from the `editUserFeedbackRef` element to make it visible.
 * 2. After 500 milliseconds, adjusts the position of the element based on the window width.
 *    - If the window width is less than 1400 pixels, the element is centered horizontally.
 *    - Otherwise, the element is positioned at 746 pixels from the left.
 * 3. After 3000 milliseconds, moves the element to the right edge of the screen.
 * 4. After 4000 milliseconds, adds the "d_none" class back to the element to hide it.
 */
export function editUserFeedback() {
  editUserFeedbackRef.classList.remove("d_none");
  setTimeout(() => {
    if (window.innerWidth < 1400) {
      editUserFeedbackRef.style.left = "calc(50% - 163px)";
    } else {
      editUserFeedbackRef.style.left = "746px";
    }
  }, 500);
  setTimeout(() => {
    editUserFeedbackRef.style.left = "100%";
  }, 3000);
  setTimeout(() => {
    editUserFeedbackRef.classList.add("d_none");
  }, 4000);
}

/**
 * Hides the edit chosen user dialog by moving the container out of view and then adding a "d_none" class to the modal.
 *
 * This function first sets the `left` style property of the element with the ID "editContactContainer" to "150%",
 * effectively moving it out of view. After a delay of 550 milliseconds, it adds the "d_none" class to the element
 * with the ID "editContactModal" to hide it.
 */
export function hideEditChosenUserDialog() {
  document.getElementById("editContactContainer").style.left = "150%";
  setTimeout(() => {
    document.getElementById("editContactModal").classList.add("d_none");
  }, 550);
}

/**
 * Hides the edit contact modal dialog if the background is clicked.
 *
 * @param {Event} event - The event object from the click event.
 */
export function hideEditChosenUserDialogFromBG(event) {
  if (event.target.id == "editContactModal") {
    hideEditChosenUserDialog();
  } else {
    return;
  }
}

/**
 * Displays a confirmation dialog for deleting a user and sets up the event listener
 * for the confirmation button to delete the specified user.
 *
 * @param {string} id - The unique identifier of the user to be deleted.
 */
export function showConfirmDeleteUserDialog(id) {
  confirmDeleteUserModalRef.classList.remove("d_none");
  sureToDeleteContactBtnRef.addEventListener("click", () => {
    deleteChosenUser(id);
  });
}

/**
 * Hides the confirmation dialog for deleting a user by adding a CSS class to the modal element.
 * The modal element is identified by the ID "confirmDeleteUserModal".
 */
export function hideConfirmDeleteUserDialog() {
  document.getElementById("confirmDeleteUserModal").classList.add("d_none");
}

/**
 * Hides the confirm delete user dialog if the background is clicked.
 *
 * @param {Event} event - The event object from the click event.
 * @returns {void}
 */
export function hideConfirmDeleteUserDialogFromBG(event) {
  if (event.target.id == "confirmDeleteUserModal") {
    hideConfirmDeleteUserDialog();
  } else {
    return;
  }
}
