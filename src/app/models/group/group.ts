import { Task } from '../task/task';

export class Group {
  name: string;
  showArchived: boolean;
  tasks: Array<Task> = [];
  archivedTasks: Array<Task> = [];


  constructor(name: string, tasks: Array<Task> = [], archivedTasks: Array<Task> = []) {
    this.name = name;
    this.showArchived = false;
    this.tasks = tasks;
    this.archivedTasks = archivedTasks;

  }
}
