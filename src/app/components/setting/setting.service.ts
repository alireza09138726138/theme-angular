import { Injectable } from '@angular/core';

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

  constructor() {
    /**
     * Load settings if there are settingss
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
    }));
  }

  /**
   * Load all settings from 'settings' in localStorage
   */
  load() {
    const settings: object = JSON.parse(localStorage.getItem('settings'));

    this.enableNote = settings['enableNote'];
    this.enableTask = settings['enableTask'];
  }
}
