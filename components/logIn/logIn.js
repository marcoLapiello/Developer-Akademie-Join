export function getLogInTemplate() {
  return /*html*/`
    <div class="logInTemplate">
      <div class="logInTextBox">
        <p class="logInText">Log in</p>
        <div class="blueUnderlineDiv"></div>
      </div>
      <div class="logInInputArea">
        <input class="inputEmail" type="email" placeholder="Email" />
        <input class="inputPassword" type="password" placeholder="Password" />
        <div class="checkToRememberBox">
          <input class="checkboxRememberMe" type="checkbox" />
          <p>Remember me</p>
        </div>
      </div>
      <div class="logInBtnBox">
        <button class="logInBtn">Log in</button>
        <button class="guestLogInBtn">Guest Log In</button>
      </div>
    </div>
  `;
}  