import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global/global.service';
import { IResult } from 'src/app/shared/models/result';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import {
  EmailOnlineAppruverPaginationParams,
  EmployeePaginationParams,
} from 'src/app/shared/models/PaginationParams';
 
@Injectable({
  providedIn: 'root',
})
export class MasterSetupService {
  apiUrl = this.globalService.api_url + '/MasterSetup';

  constructor(
    private http: HttpClient,
    public router: Router,
    public globalService: GlobalService,
    public localStorageService: LocalStorageService,
  ) {}

  getDepartment(hr_deptId?) {
    let params: any = new HttpParams();
    if (hr_deptId) params = params.append('hr_deptId', hr_deptId);

    return this.http
      .get<IResult>(this.apiUrl + '/getDepartment', { params: params })
      .pipe(
        map((x: IResult) => x),
        catchError((error: Response) => {
          return throwError(error);
        }),
      );
  }

  getGeneralSetupUsers(bM_ItemIDUsers?, itemName?, status?) {
    let params: any = new HttpParams();
    if (bM_ItemIDUsers)
      params = params.append('bM_ItemIDUsers', bM_ItemIDUsers);
    if (itemName) params = params.append('itemName', itemName);
    if (status) params = params.append('status', status);

    return this.http
      .get<IResult>(this.apiUrl + '/getGeneralSetupUsers', { params: params })
      .pipe(
        map((x: IResult) => x),
        catchError((error: Response) => {
          return throwError(error);
        }),
      );
  }

  getGeneralSetup(bM_ItemID?, itemName?, status?) {
    let params: any = new HttpParams();
    if (bM_ItemID) params = params.append('bM_ItemID', bM_ItemID);
    if (itemName) params = params.append('itemName', itemName);
    if (status) params = params.append('status', status);

    return this.http
      .get<IResult>(this.apiUrl + '/getGeneralSetup', { params: params })
      .pipe(
        map((x: IResult) => x),
        catchError((error: Response) => {
          return throwError(error);
        }),
      );
  }

  getEmailApproverListByHrId(HrEmpId): Observable<any> {
    let params: any = new HttpParams();
    params = params.append('HrEmpId', HrEmpId);

    return this.http
      .get<IResult>(
        this.globalService.api_url + '/EmailOnlineApproval/get-by-empId',
        { params: params },
      )
      .pipe(
        map((x: IResult) => {
          this.localStorageService.setEmailOnlineApprover(x.values);
          this.globalService.showSpinner(false);
          return x;
        }),
        catchError((error: Response) => {
          return throwError(error);
        }),
      );
  }

  getEmailApproverList(
    emailOnlineAppruverPaginationParams: EmployeePaginationParams,
  ): Observable<any> {
    let params: any = new HttpParams();
    if (emailOnlineAppruverPaginationParams.HR_EmployeeID)
      params = params.append(
        'hR_EmployeeID',
        emailOnlineAppruverPaginationParams.HR_EmployeeID,
      );
    if (emailOnlineAppruverPaginationParams.HR_DeptIDs)
      params = params.append(
        'hR_DeptIDs',
        emailOnlineAppruverPaginationParams.HR_DeptIDs,
      );
    if (emailOnlineAppruverPaginationParams.PlaceOfPostingBM_ItemIDUsers)
      params = params.append(
        'placeOfPostingBM_ItemIDUsers',
        emailOnlineAppruverPaginationParams.PlaceOfPostingBM_ItemIDUsers,
      );

    return this.http
      .get<IResult>(
        this.globalService.api_url +
          '/EmailOnlineApproval/get-email-online-aprroval',
        { params: params },
      )
      .pipe(
        map((x: IResult) => {
          return x;
        }),
        catchError((error: Response) => {
          return throwError(error);
        }),
      );
  }

   
  getPatterns(patternCode?, seriesCode?) {
    let params: any = new HttpParams();
    if (patternCode) params = params.append('patternCode', patternCode);
    if (seriesCode) params = params.append('seriesCode', seriesCode);

    return this.http
      .get<IResult>(this.apiUrl + '/getPattern', { params: params })
      .pipe(
        map((x: IResult) => x),
        catchError((error: Response) => {
          return throwError(error);
        }),
      );
  }
  getShiftLocationWiseCode(locationId?, shiftId?) {
    let params: any = new HttpParams();
    if (locationId) params = params.append('locationId', locationId);
    if (shiftId) params = params.append('shiftId', shiftId);

    return this.http
      .get<IResult>(this.apiUrl + '/getShiftLocationWiseCode', { params: params })
      .pipe(
        map((x: IResult) => x),
        catchError((error: Response) => {
          return throwError(error);
        }),
      );
  }
}
