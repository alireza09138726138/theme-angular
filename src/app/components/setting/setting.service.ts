import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  enableNote: boolean = true;
  enableTask: boolean = true;

  constructor() {
    if (localStorage.getItem('settings')) {
      this.load();
    } 
    else {
      this.save();
    }
  }

  save() {
    localStorage.setItem('settings', JSON.stringify({
      'enableNote': this.enableNote,
      'enableTask': this.enableTask,
    }))
  }

  load() {
    const settings: object = JSON.parse(localStorage.getItem('settings'));

    this.enableNote = settings['enableNote'];
    this.enableTask = settings['enableTask'];
  }
}
