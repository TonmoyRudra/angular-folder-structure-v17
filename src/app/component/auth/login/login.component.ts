import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { confirm, alert } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';
import { DxButtonModule } from 'devextreme-angular';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { GlobalService } from 'src/app/services/global/global.service';
import { EmployeePaginationParams } from 'src/app/shared/models/PaginationParams';
 import { IResult } from 'src/app/shared/models/result';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm;
  errorMsg;
  model: any = {};
  loading = false;
  calenderList: any;
  passwordButton: { icon: string; type: string; onClick: () => void };
  passwordMode: string;
  employeePaginationParams: EmployeePaginationParams =
    new EmployeePaginationParams();

  constructor(
    public authService: AuthService,
    private router: Router,
    public globalService: GlobalService,
     public localStorageService: LocalStorageService,
  ) {
    this.passwordMode = 'password';
    this.passwordButton = {
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7klEQVRYw+2YP0tcQRTFz65xFVJZpBBS2O2qVSrRUkwqYfUDpBbWQu3ELt/HLRQ/Q8RCGxVJrRDEwj9sTATxZ/Hugo4zL/NmV1xhD9xi59177pl9986fVwLUSyi/tYC+oL6gbuNDYtyUpLqkaUmfJY3a+G9JZ5J2JW1J2ivMDBSxeWCfeBxYTHSOWMcRYLOAEBebxtEVQWPASQdi2jgxro4E1YDTQIJjYM18hszGbew4EHNq/kmCvgDnHtI7YBko58SWgSXg1hN/btyFBM0AlwExczG1YDZrMS4uLUeUoDmgFfjLGwXEtG05wNXyTc4NXgzMCOAIGHD8q0ATuDZrempkwGJ9+AfUQ4K+A/eEseqZ/UbgdUw4fqs5vPeW+5mgBvBAPkLd8cPju+341P7D/WAaJGCdOFQI14kr6o/zvBKZYz11L5Okv5KGA89Kzu9K0b0s5ZXt5PjuOL6TRV5ZalFP4F+rrnhZ1Cs5vN6ijmn7Q162/ThZq9+YNW3MbfvDAOed5cxdGL+RFaUPKQtjI8DVAr66/u9i6+jJzTXm+HFEVqxVYBD4SNZNKzk109HxoycPaG0bIeugVDTp4hH2qdXJDu6xOAAWiuQoQdLHhvY1aEZSVdInG7+Q9EvSz9RrUKqgV0PP3Vz7gvqCOsUj+CxC9LB1Dc8AAAASdEVYdEVYSUY6T3JpZW50YXRpb24AMYRY7O8AAAAASUVORK5CYII=',
      type: 'default',
      onClick: () => {
        this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
      },
    };
  }

  ngOnInit() {
    this.loginForm = new UntypedFormGroup({
      UserName: new UntypedFormControl(
        '',
        Validators.compose([Validators.required]),
      ),
      Password: new UntypedFormControl(
        '',
        Validators.compose([Validators.required]),
      ),
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    this.globalService.showSpinner(true);
    const { UserName, password } = this.model;
    this.model.id = 0;
    this.loading = true;
    this.globalService.isLoginRequest = true;
    this.authService.signIn(UserName, password).subscribe(
      (result) => {
        if (result) {
          if (result.menus.length != 0) {
            this.globalService.isLoginRequest = false;
            setTimeout(() => {
              this.globalService.showSpinner(false);
               //this.router.navigate(['/home']);
            }, 1000);
          } else {
            this.loading = false;
            this.globalService.showSwalWithToast(
              'Warning',
              'You are not Authorized for this system. Please Contact with the respective Person of BSRM IT.',
              'warning',
              5000,
            );
            // notify('You are not Authorized for this system. Please Contact with the respective Person of BSRM IT.','error',5000);
            this.logout();
            this.globalService.showSpinner(false);
          }
        }
      },
      (error) => {
        this.globalService.showSpinner(false);
        this.loading = false;
        if (error.error.statusCode == 500) {
          this.errorMsg = 'A network-related Error or Internal Server Error';
        } else {
          this.errorMsg = 'Invalid UserName or Password';
        }
        notify(this.errorMsg, 'error', 5000);
        // notify(this.errorMsg,'error',2000);
      },
    );
  }

  loggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    const res = this.authService.logout();
    if (res) {
      console.log('logout success');
      this.router.navigateByUrl('/auth');
    }
  }

 
}
