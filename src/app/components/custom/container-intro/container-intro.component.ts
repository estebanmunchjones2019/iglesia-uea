import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-container-intro',
  templateUrl: './container-intro.component.html',
  styleUrls: ['./container-intro.component.css']
})
export class ContainerIntroComponent implements OnInit {
  @Input() title:string;
  @Input() content:string;

  constructor() { }

  ngOnInit(): void {
  }

}
