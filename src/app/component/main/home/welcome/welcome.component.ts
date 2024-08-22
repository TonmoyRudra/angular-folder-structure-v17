import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
 import { GlobalService } from 'src/app/services/global/global.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { MasterSetupService } from 'src/app/services/master-setup/master-setup.service';
 import { UtilsService } from 'src/app/services/utils/utils.service';
import { IDashboardStats } from 'src/app/shared/models/DashboardStat.interface';
import { ISessionUser } from 'src/app/shared/models/SessionUser.Interace';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  // sessionUser: ISessionUser;
  // selectedCalender: any;
  // dashboardStats: IDashboardStats;

  // constructor(
  //   public authService: AuthService,
  //   public router: Router,
  //   public globalService: GlobalService,
  //   public masterSetupService: MasterSetupService,
  //   public localStorageService: LocalStorageService,
  //   public dashboardService : DashboardService
  // ) {
  //   this.sessionUser = this.authService.getSessionUser();
  // }
  ngOnInit(): void {
    //this.getAllDepartmentList(); 
    //this.getDashboardStats(this.sessionUser.hrEmpId); 
  }

  // getAllDepartmentList(deptID?) {
  //   this.globalService.showSpinner(true);
  //   this.masterSetupService.getDepartment(deptID).subscribe(
  //     (result) => {
  //       if (result.statusCode == 200) {
  //         this.globalService.showSpinner(false);
  //         const allDepartmentList: any = result.values;
  //         this.localStorageService.setAllDepartmentList_localStorage(
  //           result.values,
  //         );
  //       }
  //     },
  //     (err) => {
  //       this.globalService.showSpinner(false);
  //       this.globalService.errorResponseHandler(err);
  //     },
  //   );
  // }

  // getDayPeriod() {
  //   const currentTime = new Date();
  //   const currentHour = currentTime.getUTCHours() + 6; // Add 6 to UTC hours for GMT+6
  
  //   if (currentHour >= 5 && currentHour < 12) {
  //     return "Good Morning!";
  //   } else if (currentHour >= 12 && currentHour < 17) {
  //     return "Good Afternoon!";
  //   } 
  //   // else if (currentHour >= 17 && currentHour < 20) {
  //   //   return "Good Evening!";
  //   // } 
  //   else {
  //     return "Good Evening!";
  //   }
  // }

  // getDashboardStats(empId) {
  //   this.globalService.showSpinner(true);
  //   this.dashboardService.getDashboardStats(empId).subscribe(
  //     (result) => {
  //       if (result.statusCode == 200) {
  //         this.globalService.showSpinner(false);
  //         this.dashboardStats = result.value; 
  //       }
  //     },
  //     (err) => {
  //       this.globalService.showSpinner(false);
  //       this.globalService.errorResponseHandler(err);
  //     },
  //   );
  // }
}
