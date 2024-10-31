/**
 * @module "contactModal.js"
 */

/**
 * Imports various functions and references for handling user contacts.
 *
 * @module script
 * @function getUsersArray - Retrieves the array of users.
 * @constant {HTMLElement} addContactNameInputRef - Reference to the input element for adding a contact's name.
 * @constant {HTMLElement} addContactEmailInputRef - Reference to the input element for adding a contact's email.
 * @constant {HTMLElement} addContactPhoneInputRef - Reference to the input element for adding a contact's phone number.
 * @constant {HTMLElement} editContactNameInputRef - Reference to the input element for editing a contact's name.
 * @constant {HTMLElement} editContactEmailInputRef - Reference to the input element for editing a contact's email.
 * @constant {HTMLElement} editContactPhoneInputRef - Reference to the input element for editing a contact's phone number.
 * @constant {HTMLElement} editNewUserLogoRef - Reference to the element for editing a new user's logo.
 * @constant {HTMLElement} saveEditedUserButtonRef - Reference to the button for saving an edited user.
 * @constant {HTMLElement} addedUserFeedbackRef - Reference to the element for displaying feedback after adding a user.
 * @constant {HTMLElement} editUserFeedbackRef - Reference to the element for displaying feedback after editing a user.
 * @constant {HTMLElement} confirmDeleteUserModalRef - Reference to the modal for confirming user deletion.
 * @constant {HTMLElement} deleteChosenUserBtnRef - Reference to the button for deleting the chosen user.
 * @constant {HTMLElement} sureToDeleteContactBtnRef - Reference to the button for confirming contact deletion.
 * @constant {HTMLElement} addNameWarningRef - Reference to the element for displaying a warning when adding a name.
 * @constant {HTMLElement} addEmailWarningRef - Reference to the element for displaying a warning when adding an email.
 * @constant {HTMLElement} addPhoneWarningRef - Reference to the element for displaying a warning when adding a phone number.
 * @constant {HTMLElement} editNameWarningRef - Reference to the element for displaying a warning when editing a name.
 * @constant {HTMLElement} editEmailWarningRef - Reference to the element for displaying a warning when editing an email.
 * @constant {HTMLElement} editPhoneWarningRef - Reference to the element for displaying a warning when editing a phone number.
 */
import {
  getUsersArray,
  addContactNameInputRef,
  addContactEmailInputRef,
  addContactPhoneInputRef,
  editContactNameInputRef,
  editContactEmailInputRef,
  editContactPhoneInputRef,
  editNewUserLogoRef,
  saveEditedUserButtonRef,
  addedUserFeedbackRef,
  editUserFeedbackRef,
  confirmDeleteUserModalRef,
  deleteChosenUserBtnRef,
  sureToDeleteContactBtnRef,
  addNameWarningRef,
  addEmailWarningRef,
  addPhoneWarningRef,
  editNameWarningRef,
  editEmailWarningRef,
  editPhoneWarningRef,
} from "../../js/script.js";

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
 * Validates the name input field to ensure it contains both a name and a surname separated by a space or hyphen.
 *
 * @param {HTMLInputElement} inputRef - The input element containing the name and surname.
 * @param {HTMLElement} warningRef - The element where warning messages will be displayed.
 * @returns {boolean} - Returns true if the input is valid, otherwise false.
 */
function validateNameInput(inputRef, warningRef) {
  if (!inputRef.value) {
    warningRef.innerHTML = "Enter name & surname, with space or hyphen.";
    inputRef.style.borderColor = "rgb(255, 0, 0)";
    return false;
  }
  if (inputRef.value) {
    let namePartsCount = inputRef.value.split(" ").length;
    if (namePartsCount != 2) {
      warningRef.innerHTML = "Enter name & surname, with space or hyphen.";
      inputRef.style.borderColor = "rgb(255, 0, 0)";
      return false;
    }
  }
  return true;
}

/**
 * Validates an email input field and displays a warning message if the input is invalid.
 *
 * @param {HTMLInputElement} inputRef - The reference to the email input field.
 * @param {HTMLElement} warningRef - The reference to the element where the warning message will be displayed.
 * @returns {boolean} - Returns true if the email input is valid, otherwise false.
 */
function validateEmailInput(inputRef, warningRef) {
  if (!inputRef.value || inputRef.value.length < 6) {
    inputRef.style.borderColor = "rgb(255, 0, 0)";
    warningRef.innerHTML = "Enter a valid email address.";
    return false;
  }
  if (inputRef.value) {
    let emailInput = inputRef.value;
    let mailPartAfterAt = emailInput.split("@")[1];
    let atCounter = emailInput.split("@").length;
    if (!emailInput.includes("@") || !mailPartAfterAt.includes(".") || atCounter > 2 || /[äöüß]/.test(emailInput)) {
      inputRef.style.borderColor = "rgb(255, 0, 0)";
      warningRef.innerHTML = "Enter a valid email address.";
      return false;
    }
  }
  return true;
}

/**
 * Validates the phone number input field.
 *
 * @param {HTMLInputElement} inputRef - The reference to the input element containing the phone number.
 * @param {HTMLElement} warningRef - The reference to the element where warning messages will be displayed.
 * @returns {boolean} - Returns true if the phone number is valid, otherwise false.
 *
 * The function checks if the input value is present and meets the criteria of being at least 8 characters long and starting with a '+' sign.
 * If the input is invalid, it sets the border color of the input field to red and displays a warning message.
 */
function validatePhoneNumberInput(inputRef, warningRef) {
  if (!inputRef.value) {
    inputRef.style.borderColor = "rgb(255, 0, 0)";
    warningRef.innerHTML = "Enter a valid phone number with country code.";
    return false;
  }
  if (inputRef.value) {
    let phoneNumber = inputRef.value;
    let validCharacters = /^[0-9+\s]+$/.test(phoneNumber);
    if (phoneNumber.length < 8 || phoneNumber[0] != "+" || validCharacters == false) {
      inputRef.classList.add("borderColorRed");
      warningRef.innerHTML = "Enter a valid phone number with country code.";
      console.log("falsche scheiße");

      return false;
    } else {
      inputRef.classList.remove("borderColorRed");
      warningRef.innerHTML = "";

      return true;
    }
  }
}

// inputRef.style.borderColor = "rgb(255, 0, 0)";

/**
 * Validates all inputs based on the specified type.
 *
 * @param {string} type - The type of validation to perform. Can be "add" or "edit".
 * @returns {boolean} - The result of the validation function corresponding to the type.
 */
export function validateAllInputs(type) {
  if (type == "add") {
    return validateAllAddInputs();
  }
  if (type == "edit") {
    return validateAllEditInputs();
  }
}

/**
 * Validates all input fields for adding a contact.
 *
 * This function clears any existing error alerts and then validates the name, email,
 * and phone number input fields. If all validations pass, it returns true; otherwise,
 * it returns false.
 *
 * @returns {boolean} - Returns true if all input fields are valid, otherwise false.
 */
function validateAllAddInputs() {
  clearAddErrorAlerts();
  let validName = validateNameInput(addContactNameInputRef, addNameWarningRef);
  let validEmail = validateEmailInput(addContactEmailInputRef, addEmailWarningRef);
  let validPhoneNumber = validatePhoneNumberInput(addContactPhoneInputRef, addPhoneWarningRef);
  if (validName && validEmail && validPhoneNumber) {
    return true;
  }
  return false;
}

/**
 * Validates all edit input fields for a contact.
 *
 * This function clears any existing error alerts and then validates the name, email,
 * and phone number input fields. If all validations pass, it returns true; otherwise, false.
 *
 * @returns {boolean} - Returns true if all input fields are valid, otherwise false.
 */
function validateAllEditInputs() {
  clearEditErrorAlerts();
  let validName = validateNameInput(editContactNameInputRef, editNameWarningRef);
  let validEmail = validateEmailInput(editContactEmailInputRef, editEmailWarningRef);
  let validPhoneNumber = validatePhoneNumberInput(editContactPhoneInputRef, editPhoneWarningRef);
  if (validName && validEmail && validPhoneNumber) {
    return true;
  }
  return false;
}

/**
 * Clears the error alerts for the add contact form.
 *
 * This function resets the border color of the input fields for name, email, and phone
 * to the default color. It also clears any warning messages displayed for these fields.
 */
function clearAddErrorAlerts() {
  addContactNameInputRef.style.borderColor = "#d1d1d1";
  addContactEmailInputRef.style.borderColor = "#d1d1d1";
  addContactPhoneInputRef.style.borderColor = "#d1d1d1";
  addNameWarningRef.innerHTML = "";
  addEmailWarningRef.innerHTML = "";
  addPhoneWarningRef.innerHTML = "";
}

/**
 * Clears the error alerts for the edit contact form.
 *
 * This function resets the border color of the input fields for name, email, and phone
 * to the default color. It also clears any warning messages displayed for these fields.
 *
 * @function clearEditErrorAlerts
 */
function clearEditErrorAlerts() {
  editContactNameInputRef.style.borderColor = "#d1d1d1";
  editContactEmailInputRef.style.borderColor = "#d1d1d1";
  editContactPhoneInputRef.style.borderColor = "#d1d1d1";
  editNameWarningRef.innerHTML = "";
  editEmailWarningRef.innerHTML = "";
  editPhoneWarningRef.innerHTML = "";
}

/**
 * Validates and formats a new phone number input.
 *
 * This function checks if the phone number entered in the `addContactPhoneInputRef` input field starts with a "0".
 * If it does, the "0" is replaced with the country code "+49 " (Germany).
 * The formatted phone number is then set back to the input field.
 *
 * @function
 */
export function validateNewPhonenumber() {
  let number = addContactPhoneInputRef.value;
  if (number[0] == "0") {
    let addedNumber = number.replace("0", "+49 ");
    addContactPhoneInputRef.value = addedNumber;
  }
}

/**
 * Validates and formats the phone number input for editing a contact.
 * If the phone number starts with "0", it replaces the "0" with "+49 ".
 *
 * @function
 */
export function validateEditPhonenumber() {
  let number = editContactPhoneInputRef.value;
  if (number[0] == "0") {
    let addedNumber = number.replace("0", "+49 ");
    editContactPhoneInputRef.value = addedNumber;
  }
}

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
