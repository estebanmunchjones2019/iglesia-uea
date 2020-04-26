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

import { Component, OnInit } from '@angular/core';
import { faBible } from '@fortawesome/free-solid-svg-icons';
import { FirebaseService } from 'app/service/firebase/firebase.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  title1: string = 'Somos una gran familia';
  content1: string = `Queremos vivir 
  y mostrar el mismo amor que Dios tuvo por nosotros 
  teniendo una conciencia social y 
  amor por los necesitados.`;
  
  title2: string = 'Nuestro mensaje para vos';
  content2: string = `La biblia nos enseña que desde el comienzo
   de la humanidad el hombre se apartó
    de Dios perdiendo así la relación con su creador. 
    Pero Él, a través de su infinita misericordia y 
    gran amor, quiso reconciliarnos en la persona de su hijo Jesús, 
    para todo aquel que decida creer en Él.`;
  
 
  novedades: boolean = false;
  message: string;

  

   reuniones = [
    {
      img: `./assets/img/oracion.jpg`,
      time: `Miércoles 20:00hs`,
      title: `Reunión de Oración`,
      content: `Tiempo de oración y reflexión bíblica`
    },
    {
      img: `./assets/img/jovenes.jpg`,
      time: `Sábados 20:30hs`,
      title: `Reunión de Jóvenes`, 
      content: `Encuentro de jóvenes y adolescentes`
    },
    {
      img: `./assets/img/escuelaBiblica.jpg`,
      time: `Domingos 10:00hs`,
      title: `Escuela bíblica`,
      content: `Enseñanza bíblica para todas las edades`
    },
    {
      img: `./assets/img/reunionGeneral.jpeg`,
      time: `Domingos 20:00hs`,
      title: `Reunión general`,
      content: `Canciones y reflexión bíblica` 
    }
  ];

  focus: any;
  focus1: any;
  faBible = faBible;
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.getNews();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }

  getNews() {
    this.firebaseService.getNews()
    .then(response => {
      this.novedades = response.data().show;
      this.message = response.data().message;
    })
  }

}
