import { GlobalService } from '../services/global/global.service';
import { AuthService } from '../services/auth/auth.service';

import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { MasterSetupService } from '../services/master-setup/master-setup.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { ISessionUser } from '../shared/models/SessionUser.Interace';
import { UtilsService } from '../services/utils/utils.service';
import { Observable } from 'rxjs';

@Injectable()
export class PreparerGuard {
  constructor(
    private router: Router,
    public authService: AuthService,
    public globalService: GlobalService,
    public masterSetupService: MasterSetupService,
    public localstorageService: LocalStorageService,
    public utilService: UtilsService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    let sessionUser: ISessionUser = this.localstorageService.getSessionUser();
    let emailApproverList = this.localstorageService.getEmailOnlineApprover();

    if (emailApproverList.length > 0 || sessionUser.isAdmin ) {
      return true;
    } else {
      this.router.navigateByUrl('/home');
      this.globalService.showSwalWithToast(
        'Not Authorized',
        'You are not authorised for this Menu',
        'warning',
      );
      return false;
    }

    //   return this.masterSetupService.getEmailApproverList('17020000014490').subscribe(result => {
    //     if (result.statusCode == 200) {
    //         const emailApproverList: any = result.values;
    //         if(emailApproverList.length > 0){
    //           return true;
    //         } else {
    //           this.router.navigateByUrl('/home');
    //           this.globalService.showSwalWithToast('Not Authorized','You are not authorised for this Menu','warning')
    //           return false;
    //         }
    //     }
    // }, err => {
    //   this.router.navigateByUrl('/home');
    //   this.globalService.showSwalWithToast('Not Authorized','You are not authorised for this Menu','warning')
    //   return false;
    // })
  }
}
