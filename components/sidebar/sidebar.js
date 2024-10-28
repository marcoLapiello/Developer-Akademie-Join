/**
 * @module "sidebar.js"
 */

import { returnIcon } from "../icons.js";
const urlPath = window.location.pathname;

/**
 * Renders the sidebar by appending the sidebar template to the element with the ID "sidebar".
 * If the element with the ID "sidebar" is found, its innerHTML is updated with the sidebar template.
 */
export function renderSidebar() {
  const sidebarRef = document.getElementById("sidebar");
  if (sidebarRef) sidebarRef.innerHTML += renderSidebarTemplate();
}

/**
 * Generates the HTML template for the sidebar.
 *
 * The sidebar includes navigation links to different sections of the application
 * such as Summary, Add Task, Board, and Contacts. It also includes links to
 * Privacy Policy and Legal Notice.
 *
 * The active link is determined based on the current URL path.
 *
 * @returns {string} The HTML template for the sidebar.
 */
function renderSidebarTemplate() {
  return /*html*/ `
    
      <div class="sidebarUpperPart">
        <img class= "joinLogo"  src="./assets/icons/joinLogo.png" />
        <div class="sidebar-Block">
          <a class="${urlPath === "/summary.html" ? "active" : ""}" href="./summary.html">${returnIcon("summary")}Summary</a>
          <a class="${urlPath === "/addTask.html" ? "active" : ""}" href="./addTask.html">${returnIcon("addTask")}Add Task</a>
          <a class="${urlPath === "/board.html" ? "active" : ""}" href="./board.html">${returnIcon("board")}Board</a>
          <a class="${urlPath === "/contacts.html" ? "active" : ""}" href="./contacts.html">${returnIcon("contacts")}Contacts</a>
        </div>
      </div>

      <div id="information">
        <a class="${urlPath === "/privacyPolicy.html" ? "active" : ""}" id="privacyPolicy" href="./privacyPolicy.html">Privacy Policy</a>
        <a class="${urlPath === "/legalNotice.html" ? "active" : ""}" id="legalNotice" href="./legalNotice.html">Legal Notice</a>
      </div>
  `;
}
