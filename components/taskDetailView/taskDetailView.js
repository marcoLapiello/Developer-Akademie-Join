import { returnIcon } from "../icons.js";
import { getUsersArray, getTasksArray } from "../../js/script.js";

// The function below is a placeholder until we have the real data structure
// and can fetch the data from the database to render the task detail view.
export async function renderTaskDetailView() {
  let taskID = "TASK3757435747"; // Temporary task ID
  let tasksArray = await getTasksArray(); // Fetch tasks array
  let assignedUsers = await renderAssignedUser(taskID, tasksArray); // Fetch assigned users for the task and render them
  let subtasks = await renderSubtasks(taskID, tasksArray); // Fetch subtasks for the task and render them
  const taskDetailViewRef = document.getElementById("taskDetailView"); // Get task detail view element
  const taskData = tasksArray.find(([id]) => id === taskID)[1]; // Find the task data for the task ID in the tasks array
  if (taskDetailViewRef && taskData) taskDetailViewRef.innerHTML = renderTaskDetailViewTemplate(taskData, assignedUsers, subtasks); // Render the task detail view template with the task data, assigned users and subtasks
}

// The function find the assigned users for a task and returns the user data
// for each user assigned to the task.
export async function getAssignedUsersData(taskID, tasksArray) {
  let usersArray = await getUsersArray(); // Fetch users array
  const taskData = tasksArray.find(([id]) => id === taskID)[1]; // Find the task data for the task ID in the tasks array
  const assignedTo = Object.values(taskData.assignedTo); // Get the assigned users for the task
  const assignedUsers = [];
  assignedTo.forEach((userId) => {
    // Find the user data for each user assigned to the task and push it to the assignedUsers array
    const user = usersArray.find((usersGroup) => usersGroup[1].id === userId);
    if (user) assignedUsers.push(user[1]);
  });
  return assignedUsers;
}

// The function toggles the task detail view on and off
export function toggleTaskDetailView() {
  const taskDetailViewRef = document.getElementById("taskDetailView");
  taskDetailViewRef.classList.toggle("d_none");
}

// The function renders the assigned users for a task and returns the user data as HTML
async function renderAssignedUser(taskID, tasksArray) {
  let assignedUsers = await getAssignedUsersData(taskID, tasksArray); // Fetch assigned users for the task and render them
  let userListHTML = "";
  assignedUsers.forEach((user) => {
    if (user) {
      userListHTML += /*html*/ `
        <li class="userName">
          <span class="userInitials" style="background-color: ${user.user_color}">
            ${user.profile.initials}
          </span>
          ${user.profile.first_name} ${user.profile.last_name}
        </li>
      `;
    }
  });
  return userListHTML;
}

// The function renders the subtasks for a task and returns the subtasks as HTML
async function renderSubtasks(taskID, tasksArray) {
  const taskData = tasksArray.find(([id]) => id === taskID)[1]; // Find the task data for the task ID in the tasks array
  const subtasks = Object.values(taskData.subtasks); // Get the subtasks for the task
  let subtasksListHTML = "";
  subtasks.forEach((subtask) => {
    // Render the subtasks as HTML and push them to the subtasksListHTML
    if (subtask) {
      subtasksListHTML += /*html*/ `
        <li class="subtask" id="subtasksID${subtask.id}">
          <input 
            onchange="checkedSubtask(event,'${taskID}')" 
            type="checkbox" 
            name="${subtask.id}" 
            id="${subtask.id}" 
            class="checkboxSubtask" 
            ${subtask.isDone ? "checked" : ""}>
          ${subtask.task}
        </li>
      `;
    }
  });
  return subtasksListHTML;
}

// The function checks a subtask and updates the task data with the new subtask status
// and returns the updated task data
export async function checkedSubtask(event, taskID) {
  let tasksArray = await getTasksArray(); // Fetch tasks array to get the task data for the task ID
  const taskData = tasksArray.find(([id]) => id === taskID)[1]; // Find the task data for the task ID in the tasks array
  let checkboxId = event.target.id; // Get the checkbox ID the checkbox is the subtask ID
  let isChecked = event.target.checked; // Get the status of the checkbox
  const foundSubtask = taskData.subtasks[checkboxId]; // Find the subtask in the task data with the subtask ID
  if (foundSubtask) foundSubtask.isDone = isChecked; // Update the subtask status with the new status
  console.log(taskData);
  // pushToDatabase(taskData); // The is a example function to push the updated task data to the database. The Funktion is not implemented yet.
}

// The function renders the task detail view template with the subtasks and assigned users data
function renderTaskDetailViewTemplate(currentTask, assignedUsers, subtasks) {
  return /*html*/ `
    <div class="taskDetailViewCard">
        <div class="header"> 
            <div class="category" style="background-color: ${currentTask.categoryColor}">${currentTask.category}</div>
            <div onclick="toggleTaskDetailView()" class="closeButton">${returnIcon("closeX")}</div>
        </div>
        <div class="title">${currentTask.title}</div>
        <div class="description">${currentTask.description}</div>
        <div class="dueDate"><span>Due date:</span>${currentTask.dueDate}</div>
        <div class="priority"><span>Priority:</span>${currentTask.priority}</div>
        <div class="assignedTo">
        <span>Assigned To:</span>
        <ul class="userNames">
            ${assignedUsers}
        </ul>
        <div class="subtasks">
        <span>Subtasks</span>
          <ul>
              ${subtasks}
          </ul>
        </div>
        <div class="buttons">
            <button class="deleteButton">${returnIcon("delete")}Delete</button>
            <button onclick="renderTaskDetailViewEdit('${currentTask.id}')" class="editButton">${returnIcon("edit")}Edit</button>        
            </div>
        </div>
    </div>  
    `;
}

//! Edit Task Detail View

function getEditInputValues() {
  const titleInput = document.getElementById("titleInput").value; // Get the new title input value
  const descriptionInput = document.getElementById("descriptionInput").value; // Get the new description input value
  const dueDateInput = document.getElementById("dueDateInput").value; // Get the new due date input value
  return { titleInput, descriptionInput, dueDateInput };
}

export function getEditPriority(priority) {
  const priorityButtons = document.querySelectorAll(".priorityButtons"); // Get all priority buttons elements with the class name priorityButtons
  priorityButtons.forEach((button) => {
    button.classList.remove(`selected_${button.id}`);
    if (button.id === priority) {
      button.classList.add(`selected_${priority}`);
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
  console.log(taskData);
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
          <span class="userInitials" style="background-color: #FFC700">AB</span>
          <span class="userInitials" style="background-color: #FFC700">CD</span>
          <span class="userInitials" style="background-color: #FFC700">EF</span>
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
