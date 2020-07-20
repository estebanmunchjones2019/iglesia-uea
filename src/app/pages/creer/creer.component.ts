import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-creer',
  templateUrl: './creer.component.html',
  styleUrls: ['./creer.component.scss']
})
export class CreerComponent implements OnInit {

  @ViewChild('creerContainer') creerContainer: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.creerContainer.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }

}
