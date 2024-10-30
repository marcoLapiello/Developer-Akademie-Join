const baseUrl = "https://join-storage-460c8-default-rtdb.europe-west1.firebasedatabase.app/";

export async function initSummary() {
  let [
    currentTasksAmount,
    urgentTasksAmount,
    toDoAmount,
    inProgressAmount,
    awaitFeedbackAmount,
    doneAmount,
    closestDueDate,
    isDueDateInThePast,
    welcomeMessage,
    loggedInUser
  ] = await getSummaryData();
  const previousPage = sessionStorage.get
  if (window.innerWidth <= 1400 && document.referrer.includes("index.html")) {
    showWelcomeMessageInMobile(welcomeMessage, loggedInUser);
  }
  renderSummary(currentTasksAmount,
    urgentTasksAmount,
    toDoAmount,
    inProgressAmount,
    awaitFeedbackAmount,
    doneAmount,
    closestDueDate,
    isDueDateInThePast,
    welcomeMessage,
    loggedInUser
  );
  
}

async function getSummaryData() {
  let tasks = await loadTasks();
  let currentTasksAmount = tasks.length;
  let urgentTasksAmount = getUrgentTasksAmount(tasks);
  let [closestDueDate, isDueDateInThePast] = getClosestDueDate(tasks);
  let [toDoAmount, inProgressAmount, awaitFeedbackAmount, doneAmount] = getEveryStatusAmount(tasks);
  let welcomeMessage = getWelcomeMessage();
  let loggedInUser = await getLoggedInUser();

  return [
    currentTasksAmount,
    urgentTasksAmount,
    toDoAmount,
    inProgressAmount,
    awaitFeedbackAmount,
    doneAmount,
    closestDueDate,
    isDueDateInThePast,
    welcomeMessage,
    loggedInUser,
  ];
}

async function renderSummary(
  currentTasksAmount,
  urgentTasksAmount,
  toDoAmount,
  inProgressAmount,
  awaitFeedbackAmount,
  doneAmount,
  closestDueDate,
  isDueDateInThePast,
  welcomeMessage,
  loggedInUser
) {
  document.getElementById("summaryContent").innerHTML = getSummaryTemplate(
    currentTasksAmount,
    urgentTasksAmount,
    toDoAmount,
    inProgressAmount,
    awaitFeedbackAmount,
    doneAmount,
    closestDueDate,
    isDueDateInThePast,
    welcomeMessage,
    loggedInUser
  );
}

async function getLoggedInUser() {
  const users = await loadUsers();
  const loggedInUserData = localStorage.getItem("loggedInUserId");
  const convertedLoggedInUserData = JSON.parse(loggedInUserData);
  let loggedInUserName = "";
  for (let index = 0; index < users.length; index++) {
    if (loggedInUserData && users[index][1].id === convertedLoggedInUserData.userID) {
      loggedInUserName = users[index][1].profile.first_name + " " + users[index][1].profile.last_name;
    } else if (!convertedLoggedInUserData.userID) {
      loggedInUserName = "Dear Guest";
    }
  }
  return loggedInUserName;
}

async function loadUsers() {
  let response = await fetch(baseUrl + "user" + ".json");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  let responseAsJson = await response.json();
  let users = Object.entries(responseAsJson);

  return users;
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

function getWelcomeMessage() {
  let welcomeMessage = "";
  const currentDate = new Date();
  const currentDailyHour = currentDate.getHours();
  if (currentDailyHour >= 5 && currentDailyHour <= 11) {
    welcomeMessage = "Good morning,";
  } else if (currentDailyHour >= 12 && currentDailyHour <= 17) {
    welcomeMessage = "Good afternoon,";
  } else if (currentDailyHour >= 18 && currentDailyHour <= 22) {
    welcomeMessage = "Good evening,";
  } else if (currentDailyHour > 22 || currentDailyHour < 5) {
    welcomeMessage = "Good night,";
  }
  return welcomeMessage;
}

function showWelcomeMessageInMobile(welcomeMessage, loggedInUser) {
  document.getElementById("dynamicWelcome").innerHTML = welcomeMessage;
  document.getElementById("dynamicUser").innerHTML = loggedInUser;
  document.getElementById("summaryWelcomeMessageMobile").classList.remove("d_none");
  setTimeout(() => {
    document.getElementById("summaryWelcomeMessageMobile").classList.add("d_none");
  }, 2000);
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

function getSummaryTemplate(
  currentTasksAmount,
  urgentTasksAmount,
  toDoAmount,
  inProgressAmount,
  awaitFeedbackAmount,
  doneAmount,
  closestDueDate,
  isDueDateInThePast,
  welcomeMessage,
  loggedInUser
) {
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
  
                        <div onclick="redirectToBoard()" id="toDoWrapper" class="toDoWrapper">
                            <div id="" class="iconContainer">
                                <img src="./assets/icons/pencil_white.png" alt="">
                            </div>
                            <div id="" class="amountContainer">
                                <p id="amountToDo" class="amount">${toDoAmount}</p>
                                <span>To-do</span>
                            </div>
                        </div>

                        <div onclick="redirectToBoard()" id="DoneWrapper" class="toDoWrapper">
                            <div id="" class="iconContainer">
                                <img src="./assets/icons/check_white_fat.png" alt="">
                            </div>
                            <div id="" class="amountContainer">
                                <p id="amountDone" class="amount">${doneAmount}</p>
                                <span>Done</span>
                            </div>
                        </div>
                      </div>
  
                      <div onclick="redirectToBoard()" id="statusSecondLine" class="statusSecondLine" style = "${
                        isDueDateInThePast ? "border: 2px solid red;" : ""
                      }">
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
                              <p id="urgentDeadline" style="${isDueDateInThePast ? "color: red;" : ""}">${closestDueDate}</p>
                              <span style="${isDueDateInThePast ? "color: red;" : ""}">${
    isDueDateInThePast ? "Deadline missed" : "Upcoming Deadline"
  }</span>
                          </div>
                      </div>
  
                      <div id="statusThirdLine" class="statusThirdLine">
                          <div onclick="redirectToBoard()" id="" class="amountContainer">
                              <p id="amountUrgent" class="amount">${currentTasksAmount}</p>
                              <span>Tasks in Board</span>
                          </div>
                          <div onclick="redirectToBoard()" id="" class="amountContainer">
                              <p id="amountUrgent" class="amount">${inProgressAmount}</p>
                              <span>Tasks In Progress</span>
                          </div>
                          <div onclick="redirectToBoard()" id="" class="amountContainer">
                              <p id="amountUrgent" class="amount">${awaitFeedbackAmount}</p>
                              <span>Awaiting Feedback</span>
                          </div>
                      </div>
                  </div>
  
  
                  <div id="summaryWelcomeMessage" class="summaryWelcomeMessage">
                      <h2 id="dynamicWelcome">${welcomeMessage}</h2>
                      <h1 id="dynamicUser">${loggedInUser}</h1>
                  </div>
              </div>
          </div>
      `;
}

export function redirectToBoard() {
  window.location.href = "./board.html";
}
