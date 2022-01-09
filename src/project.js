class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getTasks() {
    return this.tasks;
  }

  addTask(taskObject) {
    this.tasks.push(taskObject);
  }
}

export default Project;
