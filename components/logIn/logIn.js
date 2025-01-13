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
 * Imports functions for validating and handling user sign-up and login processes.
 *
 * @module logInValidation
 * @function compareSignUpWithUsers - Compares sign-up data with existing users.
 * @function signUpCompleteValidation - Validates the complete sign-up process.
 * @function userFeedbackAfterSignUp - Provides user feedback after sign-up.
 * @function compareLogInData - Compares login data with existing users.
 */
import { compareSignUpWithUsers, signUpCompleteValidation, userFeedbackAfterSignUp, compareLogInData } from "./logInValidation.js";

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
 * Scrolls to the top, renders the join logo and login template, retrieves user login data from local storage,
 * and animates the join logo after a short delay.
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

/**
 * Scrolls the window to the top and sets the scroll restoration to manual.
 * This function ensures that the page does not automatically scroll to the previous position.
 */
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
    window.location.href = "./summary.html";
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
      window.location.href = "./summary.html";
    }, 100);
  } else {
    return;
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
