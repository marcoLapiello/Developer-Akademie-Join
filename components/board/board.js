import { returnIcon } from "../icons.js";
import { getTasksArray } from "../../js/script.js";
import { renderTasks } from "../../components/taskCards/taskCards.js";

function getBoardTemplate() {
  return /*html*/ `
    <div class="boardContainer">
              <!-- board left part -->
              <div class="boardLeft">
                <p>Board</p>
                <button onclick="addNewTask()" class="boardTaskAddBtnSmall">
                  ${returnIcon("plus", "addIcon")}
                </button>
              </div>
              <!-- board right part -->
              <div class="boardRight">
                <div class="taskSearchFieldContainer">
                  <input id="searchTasksField" oninput="getFilteredTasksArray()" type="text" placeholder="Find Task" />
                  <button onclick="getFilteredTasksArray()" class="searchFieldImgButton">
                    ${returnIcon("searchLens")}
                  </button>
                </div>
                <button onclick="addNewTask()" class="boardTaskAddBtnLarge">
                  <p>Add task</p>
                  <div>
                  ${returnIcon("plus", "addIcon")}
                  </div>
                </button>
              </div>
            </div>
  `;
}

export function renderBoardHeadTemplate() {
  const boardRef = document.getElementById("board");
  if (boardRef) {
    boardRef.innerHTML = getBoardTemplate();
  }
}

// function to filter tasksArray

export async function getFilteredTasksArray() {
  let unfilteredTasksArray = Array.from(document.getElementById("taskCards").querySelectorAll(".card"));
  if (unfilteredTasksArray) {
    let filterLetters = document.getElementById("searchTasksField").value.toLowerCase();
    if (filterLetters) {
      let filteredTasksArray = unfilteredTasksArray.filter(
        (element) =>
          element.childNodes[3].children[0].innerHTML.toLowerCase().includes(filterLetters) ||
          element.childNodes[3].children[1].innerHTML.toLowerCase().includes(filterLetters)
      );
      let noneShownTasks = unfilteredTasksArray.filter((element) => !filteredTasksArray.includes(element));
      unfilteredTasksArray.forEach((element) => element.classList.remove("d_none"));
      noneShownTasks.forEach((element) => element.classList.add("d_none"));
    } else {
      return;
    }
  } else {
    return;
  }
}