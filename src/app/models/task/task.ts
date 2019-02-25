export class Task {
  name: string;
  done: boolean;
  date: Date;

  constructor(name: string, done: boolean = false, date: Date = null) {
    this.name = name;
    this.done = done;
    this.date = date;
  }
}
