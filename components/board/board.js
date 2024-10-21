import { returnIcon } from "../icons.js";
import { getTasksArray } from "../../js/script.js";

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

let unfilteredTasksArray;

export async function getUnfilteredTasksArray() {
  unfilteredTasksArray = await getTasksArray();
}

export function getFilteredTasksArray() {

  if (unfilteredTasksArray) {
    let filterLetters = document.getElementById("searchTasksField").value.toLowerCase();
    return unfilteredTasksArray.filter(
      (element) => element[1].title.toLowerCase().includes(filterLetters) || element[1].description.toLowerCase().includes(filterLetters)
    );
    // console.log(filtered); zum testen return gegen variable "let filtered" austauschen
  } else {
    return;
  }
}
