import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'app/service/firebase/firebase.auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  focusEmail: boolean;
  focusPass: boolean;

  constructor(public firebaseAuthService: FirebaseAuthService,
              public router: Router,
              public ngZone: NgZone) {
                
    this.firebaseAuthService.isUserLogged().subscribe(user => {
      if (user) {
        this.router.navigate(['/admin']);
      }
    })
  } 

  ngOnInit(): void {
  }

  ngAfterViewInit() {

  }

  onSubmit(fLogin: NgForm) {
    var that = this;
    // ******* TODO AGREGAR CONTROLES A LOS CAMPOS ********* //
    this.firebaseAuthService.signIn(fLogin.value.email, fLogin.value.password)
    .then(function(result) {
        that.router.navigate(['/admin']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  
}
