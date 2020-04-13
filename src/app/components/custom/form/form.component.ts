import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @ViewChild('f', {static: false}) contactForm: NgForm;
  message: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.contactForm.value);
    this.contactForm.reset();
    // http request, enviar this.contactForm.value: {
    //   name: string,
    //   email: string,
    //   message: string
    // }
  }

}
