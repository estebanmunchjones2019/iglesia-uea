import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './pages/landing/landing.component';
import { MultimediaComponent } from './pages/multimedia/multimedia.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { WatchVideoComponent } from './pages/watch-video/watch-video.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes =[
    { path: '',                 component: LandingComponent, pathMatch: 'full' },
    { path: 'multimedia',       component: MultimediaComponent },
    { path: 'nosotros',         component: NosotrosComponent },
    { path: 'video/:id',            component: WatchVideoComponent },
    { path: '**',               redirectTo: ''}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true,
      // anchorScrolling: 'enabled'
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
