import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  sessionUser: any;
  menuList: any = [];
  constructor(
    public authService: AuthService,
    public router: Router,
    public globalService: GlobalService,
  ) {
    this.sessionUser = this.authService.getSessionUser();
  }
  ngOnInit(): void {
    //this.collapsiableMenuItemJS();
    this.getMenuFromLocalStorage();
  }

  isPBCPM() {
    return this.authService.isPBCPM();
  }

  getMenuFromLocalStorage() {
    //this.globalService.showSpinner(true);
    this.menuList = this.sessionUser.menus;
    console.log(this.menuList);
    setTimeout(() => {
      this.collapsiableMenuItemJS();
      //this.globalService.showSpinner(false);
    }, 1500);
  }

  // menuList = [
  //   {
  //     id: 1,
  //     name: 'Budget Setup',
  //     routerPath : '2'
  //   },
  //   {
  //     id: 2,
  //     name: 'Production',
  //     routerPath : '1'
  //   },
  //   {
  //     id: 3,
  //     name: 'RM & PM',
  //     routerPath : '3'
  //   },
  //   {
  //     id: 4,
  //     name: 'Expense',
  //     routerPath : ''
  //   },
  //   {
  //     id: 5,
  //     name: 'Common',
  //     routerPath : ''
  //   },
  //   {
  //     id: 6,
  //     name: 'Capital',
  //     routerPath : ''
  //   },
  //   {
  //     id: 7,
  //     name: 'Sales',
  //     routerPath : ''
  //   },
  //   {
  //     id: 8,
  //     name: 'Download',
  //     routerPath : ''
  //   },
  //   {
  //     id: 9,
  //     name: 'Logout',
  //     routerPath : ''
  //   }
  // ]

  collapsiableMenuItemJS() {
    var coll = document.getElementsByClassName('collapsible');
    var i;
    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener('click', function () {
        this.parentElement.classList.toggle('active');
        //var content = this.nextElementSibling;
        //this.nextSibling.classList.toggle('show');
        if (this.nextSibling.classList.contains('show')) {
          this.nextSibling.classList.remove('show');
        } else {
          this.nextSibling.classList.add('show');
        }
      });
    }
  }
}
