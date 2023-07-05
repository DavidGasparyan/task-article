import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Credentials} from "../interfaces/credentials.interface";
import {map, shareReplay, tap} from "rxjs";
import * as moment from "moment";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly _http: HttpClient,
  ) {}

  login(credentials: Credentials) {
    return this._http.post('/api/login', credentials)
      .pipe(
        map(res => this.setSession(res)),
        shareReplay()
      );
  }

  signup(credentials: Credentials) {
    return this._http.post('/api/register', credentials)
  }

  private setSession(authResult: any) {
    const { accessToken } = authResult
    const { email, exp } = this.getDecodedAccessToken(accessToken);
    const expiresAt = moment().add(exp, 'second');

    localStorage.setItem('id_token', accessToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");

    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }

    return null
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(err) {
      return null;
    }
  }
}
