import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const isAuth = sessionStorage.getItem('user') !== null && sessionStorage.getItem('user').length > 0 ? true : false;
        if (isAuth) {
          return true;
        } else {
          this.router.navigate(['/']);
        }
    }
}