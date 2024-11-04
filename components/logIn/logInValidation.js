/**
 * @module "logInValidation.js"
 */

/**
 * Imports functions for loading users and patching a new user.
 *
 * @module apiService
 * @function loadUsers - Loads the users.
 */
import { loadUsers } from "../../js/apiService.js";

/**
 * Compares the new user data with the existing users to check for email duplication.
 *
 * @async
 * @function compareSignUpWithUsers
 * @returns {Promise<boolean>} - Returns a promise that resolves to a boolean indicating whether the comparison is successful (true) or if there is a duplicate email (false).
 */
export async function compareSignUpWithUsers() {
  let usersArray = await loadUsers();
  let newUser = getNewUserData();
  let isComparisionOK = true;
  usersArray.forEach((element) => {
    if (element[1].profile.email == newUser.profile.email) isComparisionOK = false;
  });
  return isComparisionOK;
}

/**
 * Validates the complete sign-up process by checking the validity of the name, email, password input, and password comparison.
 *
 * @returns {boolean} Returns true if all validations pass, otherwise returns false.
 */
export function signUpCompleteValidation() {
  let isNameValid = validateSignUpName();
  let isEmailValid = validateEmailInput();
  let isPasswordInputValid = validateSignUpPassword();
  let isPasswordComparingValid = compareSignUpPasswords();
  if (isNameValid && isEmailValid && isPasswordInputValid && isPasswordComparingValid) {
    return true;
  } else {
    return false;
  }
}

function setBorderColorToRed(inputRef) {
  inputRef.classList.remove("borderColorBlue");
  inputRef.classList.remove("borderColorGrey");
  inputRef.classList.add("borderColorRed");
}

/**
 * Validates the sign-up name input field.
 *
 * This function checks if the name input field contains a valid name and surname,
 * separated by a space or hyphen. If the input is invalid, it displays a warning
 * message and adds a red border to the input field. If the input is valid, it removes
 * the red border and clears the warning message.
 *
 * @returns {boolean} - Returns `true` if the input is valid, otherwise `false`.
 */
export function validateSignUpName() {
  let inputRef = document.getElementById("signUpInputName");
  let nameInput = inputRef.value;
  let warningRef = document.getElementById("signUpInputNameWarning");
  if (!nameInput) {
    warningRef.innerHTML = "Enter name & surname, with space or hyphen.";
    inputRef.classList.add("borderColorRed");
    return false;
  } else {
    let namePartsCount = nameInput.split(" ").length;
    let nameLastLetter = nameInput[nameInput.length - 1];
    let nameFirstLetter = nameInput[0];
    if (namePartsCount != 2 || nameLastLetter == " " || nameFirstLetter == " ") {
      warningRef.innerHTML = "Enter name & surname, with space or hyphen.";
      setBorderColorToRed(inputRef);
      return false;
    } else {
      inputRef.classList.remove("borderColorRed");
      warningRef.innerHTML = "";
      return true;
    }
  }
}

/**
 * Validates the email input field with id "signUpInputEmail".
 *
 * This function checks if the email input meets the following criteria:
 * - The input is not empty and has at least 6 characters.
 * - The input contains exactly one "@" symbol.
 * - The part after "@" contains at least one ".".
 * - The input does not contain any whitespace characters.
 * - The input does not contain any German umlauts (ä, ö, ü, ß).
 * - The input does not end with a "." or have a "." as the second last character.
 *
 * If the input is invalid, it updates the input field's border color to red and displays a warning message.
 * If the input is valid, it removes the red border color and clears the warning message.
 *
 * @returns {boolean} - Returns true if the email input is valid, otherwise false.
 */
export function validateEmailInput() {
  let inputRef = document.getElementById("signUpInputEmail");
  let warningRef = document.getElementById("signUpInputEmailWarning");
  if (!inputRef.value || inputRef.value.length < 6) {
    setBorderColorToRed(inputRef);
    warningRef.innerHTML = "Enter a valid email address.";
    return false;
  }
  if (inputRef.value) {
    let emailInput = inputRef.value;
    let mailPartAfterAt = emailInput.split("@")[1];
    let atCounter = emailInput.split("@").length;
    let isWhitespaceIncluded = emailInput.includes(" ");
    if (
      !emailInput.includes("@") ||
      !mailPartAfterAt.includes(".") ||
      isWhitespaceIncluded ||
      atCounter > 2 ||
      /[äöüß]/.test(emailInput) ||
      emailInput[emailInput.length - 1] == "." ||
      emailInput[emailInput.length - 2] == "."
    ) {
      setBorderColorToRed(inputRef);
      warningRef.innerHTML = "Enter a valid email address.";
      return false;
    }
  }
  inputRef.classList.remove("borderColorRed");
  warningRef.innerHTML = "";
  return true;
}

/**
 * Validates the sign-up password input.
 *
 * This function checks if the password entered in the sign-up form meets the required criteria:
 * - The password must be at least six characters long.
 * - The password must not contain any whitespace characters.
 *
 * If the password does not meet these criteria, the input field's border color is changed to red,
 * and a warning message is displayed. If the password is valid, the warning message is cleared.
 *
 * @returns {boolean} - Returns `true` if the password is valid, otherwise `false`.
 */
export function validateSignUpPassword() {
  let inputRef = document.getElementById("signUpInputPassword");
  let passwordWarningRef = document.getElementById("signUpInputPasswordWarning");
  let isPasswordIncludingWhitespaces = inputRef.value.includes(" ");
  if (inputRef.value.length < 6 || isPasswordIncludingWhitespaces) {
    setBorderColorToRed(inputRef);
    passwordWarningRef.innerHTML = "Enter a password of at least six characters.";
    return false;
  } else {
    inputRef.classList.remove("borderColorRed");
    passwordWarningRef.innerHTML = "";
    return true;
  }
}

/**
 * Compares the password and password repeat input fields during sign-up to ensure they match.
 *
 * This function first validates the password input using `validateSignUpPassword()`. If the password
 * input is valid, it then checks if the password and password repeat input fields match. If they do not match,
 * it updates the UI to indicate the mismatch by changing the border color of the password repeat input field
 * and displaying a warning message. If they match, it clears any previous warning messages and border color changes.
 *
 * @returns {boolean} - Returns `true` if the passwords match and the password input is valid, otherwise `false`.
 */
export function compareSignUpPasswords() {
  let isPasswordInputValid = validateSignUpPassword();
  if (isPasswordInputValid) {
    let passwordInputRef = document.getElementById("signUpInputPassword");
    let inputRef = document.getElementById("signUpInputPasswordRepeat");
    let passwordRepeatWarningRef = document.getElementById("signUpInputPasswordRepeatWarning");
    if (passwordInputRef.value && passwordInputRef.value != inputRef.value) {
      setBorderColorToRed(inputRef);
      passwordRepeatWarningRef.innerHTML = "The passwords do not match. Please try again.";
      return false;
    } else {
      inputRef.classList.remove("borderColorRed");
      passwordRepeatWarningRef.innerHTML = "";
      return true;
    }
  } else {
    return false;
  }
}

/**
 * Displays user feedback after a sign-up action.
 *
 * This function shows a dialog field with a sign-up feedback message,
 * animates the feedback message, and then hides the dialog field after a delay.
 *
 * The function performs the following steps:
 * 1. Removes the "d_none" class from the element with ID "signUpDialogField" to make it visible.
 * 2. After 100 milliseconds, adds the "translateSignUpFeedback" class to the element with ID "signUpUserFeedback" to animate the feedback message.
 * 3. After 1150 milliseconds, adds the "d_none" class back to the element with ID "signUpDialogField" to hide it and removes the "translateSignUpFeedback" class from the element with ID "signUpUserFeedback" to reset the animation.
 */
export function userFeedbackAfterSignUp() {
  document.getElementById("signUpDialogField").classList.remove("d_none");
  setTimeout(() => {
    document.getElementById("signUpUserFeedback").classList.add("translateSignUpFeedback");
  }, 100);
  setTimeout(() => {
    document.getElementById("signUpDialogField").classList.add("d_none");
    document.getElementById("signUpUserFeedback").classList.remove("translateSignUpFeedback");
  }, 1150);
}

/**
 * Sets the border color of the specified input element to blue.
 * Removes any existing grey or red border color classes.
 *
 * @param {string} inputId - The ID of the input element whose border color is to be changed.
 */
export function setBorderColorBlue(inputId) {
  document.getElementById(inputId).classList.remove("borderColorGrey");
  document.getElementById(inputId).classList.remove("borderColorRed");
  document.getElementById(inputId).classList.add("borderColorBlue");
}

/**
 * Sets the border color of an input element based on the presence of a warning message.
 * If there is no warning message, the border color is set to grey.
 * If there is a warning message, the border color is set to red and specific validation functions are called.
 *
 * @param {string} inputId - The ID of the input element whose border color is to be set.
 * @param {string} warningId - The ID of the element containing the warning message.
 */
export function setBorderColorGrey(inputId, warningId) {
  let warningText = document.getElementById(warningId).innerText;
  if (!warningText) {
    document.getElementById(inputId).classList.remove("borderColorRed");
    document.getElementById(inputId).classList.remove("borderColorBlue");
    document.getElementById(inputId).classList.add("borderColorGrey");
  } else {
    document.getElementById(inputId).classList.add("borderColorRed");
    document.getElementById(inputId).classList.remove("borderColorBlue");
    document.getElementById(inputId).classList.remove("borderColorGrey");
    if ((inputId = "signUpInputName")) validateSignUpName();
    if ((inputId = "signUpInputEmail")) validateEmailInput();
    if ((inputId = "signUpInputPassword")) validateSignUpPassword();
    if ((inputId = "signUpInputPasswordRepeat")) compareSignUpPasswords();
  }
}

/**
 * Removes the validation warning for a specific input field and triggers the corresponding validation function.
 *
 * @param {string} inputId - The ID of the input field to validate.
 * @param {string} warningId - The ID of the warning element to check.
 */
export function removeValidationWarning(inputId, warningId) {
  let warningText = document.getElementById(warningId).innerText;
  if (warningText) {
    if ((inputId = "signUpInputName")) validateSignUpName();
    if ((inputId = "signUpInputEmail")) validateEmailInput();
    if ((inputId = "signUpInputPassword")) validateSignUpPassword();
    if ((inputId = "signUpInputPasswordRepeat")) compareSignUpPasswords();
  } else {
    return;
  }
}

/**
 * Compares the login data provided by the user with the stored user data.
 *
 * This function retrieves the user data from the storage, then compares the
 * provided email and password with the stored email and password for each user.
 * If a match is found, it clears any warning messages and returns true.
 * If no match is found, it displays a warning message and returns false.
 *
 * @async
 * @function compareLogInData
 * @returns {Promise<boolean>} - A promise that resolves to true if the login data matches a stored user, otherwise false.
 */
export async function compareLogInData() {
  let usersArray = await loadUsers();
  let logInEmail = document.getElementById("logInInputEmail").value;
  let logInPassword = document.getElementById("logInInputPassword").value;
  let logInInputPasswordWarningRef = document.getElementById("logInInputPasswordWarning");
  let isComparisionOK = false;
  usersArray.forEach((element) => {
    if (element[1].profile.email === logInEmail && element[1].password === logInPassword) {
      logInInputPasswordWarningRef.innerHTML = "";
      isComparisionOK = true;
    }
  });
  if (isComparisionOK) {
    return isComparisionOK;
  } else {
    logInInputPasswordWarningRef.innerHTML = "Email or password wrong, try again.";
    return isComparisionOK;
  }
}
