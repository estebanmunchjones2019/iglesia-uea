import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class NavbarService {

  @Output() showSignOut :EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  signIn() {
    this.showSignOut.emit(true);
  }

  signOut() {
    this.showSignOut.emit(false);
  }
  
}
