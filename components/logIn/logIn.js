import { returnIcon } from "../icons.js";

import { getRandomUserColor } from "../contactModal/contactModal.js";

export function getLogInTemplate() {
  return /*html*/ `
    <div class="logInTemplate">
      <div class="logInTextBox">
        <p class="logInText">Log in</p>
        <div class="blueUnderlineDiv"></div>
      </div>
      <div class="logInInputArea">

      <div class="marginMinusFourteenPx">
        <input id="logInInputEmail" class="inputEmail" type="email" placeholder="Email" />
        <div class="addTaskValidationWarning"><span id="logInInputEmailWarning"></span>&nbsp;</div>
      </div>
      <div class="marginMinusFourteenPx">
        <input id="logInInputPassword" class="inputPassword" type="password" placeholder="Password" />
        <div class="addTaskValidationWarning"><span id="logInInputPasswordWarning"></span>&nbsp;</div>
      </div>

        <div class="checkToRememberBox">
          <input id="checkboxRememberMe" class="checkboxRememberMe" type="checkbox" />
          <p>Remember me</p>
        </div>
      </div>
      <div class="logInBtnBox">
        <button onclick="logInRegistratedUser()" class="logInBtn">Log in</button>
        <button onclick="doGuestLogIn()" class="guestLogInBtn">Guest Log In</button>
      </div>
    </div>
  `;
}

export function getSignUpTemplate() {
  return /*html*/ `
    <div class="logInTemplate">
            <div onclick="goToLogInPage()" class="backArrow">
              <svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.0097 17.8855H30.1871C31.0362 17.8855 31.7246 18.5739 31.7246 19.4231C31.7246 20.2722 31.0362 20.9606 30.1871 20.9606H13.0097L20.17 28.1209C20.7704 28.7213 20.7704 29.6946 20.17 30.295C19.5697 30.8954 18.5963 30.8954 17.996 30.295L8.53824 20.8373C7.75719 20.0562 7.75719 18.7899 8.53824 18.0089L17.996 8.55115C18.5963 7.9508 19.5697 7.9508 20.17 8.55115C20.7704 9.1515 20.7704 10.1249 20.17 10.7252L13.0097 17.8855Z"
                />
              </svg>
            </div>
            <div class="logInTextBox">
              <p class="logInText">Sign up</p>
              <div class="blueUnderlineDiv"></div>
            </div>
            <div class="signUpInputArea">

            <div class="marginMinusFourteenPx">
              <input id="signUpInputName" class="inputName" type="text" placeholder="Name" />
              <div class="addTaskValidationWarning"><span id="signUpInputNameWarning"></span>&nbsp;</div>
            </div>
            <div class="marginMinusFourteenPx">
              <input id="signUpInputEmail" class="inputEmail" type="email" placeholder="Email" />
              <div class="addTaskValidationWarning"><span id="signUpInputEmailWarning"></span>&nbsp;</div>
            </div>
            <div class="marginMinusFourteenPx">
              <input id="signUpInputPassword" class="inputPassword" type="password" placeholder="Password" />
              <div class="addTaskValidationWarning"><span id="signUpInputPasswordWarning"></span>&nbsp;</div>
            </div>
            <div class="marginMinusFourteenPx">
              <input id="signUpInputPasswordRepeat" class="inputPassword" type="password" placeholder="Password" />
              <div class="addTaskValidationWarning"><span id="signUpInputPasswordRepeatWarning"></span>&nbsp;</div>
            </div>
            <div class="marginMinusFourteenPx checkToRememberContainer">
              <div class="checkToRememberBox">
                <input id="privacyPolicyCheckBox" class="checkboxRememberMe" type="checkbox" />
                <p>I accept the</p>
                <a href="./privacyPolicy.html">Privacy policy</a>
              </div>
              <div class="addTaskValidationWarning"><span id="checkBoxWarning"></span>&nbsp;</div>
            </div>

            </div>
            <div class="logInBtnBox">
              <button onclick="signUpNewUser()" id="signUpBtn" class="signUpBtn">Sign up</button>
            </div>
          </div>
  `;
}

export function renderLogInTemplate() {
  let logInRenderContainerRef = document.getElementById("logInRenderContainer");
  logInRenderContainerRef.innerHTML = "";
  logInRenderContainerRef.innerHTML = getLogInTemplate();
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

// log in USer functions
export function doGuestLogIn() {
  console.log("guest login requested");
  window.location.href = "../summary.html";
}

export function logInRegistratedUser() {
  toggleRememberMe();
  console.log("Log In for registrated user requested");
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
export function signUpNewUser() {
  // -> get usersArray from firebase
  // -> compare users with new signup data --> error or accept
  // -> check if privace policy is accepted
  let isSignUpValidationOK = signUpCompleteValidation();
  if (!isSignUpValidationOK) {
    console.log("Some validation is not ok");
    return;
  }
  console.log(getNewUserData());
  userFeedbackAfterSignUp();
  setTimeout(() => {
    // goToLogInPage();
  }, 1150);
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
  }
  else {
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

// user object erstellen
// datenbank abfragen (daten synchron ziehen und bereitstellen mit init Funktion) ob user schon erstellt wurde (abgleich der Emailadresse)
// --- wenn vorhanden --> Fehlermeldung
// --- wenn neu --->
//         user daten an firebase patchen
//         user login daten an login fenster schicken

// login:  userDatenZiehen und abgleichen ob user vorhanden
