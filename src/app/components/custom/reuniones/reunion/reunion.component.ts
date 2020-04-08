import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html',
  styleUrls: ['./reunion.component.css']
})
export class ReunionComponent implements OnInit {
  @Input() img: string;
  @Input() time: string;
  @Input() title: string;
  @Input() content: string;

  constructor() { }

  ngOnInit(): void {
  }

}
