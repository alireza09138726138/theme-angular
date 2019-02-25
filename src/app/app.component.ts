import { Component } from '@angular/core';
import { Task } from './models/task/task';

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
   * Task to add from input
   */
  taskToAdd: string;

  pickedDate: string;

  constructor() {
    this.loadTasks();
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
        this.tasks.push(new Task(item.name, item.done, new Date(item.date)));

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
   * Add a task to task list and save to localStorage
   */
  addTask() {
    this.tasks.unshift(new Task(this.taskToAdd, false, new Date(this.pickedDate)));
    this.saveTasks();
    this.taskToAdd = '';
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
}

