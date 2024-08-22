import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { MasterSetupService } from 'src/app/services/master-setup/master-setup.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-department-dropdown',
  templateUrl: './department-dropdown.component.html',
  styleUrls: ['./department-dropdown.component.scss'],
})
export class DepartmentDropdownComponent implements OnInit {
  @Input() dataSource: any = [];
  @Input() selectedDepartmentId: any;
  @Input() validationGroupName: any = null;
  @Output() selectedDepartmentOutput = new EventEmitter<string>();

  selectedDepartment: any;
  sessionUser: any;
  allDepartmentList: any[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    public router: Router,
    public globalService: GlobalService,
    private masterSetupService: MasterSetupService,
    public utilService: UtilsService,
  ) {
    this.sessionUser = this.authService.getSessionUser();
  }

  ngOnInit() {
    this.getAllDepartmentList();
    console.log(this.dataSource);
  }

  departmentOptionChange(e) {
    console.log(e.selectedItem);
    this.selectedDepartment = e.selectedItem;
    this.selectedDepartmentOutput.emit(this.selectedDepartment);
  }

  fireFromParentComponent(dataSourceOfDepartment) {
    this.selectedDepartmentId = null;
    this.dataSource = dataSourceOfDepartment;
    /* Disable because its generate circular loop */
    //this.getAllDepartmentList();
  }

  getAllDepartmentList(deptID?) {
    this.globalService.showSpinner(true);
    this.allDepartmentList = [];
    this.masterSetupService.getDepartment(deptID).subscribe(
      (result) => {
        if (result.statusCode == 200) {
          const allDepartmentList: any = result.values;
          // this.allDepartmentList = result.values;
          if(this.dataSource.length > 0){
            for (let i = 0; i < this.dataSource.length; i++) {
              for (let j = 0; j < allDepartmentList.length; j++) {
                if (this.dataSource[i].deptID == allDepartmentList[j].hR_DeptID) {
                  this.allDepartmentList.push(allDepartmentList[j]);
                }
              }
            }
          } else {
            this.allDepartmentList = allDepartmentList;
          }
          this.allDepartmentList = this.allDepartmentList.sort(
            this.utilService.dynamicSort('hR_DeptName'),
          );
          console.log(this.allDepartmentList);
          this.globalService.showSpinner(false);
        }
      },
      (err) => {
        this.globalService.showSpinner(false);
        this.globalService.errorResponseHandler(err);
      },
    );
  }
}
