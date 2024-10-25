export function toggle_d_None() {
  let userMenuRef = document.getElementById("dropDown");
  userMenuRef.classList.toggle("d_none");
}

export function renderHeader() {
  const headerRef = document.getElementById("header");
  if (headerRef) {
    headerRef.innerHTML += renderHeaderTemplate();
  }
}

function renderHeaderTemplate() {
  return /*html*/ `
      <div class = "headerText">
      <span>Kanban Project Management Tool</span>
      </div>
      <div class="header-rightSide">
        <a href="./help.html">
          <img src="./assets/icons/questionMark_small.png" alt="Help" />
        </a>
        <div onclick="toggle_d_None()" id="user_Profile_Initials" class="user-Profile-Initials">
          <span>G</span>
          <div class="dropDown d_none" id="dropDown">
          <div class="help">
            <a href="./help.html">Help</a>
          </div>
          <div class="legalNotice">
            <a href="./legalNotice.html">Legal Notice</a>
          </div>
          <div class="privacyPolicy">
            <a href="./privacyPolicy.html">Privacy Policy</a>
          </div>
          <div class="logOut">
            <a href="./login.html">Log out</a>
          </div>

        </div>
      </div>
    `;
}
