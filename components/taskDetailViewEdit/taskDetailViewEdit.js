import { returnIcon } from "../icons.js";
import { getTasksArray } from "../../js/script.js";
import { currentPrio, setGlobalVariablesToDefault, getSubtaskTemplate, newTaskObject } from "../addTask/addTask.js";
import { overwriteSelectedUsers, selectedUsers, renderUserDropdownList } from "../addTask/userDropdown.js";
import { toggleTaskDetailView } from "../taskDetailView/taskDetailView.js";
import { patchTaskUpdate } from "../../js/tasksApiService.js";

// Get the new values from the input fields
function getEditInputValues() {
  const titleInput = document.getElementById("taskTitleInput").value; // Get the new title input value
  const descriptionInput = document.getElementById("taskDescription").value; // Get the new description input value
  const dueDateInput = document.getElementById("taskDueDate").value; // Get the new due date input value
  const priorityInput = currentPrio; // Get the new prio input value
  return { titleInput, descriptionInput, dueDateInput, priorityInput };
}

// Get the new values from the input fields over the Funktion getEditInputValues and push the new values to the database
export async function getEditTaskData(taskID) {
  let tasksArray = await getTasksArray(); // Fetch tasks array to get the task data for the task ID
  const taskData = tasksArray.find(([id]) => id === taskID)[1]; // Find the task data for the task ID in the tasks array
  const { titleInput, descriptionInput, dueDateInput, priorityInput } = getEditInputValues(); // Get the new values from the input fields
  if (titleInput) taskData.title = titleInput;
  if (descriptionInput) taskData.description = descriptionInput;
  if (dueDateInput) taskData.dueDate = dueDateInput;
  if (priorityInput) taskData.priority = priorityInput;
  if (selectedUsers) taskData.assignedTo = selectedUsers;
  if (newTaskObject.subtasks) taskData.subtasks = newTaskObject.subtasks;
  patchTaskUpdate(taskData, taskID, taskData.status); // Patch the task update
  setGlobalVariablesToDefault(); // Set the global variables to default
  overwriteSelectedUsers(""); // Overwrite the selected users
  toggleTaskDetailView(); // Toggle the task detail view
}

// The function renders the task detail view edit template
export async function renderTaskDetailViewEdit(taskID) {
  let tasksArray = await getTasksArray(); // Fetch tasks array
  const taskData = tasksArray.find(([id]) => id === taskID)[1]; // Find the task data for the task ID in the tasks array
  const taskDetailViewRef = document.getElementById("taskDetailView"); // Get task detail view element
  taskDetailViewRef.innerHTML = renderTaskDetailViewEditTemplate(taskData); // Render the task detail view edit template
  setEditInputValues(taskData); // Set the input values to the task data
}

function setEditInputValues(taskData) {
  document.getElementById("taskTitleInput").value = taskData.title;
  document.getElementById("taskDescription").value = taskData.description;
  document.getElementById("taskDueDate").value = taskData.dueDate;
  Object.entries(taskData.subtasks).forEach(([key, subtask]) => {
    if (key !== "placeholder") {
      newTaskObject.subtasks[key] = subtask;
      document.getElementById("subtaskContainer").innerHTML += getSubtaskTemplate(subtask.task, subtask.id);
    }
  });
  const assignedUsers = Object.values(taskData.assignedTo).filter((value) => value !== "placeholder");
  overwriteSelectedUsers(assignedUsers);
  renderUserDropdownList();
}

// The function renders the task detail view edit template
function renderTaskDetailViewEditTemplate(taskData) {
  return /*html*/ `
    <div class="taskDetailViewCardEdit" onclick="removeHighlightSubtaskDivBorder(event)"> 
        <div class="header">
            <div onclick="toggleTaskDetailView()" class="closeButton">${returnIcon("closeX")}</div>
        </div>      
        <div class="titleContainer">
          <p class="title">Title<span style="color: red">*</span></p>
          <input oninput="validateTaskTitleByOninput()" id="taskTitleInput" class="taskTitleInput" type="text" placeholder="Enter a title" />
          <p class="addTaskValidationWarning"><span id="taskTitleWarning" class="d_none">Insert a title longer than 3 letters</span>&nbsp;</p>
        </div>
        <div class="descriptionContainer">
          <p class="description">Description</p>
          <textarea name="" id="taskDescription" class="taskDescriptionInput" placeholder="Enter a description"></textarea>
        </div>     
        <div class="dueDateContainer">
          <p class="dueDate" >Due date<span style="color: red">*</span></p>
          <input onchange="validateTaskDateInput()" id="taskDueDate" class="taskDueDateInput" type="date" placeholder="dd/mm/yyyy" />
          <p class="addTaskValidationWarning"><span id="taskDateWarning" class="d_none">Due date must be today or later</span>&nbsp;</p>
        </div>
        <div class="priorityContainer">
          <p class="priority">Priority</p>
          <div id="prioContainer" class="prioContainer">
          <div onclick="selectPrio(event)" id="prioUrgent" class="priorities ${
            taskData.priority.toLowerCase() == "urgent" ? "urgentPrio" : ""
          }">Urgent<img src="./assets/icons/urgent_icon.png" alt="" /></div>
          <div onclick="selectPrio(event)" id="prioMedium" class="priorities ${
            taskData.priority.toLowerCase() == "medium" ? "mediumPrio" : ""
          }">Medium<img src="./assets/icons/medium_icon.png" alt="" /></div>
          <div onclick="selectPrio(event)" id="prioLow" class="priorities ${
            taskData.priority.toLowerCase() == "low" ? "lowPrio" : ""
          }">Low<img src="./assets/icons/low_icon.png" alt="" /></div>
          </div>
        </div>
        <div class="assignedToContainer">
          <p class="assignedTo">Assigned to</p>          
          <div class="assignedToDropdown" id="assignedToDropdown">
              <input id="searchUserToAssign" class="searchUserToAssign" 
              onfocus="openUserDropdownFromUserInput()" oninput="filterUsersByName()" type="text" placeholder="Select contacts to assign" />
              <img id="assignedToDropdownArrow" class="assignedToDropdownArrow" 
              onclick="openCloseDropdown('assignedToDropdownArrow' , 'contactsToAssign') , renderUserDropdownList()" src="./assets/icons/arrow_drop_down.png" alt="" />
          </div>
        </div>

        <div id="contactsToAssign" class="contactsToAssign d_none"></div>

        <div id="currentAssignation" class="currentAssignation"></div>   

        <div class="subtasksContainer">
          <p class="subtasks">Subtasks</p>
          <div class="addSubtaskContainer">
            <div onclick="setHighlightSubtaskDivBorder()" id="subtaskInputContainer" class="subtaskInputContainer">
              <input id="subtaskInput" class="subtaskInput" type="text" placeholder="Add a new subtask" />
              <div onclick="createNewSubtask('add', 'subtaskInput', 'subtaskContainer')" id="renderSubtaskElement" class="newSubtaskPlusBtn">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/ svg">
                  <path d="M8.66602 11.3327H0.666016V8.66602H8.66602V0.666016H11.3327V8.66602H19.3327V11.3327H11.3327V19.3327H8.66602V11.3327Z" fill="black" />
                </svg>
              </div>
            </div>
            <ul class="subtaskContainer" id="subtaskContainer"></ul>
          </div>
        </div>   
        
        
        <div id="addTaskBottomContainer" class="addTaskBottomContainer">
          <p><span style="color: red">*</span>This field is required</p>
          <div id="taskBtnContainer" class="taskBtnContainer">
            <button onclick="getEditTaskData('${taskData.id}')" class="createBtn" onclick="">Ok${returnIcon("check", "check")}</button>
          </div>
        </div>
    </div>
    `;
}
