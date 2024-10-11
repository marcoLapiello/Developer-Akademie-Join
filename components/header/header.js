export function toggle_d_None() {
    let userMenu = document.getElementById("dropDown");
    userMenu.classList.toggle("d_None");
}

function renderHeaderTemplate() {
    return /*html*/`
        <header>
      Kanban Project Management Tool
      <div class="header-rightSide">
        <a href="/help.html">
          <img src="/assets/icons/questionmark_small.png" alt="Help" />
        </a>
        <div onclick="toggle_d_None()" id="user_Profile_Initials" class="user-Profile-Initials">
          <div class="dropDown">
          <div class="legalNotice">
            <a href="/legalNotice.html">Legal Notice</a>
          </div>
          <div class="privacyPolicy">
            <a href="/privacyPolicy.html">Privacy Policy</a>
          </div>
          <div class="logOut">
            <a href="/login.html">Log out</a>
          </div>
        </div>
      </div>
    </header>
    `

}