import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {VideoService} from './video/video.service';
import {HeaderInterceptor} from './header-interceptor/header-interceptor.service';
import {SidebarScrollService} from './sidebar-scroll/sidebar-scroll.service';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseFunctionsService } from './firebase-functions/firebase-functions.service';
import { FirebaseAuthService } from './firebase/firebase.auth.service';
import { UtilService } from './utils/util.service';
import { NavbarService } from './navbar/navbar.service';
import { FirebaseV2Service } from './firebase/firebase.v2.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
   VideoService,
   { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
   SidebarScrollService,
   FirebaseService,
   FirebaseFunctionsService,
   FirebaseAuthService,
   UtilService,
   NavbarService,
   FirebaseV2Service
  ]
})
export class ServicesModule {}
