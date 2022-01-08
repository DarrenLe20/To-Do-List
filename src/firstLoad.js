import Project from "./project";
import Task from "./task";

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
  addProjectBtn.setAttribute("id", "newProject");

  // Template Project
  const example = document.createElement("div");
  const exampleProject = new Project("Tutorial");
  const exampleName = document.createElement("div");
  const exampleTile = document.createElement("span");
  exampleName.textContent = exampleProject.getName();
  projects.appendChild(exampleTile).classList.add("tile");
  exampleTile.appendChild(exampleName);
  displayTasks(exampleTile);

  // Create new Project button
  addProjectBtn.addEventListener("click", () => {
    // Get user input
    let name = prompt("Name of the Project: ");
    if (name) {
      let project = new Project(name);
      // Example:
      const project1 = document.createElement("div");
      const projectTile = document.createElement("span");
      project1.textContent = project.getName();
      projects.appendChild(projectTile).classList.add("tile");
      projectTile.appendChild(project1);
      displayTasks(projectTile);
    }
  });

  const title = document.createElement("p");
  title.textContent = "Project Name";

  // Display tasks in a project when chosen
  function displayTasks(projectBtn) {
    projectBtn.addEventListener("click", () => {
      title.textContent = projectBtn.textContent;
    });
  }

  // Tasks section
  const tasks = document.createElement("div");
  const addTaskBtn = document.createElement("button");
  addTaskBtn.textContent = " + New task";
  addTaskBtn.setAttribute("id", "newTask");

  // Build basic UI
  page.appendChild(header).classList.add("header");
  header.appendChild(homeBtn).classList.add("homeBtn");

  page.appendChild(mid).classList.add("mid");
  mid.appendChild(projectList).classList.add("projectList");
  projectList.appendChild(projects).classList.add("allProjects");
  projectList.appendChild(addProjectBtn);
  mid.appendChild(tasklist).classList.add("taskList");
  tasklist.appendChild(title).classList.add("title");
  tasklist.appendChild(tasks).classList.add("allTasks");
  tasks.appendChild(addTaskBtn);

  page.appendChild(footer).classList.add("footer");
}

export { loadContent };
