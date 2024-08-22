import { Injectable } from '@angular/core';
import { GlobalService } from '../global/global.service';
import {
  map,
  catchError,
  flatMap,
  mergeMap,
  toArray,
  tap,
  switchMap,
  concatMap,
} from 'rxjs/operators';
import { Observable, throwError, Subject, BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginApiURL = this.globalService.api_url + '/account/login';
  jwtHelper = new JwtHelperService();
  decodeToken: any;
  lastUrl: any;
  constructor(
    private http: HttpClient,
    public router: Router,
    public globalService: GlobalService,
    public localStorageService: LocalStorageService,
  ) {}

  signIn(username: string, password: string): Observable<any> {
    console.log('<========Login in service called========>');

    const body = { userName: username, password: password };
    return this.http.post(this.loginApiURL, body).pipe(
      map((x: any) => {
        const user = x;
        if (user) {
          //this.setSessionUserByToken(user.token);
          this.localStorageService.setSessionUserByData(user);
          this.localStorageService.setToken(user.token);
          // this.decodeToken = this.jwtHelper.decodeToken(user.token);
        }
        return user;
      }),
      catchError((error: Response) => {
        return throwError(error);
      }),
    );
  }

  isLoggedIn() {
    const stoken = this.localStorageService.getToken();
    return !this.jwtHelper.isTokenExpired(stoken);
  }

  logout() {
    localStorage.clear();
    return true;
  }

  public tokerDecoder(jwtToken) {
    this.jwtHelper = new JwtHelperService();
    return this.jwtHelper.decodeToken(jwtToken);
  }

  getSessionUser() {
    return this.localStorageService.getSessionUser();
  }

  isPBCPM() {
    var result = this.localStorageService.getSessionUser();
    if (result.isPBCPM == 'True') {
      return true;
    } else {
      return false;
    }
  }
}
