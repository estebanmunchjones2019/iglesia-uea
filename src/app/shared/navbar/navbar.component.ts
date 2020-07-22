import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { PageScrollService } from 'ngx-page-scroll-core';

import { FirebaseAuthService } from 'app/service/firebase/firebase.auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    public sidebarVisible: boolean;

    public showSignOut = false;

    constructor(public location: Location, 
        private element : ElementRef,
        private pageScrollService: PageScrollService,
        private router: Router,
        @Inject(DOCUMENT) private document: any,
        private firebaseAuthService: FirebaseAuthService) {  
        
        this.sidebarVisible = false;

        this.firebaseAuthService.isUserLogged().subscribe(user => {
            if (user && sessionStorage.getItem('user') !== null && sessionStorage.getItem('user').length > 0) {
                this.showSignOut = true;
                } else {
                this.showSignOut = false;
                }
            })
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };

    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    isHome() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/home' ) {
            return true;
        }
        else {
            return false;
        }
    }

    isDocumentation() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }

    scroll(el: HTMLElement) {
        el.scrollIntoView({behavior: 'smooth'}); 
      }

    onContactoClick() {
        this.sidebarClose();
        if (this.router.url == '/' || this.router.url == '/?contacto=true') {
            this.pageScrollService.scroll({
                document: this.document,
                scrollTarget: '#contacto', 
            }); 
        } else {
            this.router.navigate(['/'], { queryParams: { contacto: 'true' } });
        }
    }
        
        // console.log(this.router.url);
        // if (this.router.url == '/') {
        //     this.pageScrollService.scroll({
        //         document: this.document,
        //         scrollTarget: '#contacto', 
        //     }); 
        // } else {
        //     this.router.navigate(['/']);
        //     setTimeout(() => {
        //         this.pageScrollService.scroll({
        //             document: this.document,
        //             scrollTarget: '#contacto', 
        //         });
        //     }, 1000)
        // } 
        // this.router.navigate(['/#form']); 

  signIn() {
    this.sidebarClose();
    this.router.navigate(['login']);
  }

  signOut() {  
    sessionStorage.clear();
    this.sidebarClose();
    this.showSignOut = false;
    let that = this;
    this.firebaseAuthService.signOut()
    .then(() => {
        that.router.navigate(['']);
    })
  }
}
