import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
interface AuthDate {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenctedStatus = false;
  private _userID = null;
  constructor(
    private http: HttpClient
  ) { }

  get userID() {
    return this._userID;
  }

  get isAuthenticatedStatus() {
    return this._isAuthenctedStatus;
  }

  signup(email: string, password: string) {
    console.log(environment.firebaseApiKey);
    
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${environment.firebaseApiKey}`, 
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    );
  }

  login() {
    this._isAuthenctedStatus = true;
  }

  logout() {
    this._isAuthenctedStatus = false;
  }
}
