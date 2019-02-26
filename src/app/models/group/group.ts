import {Task} from '../task/task';

export class Group {
  name: string;
  tasks: Array<Task> = [];

  constructor(name: string, tasks: Array<Task> = []) {
    this.name = name;
    this.tasks = tasks;
  }
}
