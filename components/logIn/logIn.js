import { returnIcon } from "../icons.js";

export function getLogInTemplate() {
  return /*html*/ `
    <div class="logInTemplate">
      <div class="logInTextBox">
        <p class="logInText">Log in</p>
        <div class="blueUnderlineDiv"></div>
      </div>
      <div class="logInInputArea">
        <input id="logInInputEmail" class="inputEmail" type="email" placeholder="Email" />
        <input id="logInInputPassword" class="inputPassword" type="password" placeholder="Password" />
        <div class="checkToRememberBox">
          <input id="checkboxRememberMe" class="checkboxRememberMe" type="checkbox" />
          <p>Remember me</p>
        </div>
      </div>
      <div class="logInBtnBox">
        <button onclick="logInRegistratedUsert()" class="logInBtn">Log in</button>
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
              <input class="inputName" type="password" placeholder="Name" />
              <input class="inputEmail" type="email" placeholder="Email" />
              <input class="inputPassword" type="password" placeholder="Password" />
              <input class="inputPassword" type="password" placeholder="Password" />
              <div class="checkToRememberBox">
                <input class="checkboxRememberMe" type="checkbox" />
                <p>I accept the</p>
                <a href="./privacyPolicy.html">Privacy policy</a>
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

export function doGuestLogIn() {
  console.log("guest login requested");
  window.location.href = "../summary.html";
}

export function logInRegistratedUsert() {
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

export function signUpNewUser() {
  userFeedbackAfterSignUp();
  setTimeout(() => {
    goToLogInPage();
  }, 1150);
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
