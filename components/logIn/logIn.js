/**
 * @module "login.js"
 */

/**
 * Imports the function to retrieve an icon element for use in the user interface.
 *
 * @module icons
 * @function returnIcon - Generates and returns an HTML element representing the specified icon.
 * @param {string} iconName - The name or identifier of the icon to retrieve.
 * @returns {HTMLElement} - The HTML element representing the requested icon.
 */
import { returnIcon } from "../icons.js";

/**
 * Imports the function to retrieve a random user color.
 *
 * @module contactModal
 * @function getRandomUserColor - Retrieves a random color for a user.
 * @returns {string} - A random color code.
 */
import { getRandomUserColor } from "../contactModal/contactModal.js";

/**
 * Imports functions for loading users and patching a new user.
 *
 * @module apiService
 * @function loadUsers - Loads the users.
 * @function patchNewUser - Patches a new user to the API.
 */
import { loadUsers, patchNewUser } from "../../js/apiService.js";

/**
 * Imports functions to retrieve login and signup templates.
 *
 * @module logInTemplates
 * @function getLogInTemplate - Retrieves the login template.
 * @function getSignUpTemplate - Retrieves the signup template.
 */
import { getLogInTemplate, getSignUpTemplate } from "./logInTemplates.js";

/**
 * Imports the function to retrieve the array of users.
 *
 * @module script
 * @function getUsersArray - Retrieves the array of users from the script.
 */
import { getUsersArray } from "../../js/script.js";

/**
 * Renders the login template with the provided email and password.
 * Clears the existing content of the login render container and sets the new template.
 * Enables the login button after a short delay.
 *
 * @param {string} email - The email address to be used in the login template.
 * @param {string} password - The password to be used in the login template.
 */
export function renderLogInTemplate(email, password) {
  let logInRenderContainerRef = document.getElementById("logInRenderContainer");
  logInRenderContainerRef.innerHTML = "";
  logInRenderContainerRef.innerHTML = getLogInTemplate(email, password);
  setTimeout(() => {
    enableLogInButton();
  }, 100);
}

/**
 * Renders the sign-up template inside the logInRenderContainer element.
 * This function clears the current content of the logInRenderContainer
 * and replaces it with the sign-up template.
 */
export function renderSignUpTemplate() {
  let logInRenderContainerRef = document.getElementById("logInRenderContainer");
  logInRenderContainerRef.innerHTML = "";
  logInRenderContainerRef.innerHTML = getSignUpTemplate();
}

/**
 * Renders the Join logo inside the element with the ID "joinLogoBox".
 * Clears any existing content in the "joinLogoBox" element and sets its inner HTML
 * to the result of the returnIcon function with specified parameters.
 */
function renderJoinLogo() {
  document.getElementById("joinLogoBox").innerHTML = "";
  document.getElementById("joinLogoBox").innerHTML = returnIcon("joinLogo", "logInJoinLogoSmall");
}

/**
 * Animates the Join logo by removing the animation class and hiding the animation dialog.
 *
 * This function performs the following steps:
 * 1. Removes the "joinLogoAnimation" class from the element with the ID "joinLogoBox".
 * 2. Sets the opacity of the element with the ID "logoAnimationDialog" to "0".
 * 3. After a delay of 600 milliseconds, adds the "d_none" class to the element with the ID "logoAnimationDialog".
 */
function animateJoinLogo() {
  document.getElementById("joinLogoBox").classList.remove("joinLogoAnimation");
  document.getElementById("logoAnimationDialog").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("logoAnimationDialog").classList.add("d_none");
  }, 600);
}

/**
 * Initializes and renders the login page.
 * This function performs the following steps:
 * 1. Renders the Join logo.
 * 2. Renders the login template.
 * 3. Retrieves user login data from local storage.
 * 4. Animates the Join logo after a delay of 800 milliseconds.
 */
export function initRenderLogInPage() {
  scrollToTop();
  renderJoinLogo();
  renderLogInTemplate();
  getUserLogInDataFromLocalStorage();
  setTimeout(() => {
    animateJoinLogo();
  }, 800);
}

function scrollToTop() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
}

/**
 * Navigates to the sign-up page by rendering the sign-up template and hiding the link to the sign-up box.
 *
 * This function performs the following actions:
 * 1. Calls the `renderSignUpTemplate` function to render the sign-up page template.
 * 2. Hides the element with the ID "linkToSignUpBox" by adding the "d_none" class to it.
 */
export function goToSignUpPage() {
  renderSignUpTemplate();
  document.getElementById("linkToSignUpBox").classList.add("d_none");
}

/**
 * Navigates to the login page by rendering the login template and making the sign-up link visible.
 */
export function goToLogInPage() {
  renderLogInTemplate();
  document.getElementById("linkToSignUpBox").classList.remove("d_none");
}

/**
 * Enables or disables the login button based on the input values of email and password fields.
 *
 * This function checks the values of the email and password input fields. If both fields have values,
 * it enables the login button by removing the "buttonDisabled" class and setting the `disabled` property to `false`.
 * If either field is empty, it disables the login button by adding the "buttonDisabled" class and setting the `disabled` property to `true`.
 */
export function enableLogInButton() {
  let emailInput = document.getElementById("logInInputEmail").value;
  let passwordInput = document.getElementById("logInInputPassword").value;
  let logInBtnRef = document.getElementById("logInBtn");
  if (emailInput && passwordInput) {
    logInBtnRef.classList.remove("buttonDisabled");
    logInBtnRef.disabled = false;
  } else {
    logInBtnRef.classList.add("buttonDisabled");
    logInBtnRef.disabled = true;
  }
}

/**
 * Logs in a guest user by setting the guest status in local storage and then
 * redirects the user to the summary page after a short delay.
 */
export function doGuestLogIn() {
  setGuestAsLoggedInToLocalStorage();
  setTimeout(() => {
    window.location.href = "../summary.html";
  }, 100);
}

/**
 * Logs in a registered user by comparing login data, toggling the "remember me" option,
 * setting the user ID to local storage, and redirecting to the summary page if the login is successful.
 *
 * @async
 * @function logInRegistratedUser
 * @returns {Promise<void>} Resolves when the login process is complete.
 */
export async function logInRegistratedUser() {
  let isLogInComparisionOK = await compareLogInData();
  if (isLogInComparisionOK) {
    toggleRememberMe();
    setUserIDToLocalStorage();
    setTimeout(() => {
      window.location.href = "../summary.html";
    }, 100);
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
async function compareLogInData() {
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

/**
 * Asynchronously sets the user ID to local storage based on the email input.
 *
 * This function retrieves an array of users, finds the user whose email matches
 * the input email, and stores the corresponding user ID in local storage.
 *
 * @async
 * @function setUserIDToLocalStorage
 * @returns {Promise<void>} A promise that resolves when the user ID is set in local storage.
 */
async function setUserIDToLocalStorage() {
  let usersArray = await getUsersArray();
  let userEmail = document.getElementById("logInInputEmail").value;
  let userID;
  usersArray.forEach((element) => {
    if (element[1].profile.email === userEmail) {
      userID = element[1].id;
    }
  });
  localStorage.setItem("loggedInUserId", JSON.stringify({ userID: `${userID}` }));
}

/**
 * Sets a guest user as logged in by storing the guest user information in the local storage.
 * The guest user information is stored under the key "loggedInUserId".
 */
function setGuestAsLoggedInToLocalStorage() {
  localStorage.setItem("loggedInUserId", JSON.stringify({ guest: "guest" }));
}

/**
 * Toggles the "Remember Me" functionality by checking the status of the checkbox.
 * If the checkbox is checked, user data is saved to local storage.
 * If the checkbox is unchecked, user data is removed from local storage.
 */
export function toggleRememberMe() {
  let checkboxRememberMeRef = document.getElementById("checkboxRememberMe");
  let checkBoxStatus = checkboxRememberMeRef.checked;
  if (checkBoxStatus) {
    setUserDataToLocalStorage();
  } else {
    removeUserDataFromLocalStorage();
  }
}

/**
 * Stores user login data (email and password) from input fields into local storage.
 * The data is stored as a JSON string under the key "joinUserLogInData".
 */
function setUserDataToLocalStorage() {
  let userLogInData = {
    email: document.getElementById("logInInputEmail").value,
    password: document.getElementById("logInInputPassword").value,
  };
  let userLogInDataJson = JSON.stringify(userLogInData);
  localStorage.setItem("joinUserLogInData", userLogInDataJson);
}

/**
 * Removes the user login data from the local storage.
 * This function deletes the item with the key "joinUserLogInData" from the local storage.
 */
function removeUserDataFromLocalStorage() {
  localStorage.removeItem("joinUserLogInData");
}

/**
 * Retrieves user login data from local storage and populates the login form fields if data is found.
 *
 * @returns {Object|null} The user login data object containing email and password, or null if no data is found.
 */
export function getUserLogInDataFromLocalStorage() {
  let userLogInDataJson = localStorage.getItem("joinUserLogInData");
  let userLogInData = JSON.parse(userLogInDataJson);
  if (userLogInData != null) {
    document.getElementById("checkboxRememberMe").checked = true;
    document.getElementById("logInInputEmail").value = userLogInData.email;
    document.getElementById("logInInputPassword").value = userLogInData.password;
  }
  return userLogInData;
}

/**
 * Enables or disables the sign-up button based on the input fields and privacy policy checkbox.
 *
 * This function checks the values of the name, email, password, and password repeat input fields,
 * as well as the state of the privacy policy checkbox. If all fields are filled and the checkbox
 * is checked, the sign-up button is enabled. Otherwise, the button is disabled.
 */
export function enableSignUpButton() {
  let nameInput = document.getElementById("signUpInputName").value;
  let emailInput = document.getElementById("signUpInputEmail").value;
  let passwordInput = document.getElementById("signUpInputPassword").value;
  let passwordRepeatInput = document.getElementById("signUpInputPasswordRepeat").value;
  let privacyPolicyChecked = document.getElementById("privacyPolicyCheckBox").checked;
  let signUpBtnRef = document.getElementById("signUpBtn");
  if (nameInput && emailInput && passwordInput && passwordRepeatInput && privacyPolicyChecked) {
    signUpBtnRef.classList.remove("buttonDisabled");
    signUpBtnRef.disabled = false;
  } else {
    signUpBtnRef.classList.add("buttonDisabled");
    signUpBtnRef.disabled = true;
  }
}

/**
 * Signs up a new user by validating the input, checking if the user is already registered,
 * and then adding the new user to the database. Provides user feedback and redirects to the login page.
 *
 * @async
 * @function signUpNewUser
 * @returns {Promise<void>} Returns nothing.
 */
export async function signUpNewUser() {
  let isSignUpValidationOK = signUpCompleteValidation();
  if (!isSignUpValidationOK) {
    return;
  }
  let isNewUserNotRegistrated = await compareSignUpWithUsers();
  if (!isNewUserNotRegistrated) {
    return;
  }
  await patchNewUser(getNewUserData());
  userFeedbackAfterSignUp();
  setTimeout(() => {
    renderLogInWithData();
  }, 1150);
}

/**
 * Renders the login template with user data and updates the UI.
 *
 * This function retrieves new user data, extracts the email and password,
 * and then calls the renderLogInTemplate function with these credentials.
 * Additionally, it ensures that the sign-up link is visible by removing
 * the "d_none" class from the "linkToSignUpBox" element.
 */
function renderLogInWithData() {
  let newUser = getNewUserData();
  let email = newUser.profile.email;
  let password = newUser.password;
  renderLogInTemplate(email, password);
  document.getElementById("linkToSignUpBox").classList.remove("d_none");
}

/**
 * Compares the new user data with the existing users to check for email duplication.
 *
 * @async
 * @function compareSignUpWithUsers
 * @returns {Promise<boolean>} - Returns a promise that resolves to a boolean indicating whether the comparison is successful (true) or if there is a duplicate email (false).
 */
async function compareSignUpWithUsers() {
  let usersArray = await loadUsers();
  let newUser = getNewUserData();
  let isComparisionOK = true;
  usersArray.forEach((element) => {
    if (element[1].profile.email == newUser.profile.email) {
      isComparisionOK = false;
    }
  });
  return isComparisionOK;
}

/**
 * Generates a new user data object based on input values from the sign-up form.
 *
 * @returns {Object} The new user data object.
 * @returns {string} user.id - The unique identifier for the user, composed of initials and a timestamp.
 * @returns {string} user.password - The user's password.
 * @returns {boolean} user.isLoggedIn - The login status of the user, initially set to false.
 * @returns {string} user.user_color - A randomly generated color for the user.
 * @returns {Object} user.profile - The profile information of the user.
 * @returns {string} user.profile.first_name - The first name of the user.
 * @returns {string} user.profile.last_name - The last name of the user.
 * @returns {string} user.profile.initials - The initials of the user.
 * @returns {string} user.profile.email - The email address of the user.
 * @returns {string} user.profile.phone - The phone number of the user, initially set to an empty string.
 */
export function getNewUserData() {
  let fullName = document.getElementById("signUpInputName").value;
  let nameParts = fullName.split(" ");
  let name = nameParts[0];
  let surname = nameParts[1];
  let userInitials = name.charAt(0) + surname.charAt(0);
  let id = userInitials + Date.now();
  let email = document.getElementById("signUpInputEmail").value;
  let user = {
    id: id,
    password: document.getElementById("signUpInputPassword").value,
    isLoggedIn: false,
    user_color: getRandomUserColor(),
    profile: {
      first_name: name,
      last_name: surname,
      initials: userInitials,
      email: email,
      phone: "",
    },
  };
  return user;
}

/**
 * Validates the complete sign-up process by checking the validity of the name, email, password input, and password comparison.
 *
 * @returns {boolean} Returns true if all validations pass, otherwise returns false.
 */
function signUpCompleteValidation() {
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
      inputRef.classList.remove("borderColorBlue");
      inputRef.classList.remove("borderColorGrey");
      inputRef.classList.add("borderColorRed");
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
    inputRef.classList.remove("borderColorBlue");
    inputRef.classList.remove("borderColorGrey");
    inputRef.classList.add("borderColorRed");
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
      inputRef.classList.remove("borderColorBlue");
      inputRef.classList.remove("borderColorGrey");
      inputRef.classList.add("borderColorRed");
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
function validateSignUpPassword() {
  let passwordInputRef = document.getElementById("signUpInputPassword");
  let passwordWarningRef = document.getElementById("signUpInputPasswordWarning");
  let isPasswordIncludingWhitespaces = passwordInputRef.value.includes(" ");
  if (passwordInputRef.value.length < 6 || isPasswordIncludingWhitespaces) {
    passwordInputRef.classList.remove("borderColorBlue");
    passwordInputRef.classList.remove("borderColorGrey");
    passwordInputRef.classList.add("borderColorRed");
    passwordWarningRef.innerHTML = "Enter a password of at least six characters.";
    return false;
  } else {
    passwordInputRef.classList.remove("borderColorRed");
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
function compareSignUpPasswords() {
  let isPasswordInputValid = validateSignUpPassword();
  if (isPasswordInputValid) {
    let passwordInputRef = document.getElementById("signUpInputPassword");
    let passwordRepeatInputRef = document.getElementById("signUpInputPasswordRepeat");
    let passwordRepeatWarningRef = document.getElementById("signUpInputPasswordRepeatWarning");
    if (passwordInputRef.value && passwordInputRef.value != passwordRepeatInputRef.value) {
      passwordRepeatInputRef.classList.remove("borderColorBlue");
      passwordRepeatInputRef.classList.remove("borderColorGrey");
      passwordRepeatInputRef.classList.add("borderColorRed");
      passwordRepeatWarningRef.innerHTML = "The passwords do not match. Please try again.";
      return false;
    } else {
      passwordRepeatInputRef.classList.remove("borderColorRed");
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
function userFeedbackAfterSignUp() {
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
    if ((inputId = "signUpInputName")) {
      validateSignUpName();
    }
    if ((inputId = "signUpInputEmail")) {
      validateEmailInput();
    }
    if ((inputId = "signUpInputPassword")) {
      validateSignUpPassword();
    }
    if ((inputId = "signUpInputPasswordRepeat")) {
      compareSignUpPasswords();
    }
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
    if ((inputId = "signUpInputName")) {
      validateSignUpName();
    }
    if ((inputId = "signUpInputEmail")) {
      validateEmailInput();
    }
    if ((inputId = "signUpInputPassword")) {
      validateSignUpPassword();
    }
    if ((inputId = "signUpInputPasswordRepeat")) {
      compareSignUpPasswords();
    }
  } else {
    return;
  }
}
