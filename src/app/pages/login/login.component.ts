import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'app/service/firebase/firebase.auth.service';
import { NavbarService } from 'app/service/navbar/navbar.service';

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
              public ngZone: NgZone,
              public navbarService: NavbarService) {
                
    this.firebaseAuthService.isUserLogged().subscribe(user => {
      debugger;
      if (user) {
        if (sessionStorage.getItem('user') !== null && sessionStorage.getItem('user').length > 0) {
          this.router.navigate(['/admin']);
        } else {
          this.firebaseAuthService.signOut().then(() => {});
        }
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
      debugger;
        sessionStorage.setItem('user', result.user.email);
        that.navbarService.signIn();
        that.router.navigate(['/admin']);
      }).catch((error) => {
        sessionStorage.removeItem('user');
        window.alert(error.message)
      })
  }
  
}
