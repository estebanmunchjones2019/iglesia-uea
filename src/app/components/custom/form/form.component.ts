import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FirebaseFunctionsService } from 'app/service/firebase-functions/firebase-functions.service';

import Swal from 'sweetalert2'
import { reduce } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  focus = false;
  focus1 = false;


  constructor(private firebaseFunctionsService: FirebaseFunctionsService) { }

  ngOnInit() {       

  }

  onSubmit(f: NgForm) {

    if (f.value.test) {
      return
    }
    Swal.fire({
      title: 'Enviando mensaje',
      allowEscapeKey: false,
      allowOutsideClick: false,
      // customClass: {
      //   title: 'custom'
      // },
      timer: 20000,
      onOpen: () => {
        Swal.showLoading();
      },
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      },
    })

    // TODO: ver si se puede hacer algun control sobre los valores de los campos
    this.firebaseFunctionsService.sendEmail(f.value.email, 'sebas_gallardo@hotmail.com', f.value.name + ' (' + f.value.email + ')', 'Iglesia Coronel Suárez', f.value.message)
    .subscribe((response) => {
      Swal.close();
        Swal.fire({
          title: 'Mensaje enviado!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          showClass: {
            popup: 'animated fadeInDown faster'
          },
          hideClass: {
            popup: 'animated fadeOutUp faster'
          }
        });
      f.reset(); // reset the form upon success
    }, (error) => {
      Swal.close();
        Swal.fire({
          title: 'Por favor, intente mas tarde',
          icon: 'error',
          confirmButtonColor: '#dc3545',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-danger'
          },
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
