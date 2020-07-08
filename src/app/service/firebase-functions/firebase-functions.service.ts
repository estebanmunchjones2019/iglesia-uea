import {Injectable} from "@angular/core";
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable()
export class FirebaseFunctionsService {

  constructor(private firebase: AngularFireFunctions) { }

  sendEmail(from, dest, name, subject, text: string) {
    const callable = this.firebase.httpsCallable('sendMail');
    return callable({ from : from, 
                      name: name,
                      text: text,
                      dest: dest,
                      subject: subject});
  }
}
