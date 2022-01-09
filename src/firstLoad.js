import Project from "./project";
import Task from "./task";
import { compareAsc, format } from "date-fns";

const page = document.querySelector("#content");
const header = document.createElement("div");
const mid = document.createElement("div");
const footer = document.createElement("div");
footer.textContent = "Property of Darren Le";

// Function to check if Webstorage is available
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    let x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

// Load content of the page
function loadContent() {
  let name = null;
  // Get user input
  const form = document.createElement("form");
  const getInput = document.createElement("input");
  const btnModal = document.createElement("div");
  getInput.setAttribute("id", "ProjectInput");
  getInput.setAttribute("type", "text");
  getInput.setAttribute("placeholder", "Enter your Project's name");
  const submitbtn = document.createElement("button");
  submitbtn.textContent = "Submit";
  submitbtn.setAttribute("class", "Submit");
  submitbtn.setAttribute("type", "button");
  form.appendChild(getInput);
  form.appendChild(btnModal);
  btnModal.appendChild(submitbtn);
  // Create new Project when submitting the form
  submitbtn.addEventListener("click", () => {
    name = document.getElementById("ProjectInput").value;
    if (name) {
      let project = new Project(name);
      projectArr.push(project);
      const project1 = document.createElement("div");
      const projectTile = document.createElement("span");
      project1.textContent = project.getName();
      projects.appendChild(projectTile).classList.add("tile");
      projectTile.appendChild(project1);
      displayTasks(projectTile);
    }
    // Hide form and show button again
    form.style.display = "none";
    addProjectBtn.style.display = "flex";
  });

  // Project array
  const projectArr = [];

  // Header content
  const homeBtn = document.createElement("button");
  homeBtn.textContent = "To-Do-List";
  homeBtn.addEventListener("click", () => {
    location.reload();
  });

  // Main content
  const projectList = document.createElement("div");
  const projects = document.createElement("div");
  const tasklist = document.createElement("div");
  const addProjectBtn = document.createElement("button");
  addProjectBtn.textContent = " + New Project";
  addProjectBtn.classList.add("newProject");

  // Template Project
  const example = document.createElement("div");
  const exampleProject = new Project("Tutorial");
  projectArr.push(exampleProject);
  const exampleName = document.createElement("div");
  const exampleTile = document.createElement("span");
  exampleName.textContent = exampleProject.getName();
  projects.appendChild(exampleTile).classList.add("tile");
  exampleTile.appendChild(exampleName);
  displayTasks(exampleTile);
  const task1 = new Task("This is where your tasks show up", "12/31/2022");
  const task2 = new Task("The deadline is on the right", "11/12/2023");
  const task3 = new Task(
    "Click on the calendar symbol to change deadline",
    "01/05/2024"
  );
  exampleProject.addTask(task1);
  exampleProject.addTask(task2);
  exampleProject.addTask(task3);

  // Create new Project button
  addProjectBtn.addEventListener("click", () => {
    // Hide the button and display form when clicked
    addProjectBtn.style.display = "none";
    form.style.display = "flex";
  });

  const title = document.createElement("p");
  title.textContent = "Welcome to your To Do List!";

  // Display tasks in a project
  function displayTasks(projectBtn) {
    projectBtn.addEventListener("click", () => {
      title.textContent = projectBtn.textContent;
      addTaskBtn.setAttribute("id", title.textContent);
      // Clear screen
      while (tasks.firstChild) {
        tasks.removeChild(tasks.firstChild);
      }
      for (let i = 0; i < projectArr.length; i++) {
        if (projectArr[i].getName() == projectBtn.textContent) {
          showAll(projectArr[i]);
        }
      }
      tasks.appendChild(addTaskBtn);
    });
  }

  // Display all tasks in a project when chosen
  function showAll(project) {
    const arr = project.getTasks();
    for (let i = 0; i < arr.length; i++) {
      const taskName = document.createElement("div");
      const taskDate = document.createElement("div");
      taskName.textContent = arr[i].getName();
      taskDate.textContent = arr[i].getDate();
      const taskTile = document.createElement("span");
      tasks.appendChild(taskTile).classList.add("taskTile");
      taskTile.appendChild(taskName);
      taskTile.appendChild(taskDate);
    }
  }

  // Tasks section
  const tasks = document.createElement("div");
  const addTaskBtn = document.createElement("button");
  addTaskBtn.textContent = " + New task";
  addTaskBtn.classList.add("newTask");

  // Add new Task to the Project
  addTaskBtn.addEventListener("click", () => {
    let name = prompt("Enter the name of the task:");
    if (name) {
      const task = new Task(name);
      for (let i = 0; i < projectArr.length; i++) {
        if (projectArr[i].getName() == addTaskBtn.id) {
          projectArr[i].addTask(task);
        }
      }
      const taskName = document.createElement("div");
      taskName.textContent = task.getName();
      const taskTile = document.createElement("span");
      tasks.insertBefore(taskTile, tasks.lastChild).classList.add("taskTile");
      taskTile.appendChild(taskName);
    }
  });

  // Build UI
  page.appendChild(header).classList.add("header");
  header.appendChild(homeBtn).classList.add("homeBtn");

  page.appendChild(mid).classList.add("mid");
  mid.appendChild(projectList).classList.add("projectList");
  projectList.appendChild(projects).classList.add("allProjects");

  projectList.appendChild(form);
  form.style.display = "none";
  projectList.appendChild(addProjectBtn);

  mid.appendChild(tasklist).classList.add("taskList");
  tasklist.appendChild(title).classList.add("title");
  tasklist.appendChild(tasks).classList.add("allTasks");

  page.appendChild(footer).classList.add("footer");
}

export { loadContent };
