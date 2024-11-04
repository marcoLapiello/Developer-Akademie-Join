/**
 * @module "addTaskValidation.js"
 */

/**
 * Validates the inputs for creating a new task.
 *
 * This function checks the validity of the task title, date, and category inputs.
 * If any of these inputs are invalid, the function returns false. Otherwise, it returns true.
 *
 * @returns {boolean} - Returns true if all inputs are valid, otherwise false.
 */
export function validateNewTaskInputs() {
  let isTitleValid = validateTaskTitleInput();
  let isDateValid = validateTaskDateInput();
  let isCategoryValid = validateTaskCategoryInput();
  if (!isTitleValid || !isDateValid || !isCategoryValid) {
    return false;
  }
  return true;
}

/**
 * Validates the task title input field.
 *
 * This function checks the length of the value in the input field with the ID "taskTitleInput".
 * If the length is less than 3 characters, it displays a warning message and changes the input field's border color to red.
 * If the length is 3 characters or more, it hides the warning message and resets the input field's border color.
 *
 * @returns {boolean} - Returns `true` if the input value length is 3 or more characters, otherwise `false`.
 */
export function validateTaskTitleInput() {
  let title = document.getElementById("taskTitleInput").value;
  if (title.length < 3) {
    document.getElementById("taskTitleWarning").classList.remove("d_none");
    document.getElementById("taskTitleInput").classList.remove("borderColorGrey");
    document.getElementById("taskTitleInput").classList.add("borderColorRed");
    return false;
  }
  document.getElementById("taskTitleWarning").classList.add("d_none");
  document.getElementById("taskTitleInput").classList.remove("borderColorRed");
  return true;
}

/**
 * Validates the task due date input field.
 *
 * This function checks if the date entered in the "taskDueDate" input field is valid.
 * It compares the entered date with the current date and ensures that the entered date
 * is not in the past. If the date is invalid, it displays a warning message and changes
 * the input field's border color to red. If the date is valid, it hides the warning message
 * and resets the input field's border color.
 *
 * @returns {boolean} - Returns `true` if the date is valid, otherwise `false`.
 */
export function validateTaskDateInput() {
  let date = document.getElementById("taskDueDate").value;
  let dateToday = new Date(Date.now());
  let formattedDate = dateToday.toISOString().split("T")[0];
  if (!date || date < formattedDate) {
    document.getElementById("taskDateWarning").classList.remove("d_none");
    document.getElementById("taskDueDate").classList.remove("borderColorGrey");
    document.getElementById("taskDueDate").classList.add("borderColorRed");
    return false;
  }
  document.getElementById("taskDateWarning").classList.add("d_none");
  document.getElementById("taskDueDate").classList.remove("borderColorRed");
  return true;
}

/**
 * Validates the task category input by checking if the selected category is valid.
 * If the category is "Select task category", it displays a warning and changes the border color to red.
 * Otherwise, it hides the warning and resets the border color.
 *
 * @returns {boolean} - Returns `false` if the category is "Select task category", otherwise `true`.
 */
export function validateTaskCategoryInput() {
  let category = document.getElementById("taskCategory").innerHTML;
  if (category == "Select task category") {
    document.getElementById("taskCategoryWarning").classList.remove("d_none");
    document.getElementById("categoryDropdown").classList.remove("borderColorGrey");
    document.getElementById("categoryDropdown").classList.add("borderColorRed");
    return false;
  }
  document.getElementById("taskCategoryWarning").classList.add("d_none");
  document.getElementById("categoryDropdown").classList.remove("borderColorRed");
  return true;
}

/**
 * Validates the task title input field by checking the number of characters entered.
 * If the input length is greater than 2, it calls the `validateTaskTitleInput` function
 * and removes the "borderColorRed" class from the input field.
 */
export function validateTaskTitleByOninput() {
  let inputLettersCount = document.getElementById("taskTitleInput").value.length;
  if (inputLettersCount > 2) {
    validateTaskTitleInput();
    document.getElementById("taskTitleInput").classList.remove("borderColorRed");
  }
}
