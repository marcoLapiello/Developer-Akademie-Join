const baseUrl = "https://join-storage-460c8-default-rtdb.europe-west1.firebasedatabase.app/";

export function initSummary() {
  renderSummary();
}

async function renderSummary() {
  let tasks = await loadTasks();
  let currentTasksAmount = tasks.length;
  let urgentTasksAmount = getUrgentTasksAmount(tasks);
  let [closestDueDate, isDueDateInThePast] = getClosestDueDate(tasks);
  let [toDoAmount, inProgressAmount, awaitFeedbackAmount, doneAmount] = getEveryStatusAmount(tasks);
  document.getElementById("summaryContent").innerHTML = getSummaryTemplate(
    currentTasksAmount,
    urgentTasksAmount,
    toDoAmount,
    inProgressAmount,
    awaitFeedbackAmount,
    doneAmount,
    closestDueDate,
    isDueDateInThePast
  );
}

function getClosestDueDate(tasks) {
  const currentDate = new Date();
  let closestDueDate = null;
  let smallestDateDifference = Infinity;
  let isDueDateInThePast = false;
  for (let index = 0; index < tasks.length; index++) {
    if (tasks[index][1].priority === "Urgent" && tasks[index][1].status !== "done") {
      const dueDate = new Date(tasks[index][1].dueDate);
      const dateDifference = dueDate - currentDate;
      if (dateDifference < smallestDateDifference) {
        smallestDateDifference = dateDifference;
        closestDueDate = dueDate;
      }
    }
  }
  let formattedDate = getFormattedUpcomingDueDate(closestDueDate);
  if (closestDueDate < currentDate) {
    isDueDateInThePast = true;
  }
  return [formattedDate, isDueDateInThePast];
}

function getFormattedUpcomingDueDate(closestDueDate) {
  if (closestDueDate) {
    const formattedDate = closestDueDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  } else {
    const noUrgentDeadline = "No urgent due dates found";
    return noUrgentDeadline;
  }
}

function getEveryStatusAmount(tasks) {
  let toDoAmount = 0;
  let inProgressAmount = 0;
  let awaitFeedbackAmount = 0;
  let doneAmount = 0;
  for (let index = 0; index < tasks.length; index++) {
    if (tasks[index][1].status == "todo") {
      toDoAmount++;
    } else if (tasks[index][1].status == "inProgress") {
      inProgressAmount++;
    } else if (tasks[index][1].status == "awaitFeedback") {
      awaitFeedbackAmount++;
    } else if (tasks[index][1].status == "done") {
      doneAmount++;
    }
  }
  return [toDoAmount, inProgressAmount, awaitFeedbackAmount, doneAmount];
}

function getUrgentTasksAmount(tasks) {
  let currentTasksAmount = 0;
  for (let index = 0; index < tasks.length; index++) {
    if (tasks[index][1].priority == "Urgent") {
      currentTasksAmount++;
    }
  }
  return currentTasksAmount;
}

async function loadTasks() {
  let response = await fetch(baseUrl + "tasks" + ".json");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  let responseAsJson = await response.json();
  let tasks = Object.entries(responseAsJson);

  return tasks;
}

function getSummaryTemplate(currentTasksAmount, urgentTasksAmount, toDoAmount, inProgressAmount, awaitFeedbackAmount, doneAmount, closestDueDate, isDueDateInThePast) {
    return /*html*/ `
          <div id="summaryWrapper" class="summaryWrapper">
  
              <div id="summaryHeadline" class="summaryHeadline">
                  <h1>Join 360</h1>
                  <div class="headlineSeparator"></div>
                  <span>Key Metrics at a Glance</span>
                  <div class="headlineSeparatorMobile"></div>
              </div>
  
              <div id="summaryMiddleContent" class="summaryMiddleContent">
                  <div id="summaryTasksStatus" class="summaryTasksStatus">
                      <div id="statusFirstLine" class="statusFirstLine">
  
                          <div id="toDoWrapper" class="toDoWrapper">
                              <div id="" class="iconContainer">
                                  <img src="./assets/icons/pencil_white.png" alt="">
                              </div>
                              <div id="" class="amountContainer">
                                  <p id="amountToDo" class="amount">${toDoAmount}</p>
                                  <span>To-do</span>
                              </div>
                          </div>
  
                          <div id="DoneWrapper" class="toDoWrapper">
                              <div id="" class="iconContainer">
                                  <img src="./assets/icons/check_white_fat.png" alt="">
                              </div>
                              <div id="" class="amountContainer">
                                  <p id="amountDone" class="amount">${doneAmount}</p>
                                  <span>Done</span>
                              </div>
                          </div>
                      </div>
  
                      <div id="statusSecondLine" class="statusSecondLine" style = "${isDueDateInThePast ? 'border: 2px solid red;' : ''}">
                          <div id="urgentAmountWrapper" class="urgentAmountWrapper">
                              <div id="" class="iconContainer">
                                  <img src="./assets/icons/urgent_Icon_white_big.png" alt="">
                              </div>
                              <div id="" class="amountContainer">
                                  <p id="amountUrgent" class="amount">${urgentTasksAmount}</p>
                                  <span>Urgent</span>
                              </div>
                          </div>
                          <div class="urgentSeparator"></div>
                          <div id="urgentDeadlineContainer" class="urgentDeadlineContainer">
                              <p id="urgentDeadline" style="${isDueDateInThePast ? 'color: red;' : ''}">${closestDueDate}</p>
                              <span style="${isDueDateInThePast ? 'color: red;' : ''}">${isDueDateInThePast ? 'Deadline missed' : 'Upcoming Deadline'}</span>
                          </div>
                      </div>
  
                      <div id="statusThirdLine" class="statusThirdLine">
                          <div id="" class="amountContainer">
                              <p id="amountUrgent" class="amount">${currentTasksAmount}</p>
                              <span>Tasks in Board</span>
                          </div>
                          <div id="" class="amountContainer">
                              <p id="amountUrgent" class="amount">${inProgressAmount}</p>
                              <span>Tasks In Progress</span>
                          </div>
                          <div id="" class="amountContainer">
                              <p id="amountUrgent" class="amount">${awaitFeedbackAmount}</p>
                              <span>Awaiting Feedback</span>
                          </div>
                      </div>
                  </div>
  
  
                  <div id="summaryWelcomeMessage" class="summaryWelcomeMessage">
                      <h2 id="dynamicWelcome">Good morning,</h2>
                      <h1 id="dynamicUser">complete your Function!!</h1>
                  </div>
              </div>
          </div>
      `;
}