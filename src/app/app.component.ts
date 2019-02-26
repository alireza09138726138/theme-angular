import { Component } from '@angular/core';
import { Task } from './models/task/task';
import { Group } from './models/group/group';

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
  groups: Array<Group> = [];

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

  constructor() {
    this.loadTasks();
    this.loadGroups();
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
  loadGroups() {
    // Check localStorage for tasks
    if (localStorage.getItem('groups')) {
      // Tasks are saved in localStorage, loop and add to tasks
      for (const item of JSON.parse(localStorage.getItem('groups'))) {
        // Setup group to add to groups later
        let group: Group = new Group(item.name, item.tasks);
        // Add all task objects to Task class
        for (const task of item.tasks) {
          group.tasks.push(new Task(task.name, task.done, task.date, task.pin));
        }
        // Add group to groups
        this.groups.push(group);
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

