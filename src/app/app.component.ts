import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './services/auth/auth.service';
import { GlobalService } from './services/global/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'eBudgetingUI';
  sessionUser: any;
  selectedCalender: any;
  calenderList: any;
  constructor(
    public authService: AuthService,
    public router: Router,
    private spinner: NgxSpinnerService,
    public globalService: GlobalService,
  ) {}
  ngOnInit(): void {}
}
