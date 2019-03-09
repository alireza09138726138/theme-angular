import { SettingService } from './setting.service';
import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note/note';

@Component({
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  /**
   * List of color of note used for default note color.
   * @see Note.colors
   * @see SettingService.defaultNoteColor
   */
  noteColors: string[];

  constructor(public setting: SettingService) {
    this.noteColors = Note.colors;
  }

  ngOnInit() {
  }

  /**
   * Delete all groups, tasks, notes and settings.
   */
  deleteEverything(): void {
    if (!confirm('Are you sure you want to delete everything?')) {
      return;
    }
    localStorage.clear();
    location.reload();
  }
}

