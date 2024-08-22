import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  sessionUser: any;
  profileName: any;
  showCross: boolean = false;
  isProfilePopUpVisible: boolean = false;
  calenderList: any;
  selectedCalender: any = {
    calendarId: null,
  };
  loginHrEmployeeInfo: any;
  constructor(
    public authService: AuthService,
    public router: Router,
    private spinner: NgxSpinnerService,
    public globalService: GlobalService,
    public localStorageService: LocalStorageService,
  ) {
    this.sessionUser = this.localStorageService.getSessionUser();
    this.loginHrEmployeeInfo = this.localStorageService.getLoginEmployeeInfo();
  }
  ngOnInit(): void {
    this.theamColorChangeJS();
    this.sessionUser = this.authService.getSessionUser();
    this.makeUserProfile();
    //this.getAllCalenderList(0);
  }

  makeUserProfile() {
    this.profileName = this.sessionUser.email.substring(0, 2);
    console.log(this.profileName.toUpperCase());
    this.profileName = this.profileName.toUpperCase();
  }

  logout() {
    const res = this.authService.logout();
    if (res) {
      console.log('logout success');
      this.router.navigateByUrl('/auth');
    }
  }

  showProfile() {
    this.isProfilePopUpVisible = true;
  }

  toggleSidebar() {
    var body = $('body');
    if (
      body.hasClass('sidebar-toggle-display') ||
      body.hasClass('sidebar-absolute')
    ) {
      body.toggleClass('sidebar-hidden');
      // this.showCross = false;
    } else {
      body.toggleClass('sidebar-icon-only');
      // this.showCross = true;
    }
    this.showCross = this.showCross == false ? true : false;
    body.toggleClass('toggleCustom');
  }

  theamColorChangeJS() {
    $(function () {
      $('.nav-settings').on('click', function () {
        $('#right-sidebar').toggleClass('open');
      });
      $('.settings-close').on('click', function () {
        $('#right-sidebar,#theme-settings').removeClass('open');
      });

      $('#settings-trigger').on('click', function () {
        $('#theme-settings').toggleClass('open');
      });

      $('[data-toggle="offcanvas"]').on('click', function () {
        $('.sidebar-offcanvas').toggleClass('active');
      });

      //background constants
      var navbar_classes =
        'navbar-danger navbar-success navbar-warning navbar-dark navbar-light navbar-primary navbar-info navbar-pink';
      var sidebar_classes = 'sidebar-light sidebar-dark';
      var $body = $('body');

      //sidebar backgrounds
      $('#sidebar-light-theme').on('click', function () {
        $body.removeClass(sidebar_classes);
        $body.addClass('sidebar-light');
        $('.sidebar-bg-options').removeClass('selected');
        $(this).addClass('selected');
      });
      $('#sidebar-dark-theme').on('click', function () {
        $body.removeClass(sidebar_classes);
        $body.addClass('sidebar-dark');
        $('.sidebar-bg-options').removeClass('selected');
        $(this).addClass('selected');
      });

      //Navbar Backgrounds
      $('.tiles.primary').on('click', function () {
        $('.navbar').removeClass(navbar_classes);
        $('.navbar').addClass('navbar-primary');
        $('.tiles').removeClass('selected');
        $(this).addClass('selected');
      });
      $('.tiles.success').on('click', function () {
        $('.navbar').removeClass(navbar_classes);
        $('.navbar').addClass('navbar-success');
        $('.tiles').removeClass('selected');
        $(this).addClass('selected');
      });
      $('.tiles.warning').on('click', function () {
        $('.navbar').removeClass(navbar_classes);
        $('.navbar').addClass('navbar-warning');
        $('.tiles').removeClass('selected');
        $(this).addClass('selected');
      });
      $('.tiles.danger').on('click', function () {
        $('.navbar').removeClass(navbar_classes);
        $('.navbar').addClass('navbar-danger');
        $('.tiles').removeClass('selected');
        $(this).addClass('selected');
      });
      $('.tiles.light').on('click', function () {
        $('.navbar').removeClass(navbar_classes);
        $('.navbar').addClass('navbar-light');
        $('.tiles').removeClass('selected');
        $(this).addClass('selected');
      });
      $('.tiles.info').on('click', function () {
        $('.navbar').removeClass(navbar_classes);
        $('.navbar').addClass('navbar-info');
        $('.tiles').removeClass('selected');
        $(this).addClass('selected');
      });
      $('.tiles.dark').on('click', function () {
        $('.navbar').removeClass(navbar_classes);
        $('.navbar').addClass('navbar-dark');
        $('.tiles').removeClass('selected');
        $(this).addClass('selected');
      });
      $('.tiles.default').on('click', function () {
        $('.navbar').removeClass(navbar_classes);
        $('.tiles').removeClass('selected');
        $(this).addClass('selected');
      });
    });
  }
}
