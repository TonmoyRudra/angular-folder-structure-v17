import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { MasterSetupService } from 'src/app/services/master-setup/master-setup.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { BmGeneralSetupUsers } from '../../enums/BmGeneralSetupUsers.enum';

@Component({
  selector: 'app-placeOfPosting-dropdown',
  templateUrl: './placeOfPosting-dropdown.component.html',
  styleUrls: ['./placeOfPosting-dropdown.component.scss'],
})
export class PlaceOfPostingDropdownComponent implements OnInit {
  @Input() dataSource: any = [];
  @Input() selectedId: any;
  @Input() status: any;
  @Input() validationGroupName: any;
  @Output() selectedFromDropdownOutput = new EventEmitter<string>();

  selectedPlaceOfPosting: any;
  sessionUser: any;
  allPlaceOfPostingList: any[] = [];
  label: string = '';

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
    if (this.status == BmGeneralSetupUsers.PlaceOfPosting) {
      this.getAllPlaceOfPostingList();
    } else {
      this.getBMGeneralSetupByStatus();
    }

    if (this.status == BmGeneralSetupUsers.PlaceOfPosting)
      this.label = 'Place Of Posting';
    if (this.status == BmGeneralSetupUsers.GradeEmployee) this.label = 'Grade';
    console.log(this.dataSource);
  }

  dropdownOptionChange(e) {
    console.log(e.selectedItem);
    this.selectedPlaceOfPosting = e.selectedItem;
    this.selectedFromDropdownOutput.emit(this.selectedPlaceOfPosting);
  }

  fireFromParentComponent(dataSourceOfPlaceOfPosting) {
    this.selectedId = null;
    this.dataSource = dataSourceOfPlaceOfPosting;
    this.getAllPlaceOfPostingList();
  }

  getAllPlaceOfPostingList() {
    this.globalService.showSpinner(true);
    this.allPlaceOfPostingList = [];
    this.masterSetupService
      .getGeneralSetupUsers(0, null, this.status)
      .subscribe(
        (result) => {
          if (result.statusCode == 200) {
            const allPlaceOfPostingList: any = result.values;
            // this.allDepartmentList = result.values;
            if(this.dataSource.length > 0) {
              for (let i = 0; i < this.dataSource.length; i++) {
                for (let j = 0; j < allPlaceOfPostingList.length; j++) {
                  if (
                    this.dataSource[i].placeOfPostingBM_ItemIDUsers ==
                    allPlaceOfPostingList[j].bM_ItemIDUsers
                  ) {
                    this.allPlaceOfPostingList.push(allPlaceOfPostingList[j]);
                  }
                }
              }
            } else {
              this.allPlaceOfPostingList = allPlaceOfPostingList;
            }
            this.allPlaceOfPostingList = this.allPlaceOfPostingList.sort(
              this.utilService.dynamicSort('itemName'),
            );
            console.log(this.allPlaceOfPostingList);
            this.globalService.showSpinner(false);
          }
        },
        (err) => {
          this.globalService.showSpinner(false);
          this.globalService.errorResponseHandler(err);
        },
      );
  }

  getBMGeneralSetupByStatus() {
    this.globalService.showSpinner(true);

    this.masterSetupService
      .getGeneralSetupUsers(0, null, this.status)
      .subscribe(
        (result) => {
          if (result.statusCode == 200) {
            const allPlaceOfPostingList: any = result.values;
            this.allPlaceOfPostingList = result.values;

            // for(let i=0; i<  this.dataSource.length; i++){
            //   for(let j=0; j< allPlaceOfPostingList.length; j++){
            //     if(this.dataSource[i].placeOfPostingBM_ItemIDUsers == allPlaceOfPostingList[j].bM_ItemIDUsers){
            //       this.allPlaceOfPostingList.push(allPlaceOfPostingList[j])
            //     }
            //   }
            // }
            this.allPlaceOfPostingList = this.allPlaceOfPostingList.sort(
              this.utilService.dynamicSort('itemName'),
            );
            console.log(this.allPlaceOfPostingList);
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
