const baseUrl =
  "https://join-storage-460c8-default-rtdb.europe-west1.firebasedatabase.app/";

let currentPrio = "medium"; // Funktion schreiben um aus dem Prio Button die Prio in dieser
// Variabel rein zu packen
let currentProgress = 0;
let currentStatus = "In progress";

export function getNewTaskTemplate() {
  let task = {
    id: "TASK" + Date.now(),
    title: document.getElementById("taskTitleInput").value,
    description: document.getElementById("taskDescription").value,
    assignedTo: { notAssigned: "notAssigned" },
    dueDate: document.getElementById("taskDueDate").value,
    creationDate: Date.now(),
    creatorId: "",
    priority: currentPrio,
    category: document.getElementById("categoryDropdown").innerText,
    categoryColor: "",
    progress: currentProgress,
    status: currentStatus,
    subtasks: {
      noSubtask: {
        id: "noSubtask",
      },
    },
  };
  console.log(task);
  return task;
}

export function selectPrio(event) {
  if (event.target == document.getElementById("prioUrgent")) {
    removePrio();
    document.getElementById("prioUrgent").classList.add("urgentPrio");
    currentPrio = "Urgent"
  } else if (event.target == document.getElementById("prioMedium")) {
    removePrio();
    document.getElementById("prioMedium").classList.add("mediumPrio");
    currentPrio = "Medium"
  } else if (event.target == document.getElementById("prioLow")) {
    removePrio();
    document.getElementById("prioLow").classList.add("lowPrio");
    currentPrio = "Low"
  }
}

function removePrio() {
  document.getElementById("prioUrgent").classList.remove("urgentPrio");
  document.getElementById("prioMedium").classList.remove("mediumPrio");
  document.getElementById("prioLow").classList.remove("lowPrio");
}
