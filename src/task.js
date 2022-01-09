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
    // format Date to MM/DD/YYYY
    const formatted_date = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    this.date = formatted_date;
  }
}

export default Task;
