/**
 * @module "board.js"
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
 * Generates the HTML template for the board component.
 *
 * The template includes:
 * - A left section with a "Board" label and a button to add a new task.
 * - A right section with a search field to filter tasks and a button to open the task modal.
 *
 * @returns {string} The HTML template for the board component.
 */
function getBoardTemplate() {
  return /*html*/ `
    <div class="boardContainer">
      <div class="boardLeft">
        <p>Board</p>
        <a href="../addTask.html">
          <button onclick="addNewTask()" class="boardTaskAddBtnSmall">
            ${returnIcon("plus", "addIcon")}
          </button>
        </a>
      </div>
      <div class="boardRight">
        <div class="taskSearchFieldContainer">
          <input id="searchTasksField" oninput="getFilteredTasksArray()" onchange="getFilteredTasksArray()" type="text" placeholder="Find Task" />
          <button onclick="getFilteredTasksArray()" class="searchFieldImgButton">
            ${returnIcon("searchLens")}
          </button>
        </div>
        <button onclick="openTaskModal('modal')" class="boardTaskAddBtnLarge">
          <p>Add task</p>
          <div>
          ${returnIcon("plus", "addIcon")}
          </div>
        </button>
      </div>
    </div>
  `;
}

/**
 * Renders the board head template by setting the inner HTML of the element
 * with the ID "board" to the result of the getBoardTemplate function.
 *
 * @function
 */
export function renderBoardHeadTemplate() {
  const boardRef = document.getElementById("board");
  if (boardRef) {
    boardRef.innerHTML = getBoardTemplate();
  }
}

/**
 * Filters the tasks displayed on the board based on the input from the search field.
 *
 * This function retrieves all task cards from the DOM, checks the value of the search field,
 * and filters the tasks to only show those that match the search criteria. Tasks that do not
 * match the search criteria are hidden.
 *
 * @async
 * @function getFilteredTasksArray
 * @returns {void}
 */
export async function getFilteredTasksArray() {
  let unfilteredTasksArray = Array.from(document.getElementById("taskCards").querySelectorAll(".card"));
  if (unfilteredTasksArray) {
    let filterLetters = document.getElementById("searchTasksField").value.toLowerCase();
    if (filterLetters) {
      let filteredTasksArray = unfilteredTasksArray.filter(
        (element) => element.childNodes[3].children[0].innerHTML.toLowerCase().includes(filterLetters) || element.childNodes[3].children[1].innerHTML.toLowerCase().includes(filterLetters)
      );
      let noneShownTasks = unfilteredTasksArray.filter((element) => !filteredTasksArray.includes(element));
      unfilteredTasksArray.forEach((element) => element.classList.remove("d_none"));
      noneShownTasks.forEach((element) => element.classList.add("d_none"));
    } else {
      unfilteredTasksArray.forEach((element) => element.classList.remove("d_none"));
      return;
    }
  } else {
    return;
  }
}
