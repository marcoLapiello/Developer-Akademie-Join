export function getTaskTemplate() {
  return /*html*/ `
    <div onclick="closeDropdownFromWindow(event, 'contactsToAssign')" id="addTaskContainer" class="addTaskContainer">
              <h1>Add Task</h1>

              <div id="addTaskMiddleContent" class="addTaskMiddleContent">
                <div id="addTaskMiddleLeft" class="addTaskMiddleLeft">
                  <div>
                    <p>Title<span style="color: red">*</span></p>
                    <input id="taskTitleInput" class="taskTitleInput" type="text" placeholder="Enter a title" />
                  </div>

                  <div>
                    <p>Description</p>
                    <textarea name="" id="taskDescription" placeholder="Enter a description"></textarea>
                  </div>

                  <div class="assignedToContainer">
                    <p>Assigned to</p>
                    <div class="">
                      <div id="assignedToDropdown" class="assignedToDropdown">
                        <input
                          onfocus="renderUserDropdownList(); openUsersDropdownList('assignedToDropdownArrow' , 'contactsToAssign')"
                          oninput="filterUsersByName()"
                          id="searchUserToAssign"
                          class="searchUserToAssign"
                          type="text"
                          placeholder="Select contacts to assign"
                        />
                        <img
                          onclick="openCloseDropdown('assignedToDropdownArrow' , 'contactsToAssign') , renderUserDropdownList()"
                          id="assignedToDropdownArrow"
                          class="assignedToDropdownArrow"
                          src="./assets/icons/arrow_drop_down.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <div id="contactsToAssign" class="contactsToAssign d_none"></div>
                    <div id="currentAssignation" class="currentAssignation"></div>
                  </div>
                </div>
                <div class="addTaskSeparator"></div>
                <div id="addTaskMiddleRight" class="addTaskMiddleRight">
                  <div>
                    <p>Due date<span style="color: red">*</span></p>
                    <input id="taskDueDate" type="date" placeholder="dd/mm/yyyy" />
                  </div>
                  <div>
                    <p>Prio</p>
                    <div id="prioContainer" class="prioContainer">
                      <div onclick="selectPrio(event)" id="prioUrgent" class="priorities">
                        Urgent
                        <img src="./assets/icons/urgent_icon.png" alt="" />
                      </div>
                      <div onclick="selectPrio(event)" id="prioMedium" class="priorities mediumPrio">
                        Medium
                        <img src="./assets/icons/medium_icon.png" alt="" />
                      </div>
                      <div onclick="selectPrio(event)" id="prioLow" class="priorities">
                        Low
                        <img src="./assets/icons/low_icon.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>Category<span style="color: red">*</span></p>
                    <div>
                      <div onclick="openCloseDropdown('categoryDropdownArrow' , 'categorySelectionContainer')" id="categoryDropdown" class="categoryDropdown">
                        <span id="taskCategory">Select task category</span>
                        <img
                          id="categoryDropdownArrow"
                          class="categoryDropdownArrow"
                          src="./assets/icons/arrow_drop_down.png"
                          alt=""
                        />
                        <div id="categorySelectionContainer" class="categorySelectionContainer d_none">
                          <p onclick="selectCategory('Technical task'); openCloseDropdown('categoryDropdownArrow' , 'categorySelectionContainer')">Technical task</p>
                          <p onclick="selectCategory('User story'); openCloseDropdown('categoryDropdownArrow' , 'categorySelectionContainer')">User story</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>Subtasks</p>
                    <div class="addSubtaskContainer">
                      <div class="subtaskInputContainer">
                        <input id="subtaskInput" class="subtaskInput" type="text" placeholder="Add a new subtask" />
                        <div onclick="createNewSubtask('add', 'subtaskInput', 'subtaskContainer')" id="renderSubtaskElement" class="newSubtaskPlusBtn">
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/ svg">
                            <path
                              d="M8.66602 11.3327H0.666016V8.66602H8.66602V0.666016H11.3327V8.66602H19.3327V11.3327H11.3327V19.3327H8.66602V11.3327Z"
                              fill="black"
                            />
                          </svg>
                        </div>
                      </div>
                      <ul class="subtaskContainer" id="subtaskContainer"></ul>
                    </div>
                  </div>
                </div>
              </div>
              <div id="addTaskBottomContainer" class="addTaskBottomContainer">
                <p><span style="color: red">*</span>This field is required</p>
                <div id="taskBtnContainer" class="taskBtnContainer">
                  <button class="clearBtn" onclick="clearAddTaskHTML()">
                    Clear
                    <img src="./assets/icons/x_btn.svg" alt="" />
                  </button>
                  <button onclick="patchNewTask()" class="createBtn" onclick="">
                    Create Task
                    <img src="./assets/icons/check.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
  `;
}
