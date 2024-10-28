const baseUrl = "https://join-storage-460c8-default-rtdb.europe-west1.firebasedatabase.app/";

export function initSummary() {
  renderSummary();
}

async function renderSummary() {
    let tasks = await loadTasks();
    console.log(tasks);
    // How many in Board (tasks.length)
    let currentTasksAmount = tasks.length;
    console.log(currentTasksAmount);
    // How many Urgent (tasks[index][1].priority == "Urgent")
    let urgentTasksAmount = getUrgentTasksAmount(tasks);
    console.log(urgentTasksAmount);
    // Most urgent deadline (tasks[index][1].dueDate)


    // How many to do (tasks[index][1].status == "todo")
    // How many Done (tasks[index][1].status == "done") 
    // How many in Progress (tasks[index][1].status == "inProgress")
    // How many waits for FeedB (tasks[index][1].status == "awaitFeedback")
    let 
    
    
    
    
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

