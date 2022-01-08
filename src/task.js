import { compareAsc, format } from "date-fns";

class Task {
  constructor(name, date = "No Deadline") {
    this.name = name;
    this.date = date;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getDate() {
    return this.date;
  }

  setDate(date) {
    this.date = date;
  }
}

export default Task;
