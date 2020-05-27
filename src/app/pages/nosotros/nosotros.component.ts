import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {
  title: string = `Nuestras creencias`;
  
  @ViewChild('main') main : ElementRef;
  
  constructor() { } 

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.main.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  
}
