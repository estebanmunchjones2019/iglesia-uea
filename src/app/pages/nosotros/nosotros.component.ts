import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {
  title: string = `Nuestras creencias`;
  
  content1: string = `La biblia en su totalidad fue inspirada por Dios.
    El espíritu santo guió a los autores a escribir cada palabra sin error
    en su original, ella es verdad en toda materia, ya sea de fe o de historia.`;
  
  content2: string = `La biblia es la autoridad final de fe y conducta para
    nuestra congregación y cada creyente que la compone.`;
  
  content3: string = `Existe un solo Dios verdadero que existe eternamente en
   tres personas: Padre, Hijo y Espíritu Santo.`;

  content4: string = `El hijo de Dios se encarnó en la persona de jesús,
   fue engendrado milagrosamente por el Espíritu Santo, vivió sin pecado
   y fue 100% Dios y 100% hombre, murió en una cruz y resucitó al tercer
   día presentándose como evidencia a más de 500 personas a la vez`;

  content5: string = `En Adán toda la humanidad participó del pecado original y,
   por consecuencia, todo hombre está muerto espiritualmente, estamos separados de Dios,
   pero jesucristo cargó con el castigo que merecía nuestro pecado frente a un Dios santo.
  Él tomó nuestro lugar y nos devolvió la posibilidad de restablecer la relación con el
  Padre rota por nuestros pecado. Ahora, al creer en jesucristo y en su obra, tenemos`;

  constructor() { }

  ngOnInit(): void {
  }

}
