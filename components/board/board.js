import { returnIcon } from "../icons.js";

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
                  <input type="text" placeholder="Find Task" />
                  <button class="searchFieldImgButton">
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
