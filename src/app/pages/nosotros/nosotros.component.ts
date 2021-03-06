import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent implements OnInit {

  @ViewChild('nosotrosContainer') nosotrosContainer: ElementRef;
  
  carouselPhotos = [
    {
      src: `./assets/img/musicos.jpg`
    },
    {
      src: `./assets/img/juani.jpg`
    },
    {
      src: `./assets/img/dany.jpg`
    },
    {
      src: `./assets/img/ronda.jpg`
    },
    {
      src: `./assets/img/fernando.jpg`
    },
    {
      src: `./assets/img/tejo.jpg`
    },
    {
      src: `./assets/img/futbol.jpg`
    },
    {
      src: `./assets/img/abuelas.jpg`
    },
    {
      src: `./assets/img/chicos.jpg`
    }

  ]

  constructor() { } 

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    this.nosotrosContainer.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }

}
