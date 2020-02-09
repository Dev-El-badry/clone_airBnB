import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenctedStatus = true;
  private _userID = 'abc';
  constructor() { }

  get userID() {
    return this._userID;
  }

  get isAuthenticatedStatus() {
    return this._isAuthenctedStatus;
  }

  login() {
    this._isAuthenctedStatus = true;
  }

  logout() {
    this._isAuthenctedStatus = false;
  }
}
