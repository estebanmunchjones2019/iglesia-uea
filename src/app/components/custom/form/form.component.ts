import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FirebaseFunctionsService } from 'app/service/firebase-functions/firebase-functions.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  data = {
    service_id: 'yahoo',
    template_id: 'contact_form',
    user_id: 'user_6yx3jrdwPKiLzFWr1vTe2',
    template_params: {
        'user_name': '',
        'user_email': '',
        'message': '' 
    }
  };

  focus = false;
  focus1 = false;


  constructor(private firebaseFunctionsService: FirebaseFunctionsService) { }

  ngOnInit() {       

  }

  onSubmit(f: NgForm) {

    Swal.fire({
      title: 'Enviando!',
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 20000,
      onOpen: () => {
        Swal.showLoading();
      },
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      }
    })

    // TODO: ver si se puede hacer algun control sobre los valores de los campos
    this.firebaseFunctionsService.sendEmail(f.value.email, f.value.name, f.value.message)
    .subscribe((response) => {
      debugger;
      Swal.close();
        Swal.fire({
          title: 'Email enviado!',
          timer: 1500,
          showClass: {
            popup: 'animated fadeInDown faster'
          },
          hideClass: {
            popup: 'animated fadeOutUp faster'
          }
        })
    }, (error) => {
      debugger;
      Swal.close();
        Swal.fire({
          title: 'Por favor intente mas tarde!',
          showClass: {
            popup: 'animated fadeInDown faster'
          },
          hideClass: {
            popup: 'animated fadeOutUp faster'
          }
        })
    });
  }

} 
