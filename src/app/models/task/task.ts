export class Task {
  name: string;
  done: boolean;

  constructor(name: string, done: boolean = false) {
    this.name = name;
    this.done = done;
  }
}
