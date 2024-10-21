import { getUsersArray } from "../../js/script.js";

function getUserDropdownList() {
  return /*html*/ `
    <div class="userDropdownList"></div>
  `;
}

function getUserListItem(userArray) {
  return /*html*/ `
    <div class="userListItem">
      <div class="initialsBox">
        <span class="initials"></span>
      </div>
      <p></p>
      <input type="checkBox">
    </div>
  `;
}

export async function renderUserDropdownList() {
  let userArray = await getUsersArray();
}

export function openCloseDropdown(arrow, content) {
  document.getElementById(arrow).classList.toggle("rotatedArrow");
  document.getElementById(content).classList.toggle("d_none");
}

