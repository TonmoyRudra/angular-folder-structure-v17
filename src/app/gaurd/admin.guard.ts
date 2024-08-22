import { GlobalService } from './../services/global/global.service';
import { AuthService } from './../services/auth/auth.service';

import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class PBCPMAdminGuard {
  constructor(
    private router: Router,
    public authService: AuthService,
    public globalService: GlobalService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    //return true;
    // If path is addStaffmaping
    // if (route.routeConfig.path === 'addStaffMapping') {
    //   if (this.authService.isSMORole() || this.authService.isAdminRole()) {
    //     return true;
    //   } else {
    //     this.router.navigateByUrl('/dashboard');
    //     //window.location.href = this.globalService.ssoBracUrl;
    //     return false;
    //   }
    // } else {
    if (this.authService.isPBCPM()) {
      return true;
    } else {
      this.router.navigateByUrl('/home');
      //window.location.href = this.globalService.ssoBracUrl;
      return false;
    }
    //}
  }
}
