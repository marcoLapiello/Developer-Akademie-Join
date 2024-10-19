import { returnIcon } from "../icons.js";
import { getTasksArray } from "../../js/script.js";

function getEditInputValues() {
  const titleInput = document.getElementById("titleInput").value; // Get the new title input value
  const descriptionInput = document.getElementById("descriptionInput").value; // Get the new description input value
  const dueDateInput = document.getElementById("dueDateInput").value; // Get the new due date input value
  return { titleInput, descriptionInput, dueDateInput };
}

export function getEditPriority(priority) {
  const priorityButtons = document.querySelectorAll(".priorityButtons"); // Get all priority buttons elements with the class name priorityButtons
  priorityButtons.forEach((button) => {
    button.classList.remove(`selected_${button.id}`); // Remove the selected class from all priority buttons
    if (button.id === priority) {
      button.classList.add(`selected_${priority}`); // Add the selected class to the clicked priority button
    }
  });
}

export async function getEditTaskData(taskID) {
  let tasksArray = await getTasksArray(); // Fetch tasks array to get the task data for the task ID
  const taskData = tasksArray.find(([id]) => id === taskID)[1]; // Find the task data for the task ID in the tasks array
  const { titleInput, descriptionInput, dueDateInput } = getEditInputValues(); // Get the new values from the input fields
  if (titleInput) taskData.title = titleInput;
  if (descriptionInput) taskData.description = descriptionInput;
  if (dueDateInput) taskData.dueDate = dueDateInput;
  // pushToDatabase(taskData); // The is a example function to push the updated task data to the database. The Funktion is not implemented yet.
}

// The function renders the task detail view edit template
export function renderTaskDetailViewEdit(taskID) {
  const taskDetailViewRef = document.getElementById("taskDetailView"); // Get task detail view element
  taskDetailViewRef.innerHTML = renderTaskDetailViewEditTemplate(taskID); // Render the task detail view edit template
}

// The function renders the task detail view edit template
function renderTaskDetailViewEditTemplate(taskID) {
  return /*html*/ `
      <div class="taskDetailViewCardEdit">
        <div class="container">   
          <div class="closeButtonContainer">
            <div onclick="toggleTaskDetailView()" class="closeButton">${returnIcon("closeX")}</div>
          </div>
          <div class="title">
            <label for="titleInput">Title</label>
            <input id="titleInput" type="text">
          </div>
          <div class="description">
            <label for="descriptionInput">Description</label>
            <textarea id="descriptionInput" placeholder="Description"></textarea>
          </div>
          <div class="dueDate">
            <label for="dueDateInput">Due date</label>
            <input id="dueDateInput" type="date">
          </div>
          <div class="priority">
            <span class="title" >Priority</span>
            <div class="priorityButtonsContainer">
              <button onclick="getEditPriority('urgent')" id="urgent" class="priorityButtons">Urgent ${returnIcon("urgent", "urgent")}</button>
              <button onclick="getEditPriority('medium')" id="medium" class="priorityButtons">Medium ${returnIcon("medium", "medium")}</button>
              <button onclick="getEditPriority('low')" id="low" class="priorityButtons">Low ${returnIcon("low", "low")}</button>
            </div>
          </div>
          <div class="assignedTo">
            <label for="assignedToInput">Assigned To</label>
            <input id="assignedToInput" type="text" placeholder="Select contacts to assign">
            <ul id="usersList" class="usersList">
              <!-- render users here -->
            </ul>
          </div>
          <div class="assignUserInitials">
              <!-- render user initials here -->
          </div>
          <div class="subtasks">
            <label for="subtasksInput">Title</label>
            <input id="subtasksInput" type="text" placeholder="Add new Subtasks">
            <ul id="subtasksList" class="subtasksList">
              <!-- render subtasks here -->
            </ul>
          </div>
          <div class="confirmButtonContainer">
            <button onclick="getEditTaskData('${taskID}')" class="confirmButton">OK Icon</button>
          </div>     
        </div>      
      </div>
    `;
}
