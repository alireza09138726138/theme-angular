import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task/task';
import { Group } from '../../models/group/group';
import { Note } from '../../models/note/note';
import { SettingService } from '../setting/setting.service';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

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

  constructor(public setting: SettingService) {
  }

  ngOnInit() {
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
          group.tasks.push(new Task(task.name, task.done, task.date, task.pin, task.archive, false));
        }
        for (const task of item.archivedTasks) {
          group.archivedTasks.push(new Task(task.name, task.done, task.date, task.pin, task.archive, false));
        }
        // Add group to groups
        this.groups.push(group);
      }
    }
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
    // If date is set, create a Date class, if not set to null
    const date: Date = this.taskDateToAdd ? new Date(this.taskDateToAdd) : null;
    // Add a new task to tasks
    group.tasks.unshift(new Task(this.taskToAdd, false, date, false, false, false));
    // Save to localStorage
    this.saveGroup();
    // Reset task and date input
    this.taskToAdd = '';
    this.taskDateToAdd = null;
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
  deleteTask(tasks: Array<Task>, index: number): void {
    // Show are-you-sure message
    if (!confirm('Are you sure you want to delete?')) {
      return;
    }
    // Delete task at index
    tasks.splice(index, 1);
    // Save to localStorage
    this.saveGroup();
  }


  /**
   * Delete a note and save to localStorage
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
   */
  deleteGroup(group: Group): void {
    if (!confirm('Are you sure you want to delete?')) {
      return;
    }
    const index: number = this.groups.indexOf(group);
    this.groups.splice(index, 1);
    this.saveGroup();
  }

  /**
   * Set a task to pinned an save to localStorage
   */
  pinTask(task: Task): void {
    task.pin = !task.pin;
    this.saveGroup();
  }

  /**
   * Set a task to archived and save to localStorage
   */
  archiveTask(group: Group, task: Task, index: number): void {
    // Change archive status
    task.archive = !task.archive;
    // Move it to a different list (tasks or archivedTasks)
    if (task.archive === true) {
      group.archivedTasks.push(task);
      group.tasks.splice(index, 1);
    } else {
      group.tasks.push(task);
      group.archivedTasks.splice(index, 1);
    }
    // Save to localStorage
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
