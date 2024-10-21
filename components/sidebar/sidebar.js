import { returnIcon } from "../icons.js";

export function renderSidebar() {
  const sidebarRef = document.getElementById("sidebar");
  if (sidebarRef) sidebarRef.innerHTML += renderSidebarTemplate();
}

const urlPath = window.location.pathname;

function renderSidebarTemplate() {
  return /*html*/ `
    
      <div class="sidebarUpperPart">
        <img class= "joinLogo"  src="./assets/icons/joinLogo.png" />
        <div class="sidebar-Block">
          <a class="${urlPath === "/summary.html" ? "active" : ""}" href="./summary.html">${returnIcon('summary')}Summary</a>
          <a class="${urlPath === "/addTask.html" ? "active" : ""}" href="./addTask.html">${returnIcon('addTask')}Add Task</a>
          <a class="${urlPath === "/board.html" ? "active" : ""}" href="./board.html">${returnIcon('board')}Board</a>
          <a class="${urlPath === "/contacts.html" ? "active" : ""}" href="./contacts.html">${returnIcon('contacts')}Contacts</a>
        </div>
      </div>

      <div id="information">
        <a class="${urlPath === "/privacyPolicy.html" ? "active" : ""}" id="privacyPolicy" href="./privacyPolicy.html">Privacy Policy</a>
        <a class="${urlPath === "/legalNotice.html" ? "active" : ""}" id="legalNotice" href="./legalNotice.html">Legal Notice</a>
      </div>
  `;
}
