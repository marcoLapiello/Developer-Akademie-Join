import { returnIcon } from "../icons.js";

import { getRandomUserColor } from "../contactModal/contactModal.js";

import { loadUsers, patchNewUser } from "../../js/apiService.js";

import { getLogInTemplate, getSignUpTemplate } from "./logInTemplates.js";
import { getUsersArray } from "../../js/script.js";

export function renderLogInTemplate(email, password) {
  let logInRenderContainerRef = document.getElementById("logInRenderContainer");
  logInRenderContainerRef.innerHTML = "";
  logInRenderContainerRef.innerHTML = getLogInTemplate(email, password);
}

export function renderSignUpTemplate() {
  let logInRenderContainerRef = document.getElementById("logInRenderContainer");
  logInRenderContainerRef.innerHTML = "";
  logInRenderContainerRef.innerHTML = getSignUpTemplate();
}

function renderJoinLogo() {
  document.getElementById("joinLogoBox").innerHTML = "";
  document.getElementById("joinLogoBox").innerHTML = returnIcon("joinLogo", "logInJoinLogoSmall");
}

function animateJoinLogo() {
  document.getElementById("joinLogoBox").classList.remove("joinLogoAnimation");
  document.getElementById("logoAnimationDialog").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("logoAnimationDialog").classList.add("d_none");
  }, 600);
  // #logoAnimationDialog
}

// ####### Init Function
export function initRenderLogInPage() {
  renderJoinLogo();
  renderLogInTemplate();
  getUserLogInDataFromLocalStorage();
  setTimeout(() => {
    animateJoinLogo();
  }, 800);
}

export function goToSignUpPage() {
  renderSignUpTemplate();
  document.getElementById("linkToSignUpBox").classList.add("d_none");
}

export function goToLogInPage() {
  renderLogInTemplate();
  document.getElementById("linkToSignUpBox").classList.remove("d_none");
}

// log in User functions
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

export function doGuestLogIn() {
  setGuestAsLoggedInToLocalStorage();
  setTimeout(() => {
    window.location.href = "../summary.html";
  }, 100);
}

export async function logInRegistratedUser() {
  let isLogInComparisionOK = await compareLogInData();
  if (isLogInComparisionOK) {
    toggleRememberMe();
    setUserIDToLocalStorage();
    setTimeout(() => {
      // setTimeout is needed to wait for the local storage to be set
      window.location.href = "../summary.html";
    }, 100);
  } else {
    console.log("log in data are not ok !!!");
    return;
  }
}

async function compareLogInData() {
  let usersArray = await loadUsers();
  let logInEmail = document.getElementById("logInInputEmail").value;
  let logInPassword = document.getElementById("logInInputPassword").value;
  let isComparisionOK = false;
  usersArray.forEach((element) => {
    if (element[1].profile.email === logInEmail && element[1].password === logInPassword) {
      isComparisionOK = true;
    }
  });
  return isComparisionOK;
}

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

function setGuestAsLoggedInToLocalStorage() {
  localStorage.setItem("loggedInUserId", JSON.stringify({ guest: "guest" }));
}

export function toggleRememberMe() {
  let checkboxRememberMeRef = document.getElementById("checkboxRememberMe");
  let checkBoxStatus = checkboxRememberMeRef.checked;
  if (checkBoxStatus) {
    setUserDataToLocalStorage();
  } else {
    removeUserDataFromLocalStorage();
  }
}

function setUserDataToLocalStorage() {
  let userLogInData = {
    email: document.getElementById("logInInputEmail").value,
    password: document.getElementById("logInInputPassword").value,
  };
  let userLogInDataJson = JSON.stringify(userLogInData);
  localStorage.setItem("joinUserLogInData", userLogInDataJson);
}

function removeUserDataFromLocalStorage() {
  localStorage.removeItem("joinUserLogInData");
}

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

// sign up User functions
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

export async function signUpNewUser() {
  let isSignUpValidationOK = signUpCompleteValidation();
  if (!isSignUpValidationOK) {
    console.log("Some validation is not ok");
    return;
  }
  let isNewUserNotRegistrated = await compareSignUpWithUsers();
  if (!isNewUserNotRegistrated) {
    console.log("user is still registrated");
    return;
  }
  await patchNewUser(getNewUserData());
  userFeedbackAfterSignUp();
  setTimeout(() => {
    renderLogInWithData();
  }, 1150);
}

function renderLogInWithData() {
  let newUser = getNewUserData();
  let email = newUser.profile.email;
  let password = newUser.password;
  renderLogInTemplate(email, password);
}

async function compareSignUpWithUsers() {
  let usersArray = await loadUsers();
  let newUser = getNewUserData();
  let isComparisionOK = true;
  usersArray.forEach((element) => {
    if (element[1].profile.email == newUser.profile.email) {
      isComparisionOK = false;
      console.log("user still exists");
    }
  });
  return isComparisionOK;
}

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

function signUpCompleteValidation() {
  let isNameValid = validateSignUpName();
  let isEmailValid = validateEmailInput();
  let isPasswordInputValid = validateSignUpPassword();
  let isPasswordRepeatInputValid = validateSignUpPasswordRepeat();
  let isPasswordComparingValid = compareSignUpPasswords();
  let isPrivacyPolicyChecked = checkAcceptedPrivacyPolicy();
  //
  if (isNameValid && isEmailValid && isPasswordInputValid && isPasswordRepeatInputValid && isPasswordComparingValid && isPrivacyPolicyChecked) {
    return true;
  } else {
    return false;
  }
}

export function validateSignUpName() {
  let inputRef = document.getElementById("signUpInputName");
  let nameInput = inputRef.value;
  let warningRef = document.getElementById("signUpInputNameWarning");
  if (!nameInput.length) {
    warningRef.innerHTML = "Enter name & surname, with space or hyphen.";
    inputRef.classList.add("borderColorRed");
    return false;
  }
  if (nameInput.value) {
    let namePartsCount = inputRef.value.split(" ").length;
    if (namePartsCount != 2) {
      warningRef.innerHTML = "Enter name & surname, with space or hyphen.";
      inputRef.classList.add("borderColorRed");
      return false;
    }
  }
  inputRef.classList.remove("borderColorRed");
  return true;
}

export function validateEmailInput() {
  let inputRef = document.getElementById("signUpInputEmail");
  let warningRef = document.getElementById("signUpInputEmailWarning");
  if (!inputRef.value || inputRef.value.length < 6) {
    inputRef.classList.add("borderColorRed");
    warningRef.innerHTML = "Enter a valid email address.";
    return false;
  }
  if (inputRef.value) {
    let emailInput = inputRef.value;
    let mailPartAfterAt = emailInput.split("@")[1];
    let atCounter = emailInput.split("@").length;
    if (!emailInput.includes("@") || !mailPartAfterAt.includes(".") || atCounter > 2 || /[äöüß]/.test(emailInput)) {
      inputRef.classList.add("borderColorRed");
      warningRef.innerHTML = "Enter a valid email address.";
      return false;
    }
  }
  inputRef.classList.remove("borderColorRed");
  return true;
}

function validateSignUpPassword() {
  let passwordInputRef = document.getElementById("signUpInputPassword");
  let passwordWarningRef = document.getElementById("signUpInputPasswordWarning");
  if (passwordInputRef.value.length < 6) {
    passwordInputRef.classList.add("borderColorRed");
    passwordWarningRef.innerHTML = "Enter a valid password.";
    return false;
  } else {
    passwordInputRef.classList.remove("borderColorRed");
    return true;
  }
}

function validateSignUpPasswordRepeat() {
  let passwordRepeatInputRef = document.getElementById("signUpInputPasswordRepeat");
  let passwordRepeatWarningRef = document.getElementById("signUpInputPasswordRepeatWarning");
  if (passwordRepeatInputRef.value.length < 6) {
    passwordRepeatInputRef.classList.add("borderColorRed");
    passwordRepeatWarningRef.innerHTML = "Enter a valid password.";
    return false;
  } else {
    passwordRepeatInputRef.classList.remove("borderColorRed");
    return true;
  }
}

function compareSignUpPasswords() {
  let isPasswordInputValid = validateSignUpPassword();
  let isPasswordRepeatInputValid = validateSignUpPasswordRepeat();
  if (isPasswordInputValid && isPasswordRepeatInputValid) {
    let passwordInputRef = document.getElementById("signUpInputPassword");
    let passwordRepeatInputRef = document.getElementById("signUpInputPasswordRepeat");
    let passwordRepeatWarningRef = document.getElementById("signUpInputPasswordRepeatWarning");
    if (passwordInputRef.value && passwordInputRef.value != passwordRepeatInputRef.value) {
      passwordRepeatInputRef.classList.add("borderColorRed");
      passwordRepeatWarningRef.innerHTML = "The passwords do not match. Please try again.";
      return false;
    } else {
      passwordRepeatInputRef.classList.remove("borderColorRed");
      return true;
    }
  } else {
    return false;
  }
}

function checkAcceptedPrivacyPolicy() {
  let isPrivacyPolicyChecked = document.getElementById("privacyPolicyCheckBox").checked;
  if (isPrivacyPolicyChecked) {
    document.getElementById("checkBoxWarning").innerText = "";
    console.log(isPrivacyPolicyChecked);
    return true;
  } else {
    document.getElementById("checkBoxWarning").innerText = "You have to read and accept our Privacy Policy";
    console.log(isPrivacyPolicyChecked);
    return false;
  }
}

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
