// Angular dependencies
//import { Http, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable, Output, EventEmitter } from '@angular/core';

import {catchError} from "rxjs/internal/operators";
import {Observable} from "rxjs/index";

@Injectable()
export class KeycloakAuthService {

  public environment: any;
  public loginFailed = '';
  public loginFailedMessage = '';

  constructor(
    public httpClient: HttpClient
  ) {
  }

  login(username: string, password: string) {

    let data = new URLSearchParams();
    data.append('client_id', 'ueasuarez-client');
    data.append('client_secret', '8469707c-a0dc-4035-8d6e-e1fb2d57f1c3');
    data.append('username', username);
    data.append('password', password);
    data.append('grant_type', 'password');
    let body = data.toString();

    localStorage.removeItem('access_token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const url = `http://localhost:8080/auth/realms/ueasuarez/protocol/openid-connect/token`;

    return this.httpClient.post(url, body, httpOptions);
  }

  userinfo(token) {

    let data = new URLSearchParams();
    data.append('access_token', token);
    let body = data.toString();


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    const url = `http://localhost:8080/auth/realms/ueasuarez/protocol/openid-connect/userinfo`;

    return this.httpClient.post(url, body, httpOptions);
  }

  /*signUp(user: PortalUserModel, password: string) {

    let data = {
      "username": user.email,
      "enabled": true,
      "email": user.email,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "password": password,
      "phone": "",
      "roles": [{}],
      "groups": [{}]
    };

    localStorage.removeItem('access_token');

    const url = `${ this.environment.apiUrl }/er-portal/user`;

    return this.httpClient.post(url, data)
        .catch(err => {
          return Observable.throw(err);
        });

  }

  resetPassword(email: string) {
    const url = `${ this.environment.apiUrl }/er-portal/user/password/reset`;
    let data = {
      "email": email
    };
    return this.httpClient.post(url, data)
      .map(response => {
        return response;
      })
  }
*/
}
