import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
const jwtHelper = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  secretKey = 'HRISV2_BSRm_GroupIt#DevelopedBy@BSrM@2023_TonmoyrUdra';

  constructor() {}

  encrypt(value: string): string {
    //return value;
    if (environment.envName == 'development') {
      return value;
    } else {
      return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
    }
  }

  decrypt(textToDecrypt: string) {
    if (environment.envName == 'development') {
      return textToDecrypt;
    } else {
      if (textToDecrypt == null) {
        return textToDecrypt;
      } else {
        return CryptoJS.AES.decrypt(
          textToDecrypt,
          this.secretKey.trim(),
        ).toString(CryptoJS.enc.Utf8);
      }
    }
  }

  setAllDepartmentList_localStorage(data) {
    localStorage.setItem(
      'allDepartmentList',
      this.encrypt(JSON.stringify(data)),
    );
  }

  getAllDepartmentList_localStorage() {
    return JSON.parse(this.decrypt(localStorage.getItem('allDepartmentList')));
  }

  getToken() {
    // return this.cookieService.get('token');
    return JSON.parse(localStorage.getItem('token'));
  }

  setToken(token: string) {
    //this.cookieService.set('token', token);
    //this.cookieService.set('token2', token, null, '../',);
    localStorage.setItem('token', JSON.stringify(token));
  }

  setSessionUserByToken(token: string) {
    try {
      const tokenDecode = jwtHelper.decodeToken(token);
      delete tokenDecode.iat;
      delete tokenDecode.iss;
      localStorage.setItem('sessionUser', JSON.stringify(tokenDecode));
      return true;
    } catch (error) {
      return false;
    }
  }

  setSessionUserByData(data) {
    try {
      // var tokenDecode = this.jwtHelper.decodeToken(token);
      // delete tokenDecode.iat;
      // delete tokenDecode.iss;
      localStorage.setItem('sessionUser', this.encrypt(JSON.stringify(data)));
      return true;
    } catch (error) {
      return false;
    }
  }

  setSessionUser(user: any) {
    localStorage.setItem('sessionUser', this.encrypt(JSON.stringify(user)));
  }

  getSessionUser() {
    return JSON.parse(this.decrypt(localStorage.getItem('sessionUser')));
  }

  getLoginEmployeeInfo() {
    return JSON.parse(this.decrypt(localStorage.getItem('hrEmployeeInfo')));
  }

  setLoginEmployeeInfo(data) {
    localStorage.setItem('hrEmployeeInfo', this.encrypt(JSON.stringify(data)));
  }

  getEmailOnlineApprover() {
    return JSON.parse(
      this.decrypt(localStorage.getItem('emailOnlineApprover')),
    );
  }

  setEmailOnlineApprover(data) {
    localStorage.setItem(
      'emailOnlineApprover',
      this.encrypt(JSON.stringify(data)),
    );
  }
}
