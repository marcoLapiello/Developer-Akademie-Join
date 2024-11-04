/**
 * @module "addTaskSubtasks.js"
 */

import { returnIcon } from "../icons.js";

import { newTaskObject, createSubtaskObject } from "../addTask/addTask.js";

/**
 * Generates the HTML template for a subtask element.
 *
 * @param {string} subtaskText - The text content of the subtask.
 * @param {string} subtaskID - The unique identifier for the subtask.
 * @returns {string} The HTML template string for the subtask element.
 */
export function getSubtaskTemplate(subtaskText, subtaskID) {
  return /*html*/ `
    <div id="subtaskElementWrapper-${subtaskID}" class="subtaskElementWrapper">
      <div id="currentSubtaskBox-${subtaskID}" class="currentSubtaskBox">
        <div class="dotBox">
          ${returnIcon("dot")}
          <p id="currentSubtaskText-${subtaskID}">${subtaskText}</p>
        </div>        
        <div class="subtaskActionBox">
          <div onclick="editSubtask('${subtaskID}')" id="currentSubtaskEdit-${subtaskID}">${returnIcon("editPen")}</div>
          <div class="subtaskSeparator"></div>
          <div onclick="deleteSubtask('${subtaskID}', 'add')" id="currentSubtaskDelete-${subtaskID}">${returnIcon("deleteTrashCan")}</div>
        </div>
      </div>
      <div id="editSubtaskBox-${subtaskID}" class="editSubtaskBox d_none">
        <input id="editSubtaskInput-${subtaskID}" type="text" class="editSubtaskInput">
        <div class="subtaskActionBox">
          <div onclick="deleteSubtask('${subtaskID}', 'add')" id="editSubtaskDelete-${subtaskID}">${returnIcon("deleteTrashCan")}</div>
          <div class="subtaskSeparator"></div>
          <div onclick="saveSubtaskEditing('${subtaskID}', 'add')" id="editSubtaskSave-${subtaskID}">${returnIcon("check_black")}</div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Creates a new subtask element based on the provided parameters.
 *
 * @param {string} card - The type of card operation, either "add" or "edit".
 * @param {string} inputID - The ID of the input element for the subtask.
 * @param {string} containerID - The ID of the container where the subtask element will be rendered.
 */
export function createNewSubtask(card, inputID, containerID) {
  if (card == "add" && document.getElementById("subtaskInput").value) {
    renderSubtaskElement(inputID, containerID);
    document.getElementById("subtaskInput").value = "";
  }
  if (card == "edit") {
  }
}

/**
 * Renders a subtask element and appends it to the specified container.
 *
 * @param {string} inputID - The ID of the input element containing the subtask text.
 * @param {string} containerID - The ID of the container element where the subtask will be appended.
 */
export function renderSubtaskElement(inputID, containerID) {
  let subtaskText = document.getElementById(inputID).value;
  let subtaskID = createSubtaskObject(subtaskText);
  let newSubtaskTemplate = getSubtaskTemplate(subtaskText, subtaskID);
  document.getElementById(containerID).insertAdjacentHTML("beforeend", newSubtaskTemplate);
}

/**
 * Edits a subtask by showing the input field for editing and hiding the current subtask text.
 *
 * @param {string} subtaskID - The unique identifier of the subtask to be edited.
 */
export function editSubtask(subtaskID) {
  document.getElementById(`editSubtaskInput-${subtaskID}`).value = document.getElementById(`currentSubtaskText-${subtaskID}`).innerText;
  document.getElementById(`currentSubtaskBox-${subtaskID}`).classList.add("d_none");
  document.getElementById(`editSubtaskBox-${subtaskID}`).classList.remove("d_none");
}

/**
 * Deletes a subtask from the task object and removes its corresponding HTML element.
 *
 * @param {string} subtaskID - The ID of the subtask to be deleted.
 * @param {string} card - The type of card, should be "add" to perform the deletion.
 */
export function deleteSubtask(subtaskID, card) {
  if (card == "add") {
    document.getElementById(`subtaskElementWrapper-${subtaskID}`).remove();
    delete newTaskObject.subtasks[subtaskID];
  }
}

/**
 * Saves the edited subtask if the input value is not empty. If the input value is empty, deletes the subtask.
 *
 * @param {number} subtaskID - The ID of the subtask being edited.
 * @param {string} card - The type of card, should be "add" to save the subtask.
 */
export function saveSubtaskEditing(subtaskID, card) {
  if (document.getElementById(`editSubtaskInput-${subtaskID}`).value) {
    if (card == "add") {
      document.getElementById(`currentSubtaskText-${subtaskID}`).innerText = document.getElementById(`editSubtaskInput-${subtaskID}`).value;
      newTaskObject.subtasks[subtaskID].task = document.getElementById(`editSubtaskInput-${subtaskID}`).value;
      document.getElementById(`currentSubtaskBox-${subtaskID}`).classList.remove("d_none");
      document.getElementById(`editSubtaskBox-${subtaskID}`).classList.add("d_none");
    } else {
      return;
    }
  } else {
    deleteSubtask(subtaskID, card);
  }
}

/**
 * Adds a blue border color to the subtask input container.
 * This function selects the element with the ID "subtaskInputContainer"
 * and adds the "borderColorBlue" class to it.
 */
export function setHighlightSubtaskDivBorder() {
  document.getElementById("subtaskInputContainer").classList.add("borderColorBlue");
}

/**
 * Removes the highlight border from the subtask input container if the event target is not the subtask input.
 *
 * @param {Event} event - The event object triggered by the user interaction.
 */
export function removeHighlightSubtaskDivBorder(event) {
  if (event.target.id != "subtaskInput") {
    if (document.getElementById("subtaskInputContainer")) {
      document.getElementById("subtaskInputContainer").classList.remove("borderColorBlue");
    }
  }
}
