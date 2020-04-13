import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {
  title1: string = 'titulo 1';
  content1: string = 'content 1';
  title2: string = 'titulo 2';
  content2: string = 'content 2';

  constructor() { }

  ngOnInit(): void {
  }

}
