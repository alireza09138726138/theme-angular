export class Task {
  name: string;
  done: boolean;
  date: Date;
  pin: boolean;
  archive: boolean;
  selected: boolean;

  constructor(name: string, done: boolean, date: Date, pin: boolean, archive: boolean, selected: boolean) {
  this.name = name;
  this.done = done;
  this.date = date;
  this.pin = pin;
  this.archive = archive;
  this.selected = selected;
}
}
