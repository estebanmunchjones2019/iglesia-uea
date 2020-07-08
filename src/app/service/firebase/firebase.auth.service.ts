import {Injectable} from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable()
export class FirebaseAuthService {

  constructor( public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth) {
  }

  // Sign in with email/password
  signIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  isUserLogged() {
    return this.afAuth.authState;
  }

  signOut() {
    return this.afAuth.signOut();
  }
}
