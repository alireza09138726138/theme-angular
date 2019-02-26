export class Task {
  name: string;
  done: boolean;
  date: Date;
  pin: boolean;

  constructor(name: string, done: boolean, date: Date, pin: boolean) {
    this.name = name;
    this.done = done;
    this.date = date;
    this.pin = pin;
  }
}
