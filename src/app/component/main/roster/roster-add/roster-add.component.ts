import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { MasterSetupService } from 'src/app/services/master-setup/master-setup.service';
import { BmGeneralSetupUsers } from 'src/app/shared/enums/BmGeneralSetupUsers.enum';
import ValidationEngine from 'devextreme/ui/validation_engine';
import { EmployeePaginationParams } from 'src/app/shared/models/PaginationParams';
 import { ExcelExportService } from 'src/app/services/ExcelExport/ExcelExport.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
@Component({
  selector: 'app-roster-add',
  templateUrl: './roster-add.component.html',
  styleUrls: ['./roster-add.component.css'],
})
export class RosterAddComponent implements OnInit {
  sessionUser: any;
  dataSource: any;
  emailApproverList: any[] = [];
  empDepartments: any[] = [];
  empPlaceOfPosting: any[] = [];
  emailApprovalDataLoad: boolean = false;

  selectedDepartmentId: any = null;
  selectedDepartmentObj: any;

  selectedPlaceOfPostingId: any = null;
  selectedPlaceOfPostingObj: any;

  selectedGradeId: any = null;
  selectedGradeObj: any;

  bmGeneralSetupUsersEnum = BmGeneralSetupUsers;

  employeeList: any[] = [];
  showInactive: boolean;
  showProcessLPR: boolean;
  popupVisible_exportEmployee: boolean;

  constructor(
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    public router: Router,
    public globalService: GlobalService,
    private masterSetupService: MasterSetupService,
     private excelExportService: ExcelExportService,
    public utilService: UtilsService,
  ) {
    this.sessionUser = this.authService.getSessionUser();
    this.showInactive = true;
    this.showProcessLPR = true;
  }

  ngOnInit(): void {}

  inactiveCheckedChanged(event) {
    console.log(event);
  }

  showExportEmployeePopup() {
    this.popupVisible_exportEmployee = true;
  }
}
