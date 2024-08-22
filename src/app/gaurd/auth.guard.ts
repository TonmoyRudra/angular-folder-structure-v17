import { AuthService } from '../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { MasterSetupService } from '../services/master-setup/master-setup.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { ISessionUser } from '../shared/models/SessionUser.Interace';

@Injectable()
export class AuthGuard {
  constructor(
    private router: Router,
    private authService: AuthService,
    public masterSetupService: MasterSetupService,
    public localStorageService: LocalStorageService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {  
    if (
      route.routeConfig.path === 'login' ||
      route.routeConfig.path === 'signup'
    ) {
      if (this.authService.isLoggedIn()) {
        let sessionUser: ISessionUser =
          this.localStorageService.getSessionUser();
        this.masterSetupService
          .getEmailApproverListByHrId(sessionUser.hrEmpId)
          .subscribe();
        this.router.navigateByUrl('/home');
      } else {
        return true;
      }
    } else {
      if (this.authService.isLoggedIn()) {
        let sessionUser: ISessionUser =
          this.localStorageService.getSessionUser();
        this.masterSetupService
          .getEmailApproverListByHrId(sessionUser.hrEmpId)
          .subscribe();
        return true;
      } else {
        this.authService.lastUrl = window.location.href; // this is the url of current route.
        this.router.navigateByUrl('/auth');
        // window.location.href = this.globalService.ssoBracUrl;
        return false;
      }
    }
  }
}
