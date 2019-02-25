import {Component} from '@angular/core';
import {Task} from './models/task/task';
import {Group} from './models/group/group';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /**
   * List of tasks
   */
  tasks: Array<Task> = [];

  /**
   * List of groups
   */
  groups: Array<Group> = [
    new Group('Hello', [
      new Task('Buy milk', false, null, false),
      new Task('Buy coke', false, null, false),
      new Task('Buy shisha', false, null, false),
    ]),
    new Group('Hello', [
      new Task('Drink milk', false, null, false),
      new Task('Drink coke', false, null, false),
      new Task('Smoke shisha', false, null, false),
    ]),
  ];

  /**
   * Task to add from input
   */
  taskToAdd: string;

  /**
   * Group to add from input
   */
  GroupToAdd: string;

  /**
   * Date to add from input
   */
  pickedDate: string;

  /**
   * load tasks
   */

  constructor() {
    this.loadTasks();
    this.loadgroups();
  }


  /**
   * Load tasks from localStorage.
   */
  loadTasks() {
    // Check localStorage for tasks
    if (localStorage.getItem('tasks')) {
      // Tasks are saved in localStorage, loop and add to tasks
      for (const item of JSON.parse(localStorage.getItem('tasks'))) {
        // Add each task object as Task class
        this.tasks.push(new Task(item.name, item.done, new Date(item.date), item.pin));

      }
    }
  }


  /**
   * Load groups from localStorage.
   */
  loadgroups() {
    // Check localStorage for tasks
    if (localStorage.getItem('groups ')) {
      // Tasks are saved in localStorage, loop and add to tasks
      for (const item of JSON.parse(localStorage.getItem('groups '))) {
        // Add each task object as Task class
        this.groups.push(new Group(item.name));

      }
    }
  }

  /**
   * Save tasks to localStorage
   */
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  /**
   * Save groups to localStorage
   */
  saveGroup() {
    localStorage.setItem('groups', JSON.stringify(this.groups));
  }

  /**
   * Add a task to task list and save to localStorage
   */
  addTask() {
    this.tasks.unshift(new Task(this.taskToAdd, false, new Date(this.pickedDate), false));
    this.saveTasks();
    this.taskToAdd = '';
  }

  /**
   * Add a group to task list and save to localStorage
   */
  addGroup() {
    this.groups.unshift(new Group(this.GroupToAdd, []));
    this.saveGroup();
    this.GroupToAdd = '';
  }

  /**
   * Delete a task and save to localStorage
   */
  deleteTask(task: Task) {
    // Show are-you-sure message
    if (!confirm('Are you sure you want to delete?')) {
      return;
    }
    // Find index of task
    const index: number = this.tasks.indexOf(task);
    // Delete task at index
    this.tasks.splice(index, 1);
    // Save to localStorage
    this.saveTasks();
  }

  pinTask(task: Task) {
    task.pin = !task.pin;
    this.saveTasks();
  }

}

