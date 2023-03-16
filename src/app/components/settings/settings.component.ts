import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  password: string = '';
  link_url: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  save(){

  }

  save_url(){

  }

}
