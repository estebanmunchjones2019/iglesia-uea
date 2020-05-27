// Angular dependencies
//import { Http, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable, Output, EventEmitter } from '@angular/core';

import {catchError} from "rxjs/internal/operators";
import {Observable} from "rxjs/index";

@Injectable()
export class NavbarService {

  @Output() showSignOut :EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  signIn() {
    this.showSignOut.emit(true);
  }

  signOut() {
    this.showSignOut.emit(false);
  }
  
}
