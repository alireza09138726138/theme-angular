export class Task {
  name: string;
  done: boolean;
  date: Date;

  constructor(name: string, done?: boolean, date?: Date) {
    this.name = name;
    this.done = done ? done : false;
    this.date = date ? date : new Date();
  }
}
