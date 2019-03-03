import { SettingService } from './setting.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(private setting: SettingService) { }

  ngOnInit() {
  }
}

