import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {KeycloakAuthService} from './keycloak-auth/keycloak-auth.service';
import {AuthGuard} from './auth-guard/auth-guard.service';
import {VideoService} from './video/video.service';
import {HeaderInterceptor} from './header-interceptor/header-interceptor.service';
import {SidebarScrollService} from './sidebar-scroll/sidebar-scroll.service';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseFunctionsService } from './firebase-functions/firebase-functions.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
   KeycloakAuthService,
   AuthGuard,
   VideoService,
   { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
   SidebarScrollService,
   FirebaseService,
   FirebaseFunctionsService
  ]
})
export class ServicesModule {}
