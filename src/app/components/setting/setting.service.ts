import { Injectable } from '@angular/core';
import { Note } from '../../models/note/note';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  /**
   * Enable or disable notes
   */
  enableNote: boolean = true;

  /**
   * Enable or disable tasks
   */
  enableTask: boolean = true;

  /**
   * Enable or disable color of note
   */
  enableNoteColor: boolean = true;

  /**
   * Default color for new notes
   * Default value for this setting is the first note color (white)
   */
  defaultNoteColor: string = Note.colors[0];

  constructor() {
    /**
     * Load settings if there are settings
     */
    if (localStorage.getItem('settings')) {
      this.load();
    } else {
      this.save();
    }
  }

  /**
   * Save all settings in 'settings' in localStorage
   */
  save() {
    localStorage.setItem('settings', JSON.stringify({
      enableNote: this.enableNote,
      enableTask: this.enableTask,
      enableNoteColor: this.enableNoteColor,
      defaultNoteColor: this.defaultNoteColor,
    }));
  }

  /**
   * Load all settings from 'settings' in localStorage
   */
  load() {
    const settings: object = JSON.parse(localStorage.getItem('settings'));

    this.enableTask = settings['enableTask'];
    this.enableNote = settings['enableNote'];
    this.enableNoteColor = settings['enableNoteColor'];
    this.defaultNoteColor = settings['defaultNoteColor'];
  }
}
