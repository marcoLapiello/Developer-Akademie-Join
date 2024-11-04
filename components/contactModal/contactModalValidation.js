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
let addNameWarningRef = document.getElementById("addNameWarning");
let addEmailWarningRef = document.getElementById("addEmailWarning");
let addPhoneWarningRef = document.getElementById("addPhoneWarning");
let editNameWarningRef = document.getElementById("editNameWarning");
let editEmailWarningRef = document.getElementById("editEmailWarning");
let editPhoneWarningRef = document.getElementById("editPhoneWarning");

/**
 * Validates the name input field to ensure it contains both a name and a surname separated by a space or hyphen.
 *
 * @param {HTMLInputElement} inputRef - The input element containing the name and surname.
 * @param {HTMLElement} warningRef - The element where warning messages will be displayed.
 * @returns {boolean} - Returns true if the input is valid, otherwise false.
 */
export function validateNameInput(inputRef, warningRef) {
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
export function validateEmailInput(inputRef, warningRef) {
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
export function validatePhoneNumberInput(inputRef, warningRef) {
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
      return false;
    } else {
      inputRef.classList.remove("borderColorRed");
      warningRef.innerHTML = "";

      return true;
    }
  }
}

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
export function validateAllAddInputs() {
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
export function validateAllEditInputs() {
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
export function clearAddErrorAlerts() {
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
export function clearEditErrorAlerts() {
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
