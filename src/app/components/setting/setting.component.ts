import { SettingService } from './setting.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(public setting: SettingService) {
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

