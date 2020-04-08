import { Component, OnInit } from '@angular/core';
import { faBible } from '@fortawesome/free-solid-svg-icons';

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
    gran amor quiso reconciliarnos en la persona de su hijo Jesús, 
    para todo aquel que decida creer en Él.`


  focus: any;
  focus1: any;
  faBible = faBible;
  constructor() { }

  ngOnInit() {}

}
