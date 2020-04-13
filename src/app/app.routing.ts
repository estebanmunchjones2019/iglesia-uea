import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './pages/landing/landing.component';
import { MultimediaComponent } from './pages/multimedia/multimedia.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ComponentsComponent } from './components/components.component';

const routes: Routes =[
    { path: '',                 component: LandingComponent, pathMatch: 'full' },
    { path: 'multimedia',       component: MultimediaComponent },
    { path: 'nosotros',         component: NosotrosComponent },
    { path: 'home',             component: ComponentsComponent },
    { path: '**',               redirectTo: ''}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
