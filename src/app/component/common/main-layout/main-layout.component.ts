import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  open() {
    var body = $('body');
    if (
      body.hasClass('sidebar-toggle-display') ||
      body.hasClass('sidebar-absolute')
    ) {
      body.toggleClass('sidebar-hidden');
    } else {
      body.toggleClass('sidebar-icon-only');
    }
  }
}
