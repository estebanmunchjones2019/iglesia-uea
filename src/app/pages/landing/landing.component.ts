/*!

 =========================================================
 * Paper Kit 2 Angular - v1.3.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/paper-kit-2-angular
 * Copyright 2017 Creative Tim (https://www.creative-tim.com)
 * Licensed under MIT (https://github.com/timcreative/paper-kit/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

import { Component, OnInit, ViewChild, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from 'app/service/firebase/firebase.service';
import { UtilService } from 'app/service/utils/util.service';


@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  title1: string = '¡Hola!';
  content1a: string = `Te damos la bienvenida a nuestro sitio web. Aquí encontrarás una breve
   reseña sobre nosotros y lo que creemos. Además, podrás escuchar los mensajes, 
   informarte sobre los días y horarios de las actividades y conocer distintos medios para contactarnos.`;
  content1b: string = `¡Gracias por tu visita!`;

  covid19Content: string = `Mientras esperamos para abrazarnos de nuevo, te invitamos 
  a participar de nuestras reuniones virtuales todos los domingos, a las 19:00 h,
   a través de nuestro canal de YouTube.`;
  
  novedades: boolean = false;
  message: string;

  reuniones = [
    {
      img: `./assets/img/oracion.jpg`,
      time: `Miércoles 20:00`,
      title: `Reunión de Oración`,
      content: `Tiempo de oración y reflexión bíblica`,
      alt: `reunion de oracion`
    },
    {
      img: `./assets/img/jovenes.jpg`,
      time: `Sábado 20:30`,
      title: `Reunión de Jóvenes`, 
      content: `Encuentro de jóvenes y adolescentes`,
      alt: `reunion de jovenes`
    },
    {
      img: `./assets/img/escuelaBiblica.jpg`,
      time: `Domingo 10:00`,
      title: `Escuela bíblica`,
      content: `Enseñanza bíblica para todas las edades`,
      alt: `escuela biblica`
    },
    {
      img: `./assets/img/reunionGeneral.jpg`,
      time: `Domingo 20:00`,
      title: `Reunión general`,
      content: `Canciones y reflexión bíblica`,
      alt: `reunion general`
    }
  ];

  focus: any;
  focus1: any;

  isLive = false;
  showLive = false;
  liveUrl;

  public showTitle = false;
  public showForm = false;
  public showMeetings = false;
  public opacityValue = 1;

  @HostListener('window:scroll', ['$event'])
  handleScroll($event) {
    this.showAnimations();
  }

  @ViewChild('title')
  title: ElementRef;

  @ViewChild('meetings')
  mettings: ElementRef;

  @ViewChild('form')
  form: ElementRef;

  @ViewChild('header')
  header: ElementRef;
  
  constructor(private firebaseService: FirebaseService,
    private changeDetectorRef: ChangeDetectorRef,
    private utilService: UtilService,
    private router: Router) { }

  ngOnInit() {
    this.getNews();
  }

  showAnimations() {    
    let sizeHeader = this.header.nativeElement.getBoundingClientRect();
    if (this.isLive) {
      if (sizeHeader.y > -30) {
        if (sizeHeader.y == 0) {
          this.opacityValue = 1;
        } else {
          this.opacityValue = 1 - (-sizeHeader.y / 100);
        }
      } else {
        this.opacityValue = 0;
      }
    } else {
      this.opacityValue = 1;
    }
    let sizeTitle = this.title.nativeElement.getBoundingClientRect();
    if (sizeTitle.y < (sizeTitle.height * 0.8)) {
      this.showTitle = true;
    } 

    let sizeMettings = this.mettings.nativeElement.getBoundingClientRect();
    if (sizeMettings.y < (sizeMettings.height * 0.8)) {
      this.showMeetings = true;
    } 

    let sizeForm = this.form.nativeElement.getBoundingClientRect();
    if (sizeForm.y < (sizeForm.height * 0.8)) {
      this.showForm = true;
    } 
    this.changeDetectorRef.detectChanges();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  getNews() {
    this.firebaseService.getNews()
      .then(response => {
        this.novedades = response.data().show;
        this.message = response.data().message;
      });
    this.firebaseService.isLive()
      .then(response => {
          this.isLive = response.data().isLive;
          this.showLive= response.data().isLive;
          this.liveUrl = this.utilService.getVideoIframe(response.data().url);
      });
  }

  onNuestrosMensajesClick() {
    this.router.navigate(['/mensajes'])
  }

  onSaberMasClick() {
    this.router.navigate(['/nosotros'])
  }

}
