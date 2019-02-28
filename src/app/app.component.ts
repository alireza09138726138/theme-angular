import { Component } from '@angular/core';
import { Task } from './models/task/task';
import { Group } from './models/group/group';
import { Note } from './models/note/note';

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
   * List of notes
   */
  notes: Array<Note> = [];

  /**
   * Task to add from input
   */
  taskToAdd: string;

  /**
   * Group to add from input
   */
  groupToAdd: string;

  /**
   * Group to add from input
   */
  noteToAdd: string;

  /**
   * Date to add from input
   */
  taskDateToAdd: Date;

  constructor() {

    this.loadGroups();
    this.loadNotes();
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
        const group: Group = new Group(item.name);
        // Add all task objects to Task class
        for (const task of item.tasks) {
          group.tasks.push(new Task(task.name, task.done, task.date, task.pin, task.archive));
        }
        for (const task of item.archivedTasks) {
          group.archivedTasks.push(new Task(task.name, task.done, task.date, task.pin, task.archive));
        }
        // Add group to groups
        this.groups.push(group);
      }
    }

    console.log(this.groups);
  }

  /**
   * Load notes from localStorage.
   */
  loadNotes() {
    // Check localStorage for notes
    if (localStorage.getItem('notes')) {
      for (const item of JSON.parse(localStorage.getItem('notes'))) {
        const note: Note = new Note(item.content, item.color);
        this.notes.push(note);
      }
    }
  }

  /**
   * Save groups to localStorage
   */
  saveGroup() {
    localStorage.setItem('groups', JSON.stringify(this.groups));
  }

  /**
   * Save notes to localStorage
   */
  saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  /**
   * Add a task to task list and save to localStorage
   */
  addTask(group: Group) {
    group.tasks.unshift(new Task(this.taskToAdd, false, new Date(this.taskDateToAdd), false, false));
    this.saveGroup();
    this.taskToAdd = '';
  }

  /**
   * Add a group to group list and save to localStorage
   */
  addGroup() {
    this.groups.unshift(new Group(this.groupToAdd, [], []));
    this.saveGroup();
    this.groupToAdd = '';
  }

  /**
   * Add a note to note list and save to localStorage
   */
  addNote() {
    this.notes.unshift(new Note(this.noteToAdd));
    this.saveNotes();
    this.noteToAdd = '';
  }

  /**
   * Delete a task and save to localStorage
   * @todo Delete a task from group
   */
  deleteTask(group: Group, task: Task): void {
    // Show are-you-sure message
    if (!confirm('Are you sure you want to delete?')) {
      return;
    }
    // Find index of task
    const index: number = group.tasks.indexOf(task);
    // Delete task at index
    group.tasks.splice(index, 1);
    // Save to localStorage
    this.saveGroup();
  }


  /**
   * Delete a note and save to localStorage
   *
   */
  deleteNote(note: Note): void {
    // Show are-you-sure message
    if (!confirm('Are you sure you want to delete?')) {
      return;
    }
    // Find index of note
    const index: number = this.notes.indexOf(note);
    // Delete task at index
    this.notes.splice(index, 1);
    // Save to localStorage
    this.saveNotes();
  }


  /**
   * Delete a group and save to localStorage
   *
   */
  deleteGroup(group: Group): void {
    if (!confirm('Are you sure you want to delete?')) {
      return;
    }
    const index: number = this.groups.indexOf(group);
    this.groups.splice(index, 1);
    this.saveGroup();
  }

  pinTask(task: Task): void {
    task.pin = !task.pin;
    this.saveGroup();
  }

  /**
   * archive
   */
  archive(group: Group, task: Task, index: number): void {
    task.archive = !task.archive;

    if (task.archive === true) {
      group.archivedTasks.push(task);
      group.tasks.splice(index, 1);
    } else {
      group.tasks.push(task);
      group.archivedTasks.splice(index, 1);
    }
    this.saveGroup();
  }



  /**
   * Change color of note and save to localStorage
   */
  setNoteColor(note: Note, color: string): void {
    note.color = color;
    this.saveNotes();
  }
}


