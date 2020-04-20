import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';



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


  constructor(private http: HttpClient) { }

  ngOnInit() {       
  }

  onSubmit(f: NgForm) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    this.data.template_params.user_name = f.value.name;
    this.data.template_params.user_email = f.value.email;
    this.data.template_params.message = f.value.message;
    console.log(this.data);
    this.http.post<any>(
      'https://api.emailjs.com/api/v1.0/email/send',
        JSON.stringify(this.data),
        {headers}
    ) 
      .subscribe(data => {
        console.log(data); 
    })
     
    f.reset();     
  }

} 
