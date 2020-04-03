import { Injectable, Injector } from '@angular/core'
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import {Observable} from "rxjs/index";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('access_token');

    const url = req.url;

    if ( url.includes("8095") && token !== null && token !== undefined) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    return next.handle(req);

  }

  private logout() {
   //this.oAuthService.logOut();
   //sessionStorage.clear();
   //window.location.href = this.oAuthService.logoutUrl;
  }
}
