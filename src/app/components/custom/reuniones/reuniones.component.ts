import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reuniones',
  templateUrl: './reuniones.component.html',
  styleUrls: ['./reuniones.component.css']
})
export class ReunionesComponent implements OnInit {
  reuniones = [
    {
      img: `./assets/img/oracion.jpg`,
      time: `Miércoles 20:00hs`,
      title: `Reunion de Oración`,
      content: `Oración y reflexión bíblica.`
    },
    {
      img: `./assets/img/jovenes.jpg`,
      time: `Sábados 20:30hs`,
      title: `Reunion de Jóvenes`, 
      content: `Encuentro de jóvenes y adolescentes.`
    },
    {
      img: `./assets/img/escuelaBiblica.jpg`,
      time: `Domingos 10:00hs`,
      title: `Escuela bíblica`,
      content: `Enseñanza bíblica para todas las edades.`
    },
    {
      img: `./assets/img/reunion-general.jpg`,
      time: `Domingos 20:00hs`,
      title: `Reunión general`,
      content: `Canciones y reflexión bíblica.`
    }
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
