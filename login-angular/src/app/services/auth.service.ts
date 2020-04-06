import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as AppConfig from '../config';

import { User } from './../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private cfg: any;
  // tslint:disable-next-line: variable-name
  private _token: string;
  // tslint:disable-next-line: variable-name
  private _expiretoken: string;

  constructor(private http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  public get expireToken(): string {
    if (this._expiretoken != null) {
      return this._expiretoken;
    } else if (this._expiretoken == null && sessionStorage.getItem('token') != null) {
      this._expiretoken = sessionStorage.getItem('expirein');
      return this._expiretoken;
    }
    return null;
  }

  login(user: User): Observable<any> {

    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.email);
    params.set('password', user.password);
    params.set('client_id', '2');
    params.set('client_secret', 'X13ImtSFVZ1A5Mvc9m8wu2jRDigtECNq9VzjSXI2');
    params.set('scope', '*');

    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expirein');

    return this.http.post<any>(this.cfg.url_backend + this.cfg.loginUrl, params.toString(), {headers: this.cfg.headerLogin});
  }

  saveToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', this._token);
  }

  expireIn(expireToken: string): void {
    this._expiretoken = expireToken;
    sessionStorage.setItem('expirein', this._expiretoken);
  }

  logout(): void {
    this._token = null;
    sessionStorage.clear();
  }

  isAuthenticated(): boolean {
    let response = false;
    if (this.token == null) {
      response = false;
    } else {
      response = true;
    }
    return response;
  }

  getUser(): Observable<any> {
    return this.http.get<any>(this.cfg.url_backend + this.cfg.user);
  }
}
