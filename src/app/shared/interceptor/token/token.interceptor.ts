import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { HttpRequestSuccessFailed } from '../../enums/http-request-success-failed.enum';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private jwtHelper = new JwtHelperService();

  constructor(
    private authService: AuthService,
    public localStorageService: LocalStorageService,
    private router: Router,
    private utilitiesService: UtilsService,
    private globalService: GlobalService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
    console.log('Token Interceptor fired');
    const authToken = this.localStorageService.getToken();
    if (authToken) {
      try {
        //Token expiration check, isExpired true means if token is expired
        const isExpired = this.jwtHelper.isTokenExpired(authToken);

        if (isExpired) {
          this.authService.logout();
          this.router.navigateByUrl('/auth');
          return;
        } else {
          return this.responseHandler(
            this.requestCloneHandler(request, authToken),
            next,
          );
        }
      } catch (error) {
        this.authService.logout();
        return;
      }
    } else {
      return this.responseHandler(request, next);
    }
  }

  //Loading spinner, http response handler
  private responseHandler = (
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ) => {
    const startedTime = Date.now();
    let responseType: string;
    return next.handle(request).pipe(
      map((x) => {
        this.globalService.showSpinner(true);
        return x;
      }),
      tap({
        next: (event) => {
          // responseType = event instanceof HttpResponse ? 'succeeded' : '';
          responseType =
            event instanceof HttpResponse
              ? HttpRequestSuccessFailed.SUCCESS
              : '';
          // this.globalService.httpSuccessToastyHandler(responseType, request, event)
        },
        error: (error) => {
          responseType = HttpRequestSuccessFailed.FAIL;
        },
      }),
      this.handlerError(),
      finalize(() => {
        //this.globalService.showSpinner(false);
        const elapsedTime = Date.now() - startedTime;
        const msg = `${request.method} "${request.urlWithParams}" ${responseType} in ${elapsedTime} ms.`;
        console.log(msg);
      }),
    );
  };

  //Error handler
  private handlerError(): <T>(source: Observable<T>) => Observable<T> {
    return <T>(source: Observable<T>) =>
      source.pipe(
        catchError((error: HttpErrorResponse) => {
          // this.globalService.showSpinner(false);
          this.globalService.errorResponseHandler(error.error as any);
          return throwError(() => error);
        }),
      );
  }

  //Set headers for every request
  private requestCloneHandler = (
    request: HttpRequest<unknown>,
    authToken: string,
  ) => {
    let contentType;
    if (request.body instanceof FormData) {
      contentType = 'multipart/form-data';
    } else {
      contentType = 'application/json';
    }

    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`),
      // .set('Content-Type', contentType)
    });
  };
}
