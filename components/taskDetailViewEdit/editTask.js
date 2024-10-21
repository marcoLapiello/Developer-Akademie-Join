import { getTasksArray } from "../../js/script.js";
import { patchUpdateSingleSubtaskDatabase, patchUpdateSubtasksProgress } from "../../js/tasksApiService.js";
import { renderTasks } from "../taskCards/taskCards.js";

function calculateCurrentProgress(taskArray, taskID, subtaskId) {
  let currentTask = taskArray.find((task) => task[0] == taskID);
  let subtasksArray = Object.entries(currentTask[1].subtasks);
  let countOfSubtasks = subtasksArray.length - 1;
  let countOfIsDoneSubtasks = subtasksArray.filter((subtask) => subtask[1].isDone == true).length;
  let progress = (countOfIsDoneSubtasks * 100) / countOfSubtasks;
  return progress;
}

export async function updateProgress(taskID, subtaskId, isChecked) {
  await patchUpdateSingleSubtaskDatabase(taskID, subtaskId, isChecked);
  let tasksArray = await getTasksArray();
  let currentProgress = calculateCurrentProgress(tasksArray, taskID, subtaskId);
  await patchUpdateSubtasksProgress(taskID, currentProgress);
  renderTasks();
}
