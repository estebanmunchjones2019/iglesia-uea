import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/index";
import {KeycloakAuthService} from "../keycloak-auth/keycloak-auth.service";

@Injectable()
export class AuthGuard implements AuthGuard {

  constructor(private router: Router) {}

  /*canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const token = localStorage.getItem('access_token');

    if (token == null || token == undefined) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return this.keycloakAuthService.userinfo(token)
        .toPromise().then(response => {
            return true;
          },
          error => {
            this.router.navigate(['/login']);
            return false
          }
        );
    }

  }*/
}
