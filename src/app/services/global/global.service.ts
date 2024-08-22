import { IErrorResponse } from './../../shared/models/error-response.interface';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { IResult } from 'src/app/shared/models/result';
import { environment } from 'src/environments/environment';
import { HttpRequest } from '@angular/common/http';
import { HttpRequestSuccessFailed } from 'src/app/shared/enums/http-request-success-failed.enum';
//import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  isLoginRequest: any;
  // private toastr : ToastrService
  constructor(private spinner: NgxSpinnerService) {}

  public api_url: string = environment.apiUrl;

  public sheetTempleteURL = './assets/sheetTemplate/';

  public optionForm: any = {
    options: [{ name: '', isRequiredSubQuestion: false }],
  };

  public rowSize = 7;

  appTitle = 'BSRM HRIS';

  showSwal(title: string, message: string, type: any) {
    // type = "success", "error", "warning", "info" or "question"
    // Swal.fire('OPS Sorry', 'Username or Password  not match', 'warning');
    // Swal.fire(title, message, type);
    Swal.fire({
      icon: type,
      title,
      //text: message
      html: message,
      allowOutsideClick: false,
    });
  }

  public showSwalWithToast(
    title: string = 'Success',
    message: string = 'Request successful.',
    type: 'success' | 'error' | 'warning' | 'info' | 'question' = 'success',
    timer: number = 2000,
    timerProgressBar: boolean = true,
    showConfirmButton: boolean = false,
    showCloseButton: boolean = true,
  ) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showCloseButton: showCloseButton,
      showConfirmButton: showConfirmButton,
      icon: type,
      title,
      html: message,
      allowOutsideClick: false,
      timerProgressBar: timerProgressBar,
      timer: timer,
      customClass: {
        container: 'swalToastWidth',
      },
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  }
  showSpinner(isSpinning: boolean) {
    if (isSpinning) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  }

  public actions: any = {
    draft: 'draft',
    approve: 'approve',
    review: 'review',
    reject: 'reject',
    cancel: 'cancel',
    create: 'create',
  };

  errorResponseHandler(error: IResult) {
    this.showSpinner(false);
    if (error.statusCode == 401) {
      // this.showSwal( 'Warning', error.error, 'warning'
      this.showSwalWithToast('Unauthorized', error.error, 'warning');
    }
    if (
      error.statusCode == 400 ||
      error.statusCode == 404 ||
      error.statusCode == 409
    ) {
      // this.showSwal( 'Warning', error.error, 'warning'
      this.showSwalWithToast('Warning', error.error, 'warning', 3000);
    } else {
      this.showSwalWithToast('Warning', 'Something went wrong.', 'error');
    }
  }

  public httpSuccessToastyHandler = (
    responseType: string,
    request: HttpRequest<unknown>,
    event,
  ) => {
    const { method, body } = request;
    const message: string = event?.body?.result?.message;
    const isSuccess: boolean =
      (event?.body?.result?.is_success || event?.body?.result?.is_updated) ??
      event?.body?.status === 'ok'
        ? true
        : false;
    responseType === HttpRequestSuccessFailed.SUCCESS
      ? method === 'GET'
        ? null
        : method === 'POST'
        ? body instanceof FormData
          ? null
          : this.showSwalWithToast(
              'Success',
              this.isLoginRequest ? 'Login successful.' : 'Added successfully.',
              'success',
            )
        : body instanceof FormData
        ? null
        : this.showSwalWithToast(
            isSuccess ? 'Success' : 'Failed',
            message,
            isSuccess ? 'success' : 'error',
          )
      : null;
  };
  daysToBeGenerated = [{ value: 30 }, { value: 60 }];
}
export class ToasterType {
  success = 'success';
  error = 'error';
  warning = 'warning';
}
