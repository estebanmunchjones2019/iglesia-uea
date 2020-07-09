import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { FirebaseAuthService } from 'app/service/firebase/firebase.auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  focusEmail: boolean;
  focusPass: boolean;
  loggingIn = false;

  constructor(public firebaseAuthService: FirebaseAuthService,
              public router: Router,
              public ngZone: NgZone) {
                
    this.firebaseAuthService.isUserLogged().subscribe(user => {
      if (user && sessionStorage.getItem('user') !== null && sessionStorage.getItem('user').length > 0) {
        this.router.navigate(['/admin']);
      } else {
        this.firebaseAuthService.signOut().then(() => {});
      }
    })
  } 

  ngOnInit(): void {
  }

  onSubmit(fLogin: NgForm) {
    this.loggingIn = true;
    var that = this;
    // ******* TODO AGREGAR CONTROLES A LOS CAMPOS ********* //
    this.firebaseAuthService.signIn(fLogin.value.email, fLogin.value.password)
    .then(function(result) {
        that.loggingIn = false;
        sessionStorage.setItem('user', result.user.email);
        that.router.navigate(['/admin']);
      }).catch((error) => {
        that.loggingIn = false;
        sessionStorage.removeItem('user');
        window.alert(error.message)
      })
  }
  
}
