import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { ComponentsModule } from './components/components.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PagesModule } from './pages/pages.module';

import { ServicesModule } from './service/service.module';

import { NgxPaginationModule } from 'ngx-pagination';

import localeEsAR from '@angular/common/locales/es-AR';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { CKEditorModule } from 'ckeditor4-angular';
import { ScullyLibModule } from '@scullyio/ng-lib';

registerLocaleData(localeEsAR, 'es-Ar');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    NgxPageScrollCoreModule.forRoot({duration: 500}),
    RouterModule,
    ComponentsModule,
    PagesModule,
    AppRoutingModule,
    FontAwesomeModule,
    ServicesModule,
    NgxPaginationModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    CKEditorModule,
    ScullyLibModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-Ar' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
