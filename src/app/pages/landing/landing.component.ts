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
  title1: string = 'Sobre nosotros';
  content1: string = `Somos una comunidad con valores radicados en la palabra de Dios.
    Nuestro propósito es compartir a otros acerca del amor y la verdad de Jesucristo.`;
  knowMoreContent1:string = `Siguiendo las enseñanzas de la Biblia, procuramos vivir 
  y demostrar a los demás el mismo amor que hemos recibido.`;
  knowMoreContent2:string = `Disfrutamos encontrarnos regularmente para conocer más de Dios y enaltecer su nombre, 
  así como para compartir nuestras alegrías y tristezas.`;
  knowMoreContent3:string = `Cada vez que nos reunimos, nos alegramos de tener entre nosotros personas que nos 
  visitan por primera vez.`
  knowMoreContent4:string = `Si estás leyendo esto, no dudes en acercarte. 
  ¡Nos encantaría conocerte!`;
  
  
  title2: string = 'El regalo más grande';
  // content2: string = `El problema más grande de la humanidad fue resuelto por Dios,
  //  a través de un plan, cuyo resultado nos da el regalo más grande que podríamos imaginar.`;
  
 
  novedades: boolean = false;
  message: string;
  isKnowMore: boolean = false;

  

   reuniones = [
    {
      img: `./assets/img/oracion.jpg`,
      time: `Miércoles 20:00hs`,
      title: `Reunión de Oración`,
      content: `Tiempo de oración y reflexión bíblica`
    },
    {
      img: `./assets/img/jovenes.jpg`,
      time: `Sábado 20:30hs`,
      title: `Reunión de Jóvenes`, 
      content: `Encuentro de jóvenes y adolescentes`
    },
    {
      img: `./assets/img/escuelaBiblica.jpg`,
      time: `Domingo 10:00hs`,
      title: `Escuela bíblica`,
      content: `Enseñanza bíblica para todas las edades` 
    },
    {
      img: `./assets/img/reunionGeneral.jpeg`,
      time: `Domingo 20:00hs`,
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

  onKnowMore() {
    this.isKnowMore = !this.isKnowMore;
  }

}
