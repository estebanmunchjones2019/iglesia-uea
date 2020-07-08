import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

import {VideoService} from './video/video.service';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseFunctionsService } from './firebase-functions/firebase-functions.service';
import { FirebaseAuthService } from './firebase/firebase.auth.service';
import { UtilService } from './utils/util.service';
import { NavbarService } from './navbar/navbar.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
   VideoService,
   FirebaseService,
   FirebaseFunctionsService,
   FirebaseAuthService,
   UtilService,
   NavbarService
  ]
})
export class ServicesModule {}
